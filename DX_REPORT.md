# Voxgig SDK Generator (`@voxgig/sdkgen`) — Developer Experience & Dogfooding Report

* **Author:** Habib Tariq
* **Repository:** [https://github.com/habibtariq513/mern-realestate-sdk](https://github.com/habibtariq513/mern-realestate-sdk) (MIT License)
* **Target API:** MERN Real Estate Marketplace API (Listing and User entities, 8 CRUD + search operations, Bearer JWT authentication)
* **Generated Targets & Features:** TypeScript (`ts`), Python (`py`), Offline Test Suite (`test`)
* **Environment:** Windows 11 (`win32` / `MINGW64` Git Bash), Node.js `v26.7.0`, `npm 11.19.0`
* **Toolchain Versions:** `@voxgig/create-sdkgen@0.30.7`, `@voxgig/sdkgen@4.34.3`, `@voxgig/apidef@8.25.0`, `@voxgig/model@12.0.1`, `aontu@0.75.0`

---

## 1. Executive Summary & What Worked Well

Once the initial Windows path/spawn issues were patched, the core architecture of the Voxgig toolchain stood out in three specific areas:

* **Entity Inference (`@voxgig/apidef`):** From a standard OpenAPI 3.0.3 specification (`openapi.yaml`), `apidef` accurately inferred both core domain entities (`listing` and `user`), mapped all 8 REST methods to semantic operations (`create`, `list`, `load`, `update`, `remove`), and generated clean `.aontu` entity definitions and basic operation flows (`BasicListingFlow.aontu`, `BasicUserFlow.aontu`).
* **Feature Pruning (`jostraca`):** Adding targets (`ts`, `py`) and the `test` feature automatically pruned unused feature files (dropping 20 unselected feature source entries in TS, 40 in Python), keeping the generated SDK footprint lean.
* **Comprehensive Offline Verification:** The generated TypeScript test suite (230 tests across 30 suites) tested everything from credential leak sweeping (`clean: swept 826 surface(s), 0 leak(s)`) and transport pipeline hooks to live compilation and execution of every runnable code block inside `README.md` and `REFERENCE.md`.

---

## 2. Bugs & Friction Points Discovered (With Root Causes & Fixes)

### Bug #1: `spawn npm ENOENT` Crash on Windows During Project Scaffolding
* **Stage:** Step 1 (`npm create @voxgig/sdkgen -- mern-realestate -d ./openapi.yaml -o ./mern-realestate-sdk`)
* **Symptom:** The scaffolder initialized the `.sdk` directory via `jostraca`, but crashed immediately at the `generate-install` step with:
  ```text
  [INFO]: create/jostraca generate-install running npm install in .\mern-realestate-sdk\.sdk
  Voxgig Create SDK Error: Failed to start npm: spawn npm ENOENT
  ```
* **Impact:** Because `create-sdkgen` crashed during `npm install`, it aborted before invoking `voxgig-apidef` to populate `.sdk/model/entity/` from `def/openapi.yaml`.
* **Root Cause:** On Windows (`process.platform === 'win32'`), `npm` is a batch script (`npm.cmd`), not an executable binary. Calling `child_process.spawn('npm', ['install'])` without `{ shell: true }` or platform-specific command resolution throws `ENOENT` in Node.js on Windows.
* **Workaround Used:** Manually ran `npm install` inside `.sdk/` and invoked `npx voxgig-apidef mern-realestate -f . -d ./def/openapi.yaml -p ""` to generate the initial entity models.
* **Recommended Fix in `@voxgig/create-sdkgen`:** Use `process.platform === 'win32' ? 'npm.cmd' : 'npm'` or pass `{ shell: true }` to the spawn options during `generate-install`.

### Bug #2: Windows Relative Path Resolution Failure in `aontu` (`multisource_not_found`)
* **Stage:** Step 3 (`npm run generate` -> `voxgig-model model/sdk.aontu` and `voxgig-model test/test.aontu`)
* **Symptom:** Running `npm run generate` from `.sdk/` threw:
  ```text
  [aontu/multisource_not_found]: source not found: api/api-info.aontu
  --> ...\mern-realestate-sdk\.sdk\model\sdk.aontu:13:1
  Search paths:
  /Users/DELL/OneDrive/Documents/SDK/mern-realestate-sdk/.sdk/api/api-info.aontu
  ```
  The identical issue occurred in `test/test.aontu` for `@"struct/test.aontu"`, `@"primary/primary-test-index.aontu"`, and `@"feature/feature-test-index.aontu"`.
* **Root Cause:** In `model/sdk.aontu` and `test/test.aontu`, local subdirectory includes are written without a leading `./` (e.g., `@"api/api-info.aontu"` instead of `@"./api/api-info.aontu"`), whereas sibling files in the same file use `./` (`@"./config.aontu"`, `@"./project.aontu"`). On Windows, `aontu`'s MultiSource resolver treats non-`./` paths as module lookups relative to the current working directory (`.sdk/`) and strips the Windows drive letter (`C:`), failing to check relative to the parent `.aontu` file's directory (`.sdk/model/`).
* **Workaround / Fix Applied:** Prefixed local directory includes in `model/sdk.aontu` (`./api/`, `./entity/`, `./feature/`, `./target/`, `./flow/`, `./edition/`) and `test/test.aontu` (`./struct/`, `./primary/`, `./feature/`) with `./`.
* **Recommended Fix in `@voxgig/create-sdkgen` / `@voxgig/sdkgen` Templates:** Standardize all local relative includes in scaffolded `sdk.aontu` and `test.aontu` templates to start with `./`.

### Bug #3: Node.js v26 Breaking Change in `module.stripTypeScriptTypes` (`readme_examples.test.ts`)
* **Stage:** Step 4 (`cd ../ts && npm test`)
* **Symptom:** 217 of 220 active tests passed immediately, but the 3 README examples execution tests failed with:
  ```text
  TypeError [ERR_INVALID_ARG_VALUE]: The property 'options.mode' must be one of: 'strip'
      at stripTypeScriptTypes (node:internal/modules/typescript:101:3)
      at executeBlocks (.../ts/test/readme_examples.test.ts:293:9)
  ```
* **Root Cause:** Line 293 of the generated `ts/test/readme_examples.test.ts` calls `strip(src, { mode: 'transform' })`. In Node.js v26.x, `{ mode: 'transform' }` was removed from `module.stripTypeScriptTypes` in favor of `'strip'` only.
* **Fix Applied:** Updated `.sdk/tm/ts/test/readme_examples.test.ts` (and the generated test) from `{ mode: 'transform' }` to `{ mode: 'strip' }`. All 220 active tests (230 total, 0 failures) passed.
* **Recommended Fix in `@voxgig/sdkgen`:** Default to `strip(src, { mode: 'strip' })` (or wrap `{ mode: 'transform' }` in a try/fallback to `{ mode: 'strip' }`) in `.sdk/tm/ts/test/readme_examples.test.ts` for forward compatibility with Node 26+.

### Friction Point #4: Documentation Drift Between Website Docs and Scaffolded Output
* **`.aon` vs. `.aontu` File Extensions:** Both [https://voxgig.com/sdk/agents](https://voxgig.com/sdk/agents) and [https://voxgig.com/sdk/docs/create-sdkgen](https://voxgig.com/sdk/docs/create-sdkgen) instruct users and AI agents to edit `.sdk/model/project.aon` and `.sdk/model/entity/<entity>.aon`. However, `@voxgig/create-sdkgen@0.30.7` generates `.aontu` files (`project.aontu`, `sdk.aontu`, `listing.aontu`).
* **Space-Separated vs. Comma-Separated CLI Target Arguments:** The Agent Guide [https://voxgig.com/sdk/agents](https://voxgig.com/sdk/agents) shows `npx voxgig-sdkgen target add ts py go` (space-separated), whereas the `sdkgen` documentation [https://voxgig.com/sdk/docs/sdkgen](https://voxgig.com/sdk/docs/sdkgen) specifies comma-separated values (`voxgig-sdkgen target add ts,py,go`).

---

## 3. Time-Box & Summary

* **Total Active Human Time:** ~28 minutes (within the 30-minute time-box).
* **Final Build & Test Status:** Both TypeScript (`ts/`) and Python (`py/`) SDKs generated cleanly. The offline verification suite achieved a 100% pass rate (230 tests, 30 suites, 220 passed, 10 skipped, 0 failed).