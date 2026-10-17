

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MernRealestateSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ListingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MERN_REALESTATE_TEST_LIVE=TRUE.
  afterEach(liveDelay('MERN_REALESTATE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MernRealestateSDK.test()
    const ent = testsdk.Listing()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('listing hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of MernRealestateSDK.test(offline).Listing().stream('list')) { }
    }, /offline/)

    for await (const _item of MernRealestateSDK.test(offline).Listing()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = MernRealestateSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Listing().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of MernRealestateSDK.test().Listing().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new MernRealestateSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Listing().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Listing().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MernRealestateSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Listing().list({"furnished":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MERN_REALESTATE_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'listing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":true,"t":"`$STRING`","key$":"address","index$":0},"bathrooms":{"a":true,"h":"Bathrooms","n":"bathrooms","r":true,"t":"`$INTEGER`","key$":"bathrooms","index$":1},"bedrooms":{"a":true,"h":"Bedrooms","n":"bedrooms","r":true,"t":"`$INTEGER`","key$":"bedrooms","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":3},"discountPrice":{"a":true,"h":"Discount Price","n":"discountPrice","r":false,"t":"`$NUMBER`","key$":"discountPrice","index$":4},"furnished":{"a":true,"h":"Furnished","n":"furnished","r":true,"t":"`$BOOLEAN`","key$":"furnished","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"imageUrls":{"a":true,"h":"Image Urls","n":"imageUrls","r":true,"t":"`$ARRAY`","key$":"imageUrls","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":8},"offer":{"a":true,"h":"Offer","n":"offer","r":true,"t":"`$BOOLEAN`","key$":"offer","index$":9},"parking":{"a":true,"h":"Parking","n":"parking","r":true,"t":"`$BOOLEAN`","key$":"parking","index$":10},"regularPrice":{"a":true,"h":"Regular Price","n":"regularPrice","r":true,"t":"`$NUMBER`","key$":"regularPrice","index$":11},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":12},"userRef":{"a":true,"h":"User Ref","n":"userRef","r":true,"t":"`$STRING`","key$":"userRef","index$":13}},"id":{"field":"id","name":"id"},"name":"listing","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["address","bathrooms","bedrooms","description","discountPrice","furnished","imageUrls","name","offer","parking","regularPrice","type","userRef"],"co":{"id":"POST /listings","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/listings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"listings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /listings","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"furnished","or":"furnished","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":9,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"offer","or":"offer","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"parking","or":"parking","r":false,"t":"`$BOOLEAN`","index$":4},{"a":true,"k":"query","n":"search_term","or":"searchTerm","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"createdAt","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":0,"k":"query","n":"start_index","or":"startIndex","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/listings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"listings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /listings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/listings/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"listings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /listings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/listings/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"listings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["address","bathrooms","bedrooms","description","discountPrice","furnished","imageUrls","name","offer","parking","regularPrice","type","userRef"],"co":{"id":"PUT /listings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/listings/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"listings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"listing","name__orig":"listing","Name":"Listing","name_":"listing","name-":"listing","NAME":"LISTING","index$":0}, {"active":true,"entity":"listing","key$":"BasicListingFlow","kind":"basic","name":"BasicListingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"listing_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"listing_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"listing_ref01","srcdatavar":"listing_ref01_data","suffix":"_up0","textfield":"address"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-listing_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"listing_ref01","srcdatavar":"listing_ref01_data","suffix":"_dt0"},"m":{"id":"listing01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-listing_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"listing_ref01","suffix":"_rm0"},"m":{"id":"listing01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"listing_ref01"}}],"index$":5}]}, 'Listing', {"POST /listings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","description","address","regularPrice","bedrooms","bathrooms","furnished","parking","type","offer","imageUrls","userRef"],"properties":{"name":{"type":"string","key$":"name"},"description":{"type":"string","key$":"description"},"address":{"type":"string","key$":"address"},"regularPrice":{"type":"number","key$":"regularPrice"},"discountPrice":{"type":"number","key$":"discountPrice"},"bathrooms":{"type":"integer","key$":"bathrooms"},"bedrooms":{"type":"integer","key$":"bedrooms"},"furnished":{"type":"boolean","key$":"furnished"},"parking":{"type":"boolean","key$":"parking"},"type":{"type":"string","enum":["rent","sale"],"key$":"type"},"offer":{"type":"boolean","key$":"offer"},"imageUrls":{"type":"array","items":{"type":"string"},"key$":"imageUrls"},"userRef":{"type":"string","key$":"userRef"}},"x-ref":"#/components/schemas/ListingInput","index$":1}}}},"parameters":[]},"GET /listings":{"protocol":"http","parameters":[{"name":"searchTerm","in":"query","schema":{"type":"string"},"description":"Keyword search across listing names and descriptions","index$":0},{"name":"type","in":"query","schema":{"type":"string","enum":["all","rent","sale"]},"index$":1},{"name":"offer","in":"query","schema":{"type":"boolean"},"index$":2},{"name":"parking","in":"query","schema":{"type":"boolean"},"index$":3},{"name":"furnished","in":"query","schema":{"type":"boolean"},"index$":4},{"name":"sort","in":"query","schema":{"type":"string","default":"createdAt"},"index$":5},{"name":"order","in":"query","schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":6},{"name":"limit","in":"query","schema":{"type":"integer","default":9},"index$":7},{"name":"startIndex","in":"query","schema":{"type":"integer","default":0},"index$":8}]},"GET /listings/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /listings/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /listings/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","description","address","regularPrice","bedrooms","bathrooms","furnished","parking","type","offer","imageUrls","userRef"],"properties":{"name":{"type":"string","key$":"name"},"description":{"type":"string","key$":"description"},"address":{"type":"string","key$":"address"},"regularPrice":{"type":"number","key$":"regularPrice"},"discountPrice":{"type":"number","key$":"discountPrice"},"bathrooms":{"type":"integer","key$":"bathrooms"},"bedrooms":{"type":"integer","key$":"bedrooms"},"furnished":{"type":"boolean","key$":"furnished"},"parking":{"type":"boolean","key$":"parking"},"type":{"type":"string","enum":["rent","sale"],"key$":"type"},"offer":{"type":"boolean","key$":"offer"},"imageUrls":{"type":"array","items":{"type":"string"},"key$":"imageUrls"},"userRef":{"type":"string","key$":"userRef"}},"x-ref":"#/components/schemas/ListingInput","index$":1}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const listing_ref01_ent = client.Listing()
    let listing_ref01_data = setup.data.new.listing['listing_ref01']

    listing_ref01_data = (await listing_ref01_ent.create(listing_ref01_data)).data()
    assert(null != listing_ref01_data.id)


    // LIST
    const listing_ref01_match: any = {}

    const listing_ref01_list = (await listing_ref01_ent.list(listing_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(listing_ref01_list, { id: listing_ref01_data.id })))


    // UPDATE
    const listing_ref01_data_up0: any = {}
    listing_ref01_data_up0.id = listing_ref01_data.id

    const listing_ref01_markdef_up0 = { name: 'address', value: 'Mark01-listing_ref01_' + setup.now }
    ;(listing_ref01_data_up0 as any)[listing_ref01_markdef_up0.name] = listing_ref01_markdef_up0.value

    const listing_ref01_resdata_up0 = (await listing_ref01_ent.update(listing_ref01_data_up0)).data()
    assert(listing_ref01_resdata_up0.id === listing_ref01_data_up0.id)

    assert((listing_ref01_resdata_up0 as any)[listing_ref01_markdef_up0.name] === listing_ref01_markdef_up0.value)


    // LOAD
    const listing_ref01_match_dt0: any = {}
    listing_ref01_match_dt0.id = listing_ref01_data.id
    const listing_ref01_data_dt0 = (await listing_ref01_ent.load(listing_ref01_match_dt0)).data()
    assert(listing_ref01_data_dt0.id === listing_ref01_data.id)


    // REMOVE
    const listing_ref01_match_rm0: any = { id: listing_ref01_data.id }
    await listing_ref01_ent.remove(listing_ref01_match_rm0)
  

    // LIST
    const listing_ref01_match_rt0: any = {}

    const listing_ref01_list_rt0 = (await listing_ref01_ent.list(listing_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(listing_ref01_list_rt0, { id: listing_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/listing/ListingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MernRealestateSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['listing01','listing02','listing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MERN_REALESTATE_TEST_LISTING_ENTID': idmap,
    'MERN_REALESTATE_TEST_LIVE': 'FALSE',
    'MERN_REALESTATE_TEST_EXPLAIN': 'FALSE',
    'MERN_REALESTATE_APIKEY': '',
  })

  idmap = env['MERN_REALESTATE_TEST_LISTING_ENTID']

  const live = 'TRUE' === env.MERN_REALESTATE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MERN_REALESTATE_TEST_LISTING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MernRealestateSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MERN_REALESTATE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MERN_REALESTATE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
