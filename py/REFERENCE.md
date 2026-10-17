# MernRealestate Python SDK Reference

Complete API reference for the MernRealestate Python SDK.


## MernRealestateSDK

### Constructor

```python
from mernrealestate_sdk import MernRealestateSDK

client = MernRealestateSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MernRealestateSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MernRealestateSDK.test()
```


### Instance Methods

#### `Listing(data=None)`

Create a new `ListingEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ListingEntity

```python
listing = client.Listing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | Yes |  |
| `bathrooms` | `int` | Yes |  |
| `bedrooms` | `int` | Yes |  |
| `description` | `str` | Yes |  |
| `discountPrice` | `float` | No |  |
| `furnished` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `imageUrls` | `list` | Yes |  |
| `name` | `str` | Yes |  |
| `offer` | `bool` | Yes |  |
| `parking` | `bool` | Yes |  |
| `regularPrice` | `float` | Yes |  |
| `type` | `str` | Yes |  |
| `userRef` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ListingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Listing().create({
    "address": "example_address",  # str
    "bathrooms": 1,  # int
    "bedrooms": 1,  # int
    "description": "example_description",  # str
    "furnished": True,  # bool
    "id": "example_id",  # str
    "imageUrls": [],  # list
    "name": "example_name",  # str
    "offer": True,  # bool
    "parking": True,  # bool
    "regularPrice": 1,  # float
    "type": "example_type",  # str
    "userRef": "example_userRef",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ListingEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Listing().list()
for listing in results:
    print(listing.data_get())
```

#### `load(reqmatch, ctrl=None) -> ListingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Listing().load({"id": "listing_id"})
```

#### `remove(reqmatch, ctrl=None) -> ListingEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Listing().remove({"id": "listing_id"})
```

#### `update(reqdata, ctrl=None) -> ListingEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Listing().update({
    "id": "listing_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `str` | No |  |
| `email` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `password` | `str` | No |  |
| `username` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | update | remove |
| --- | --- | --- | --- |
| `avatar` | - | - | - |
| `email` | - | Yes | - |
| `id` | - | - | - |
| `password` | - | - | - |
| `username` | - | Yes | - |

### Operations

#### `load(reqmatch, ctrl=None) -> UserEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

#### `remove(reqmatch, ctrl=None) -> UserEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.User().remove({"id": "user_id"})
```

#### `update(reqdata, ctrl=None) -> UserEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.User().update({
    "id": "user_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = MernRealestateSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

