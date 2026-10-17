
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MernRealestate',
        slug: "mern-realestate",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "http://localhost:3000/api",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        listing: {
        },
  
        user: {
        },
  
    }
  }


  entity = {
    "listing": {
      "fields": [
        {
          "name": "address",
          "title": "Address",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "bathrooms",
          "title": "Bathrooms",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "bedrooms",
          "title": "Bedrooms",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "discountPrice",
          "title": "Discount Price",
          "type": "`$NUMBER`"
        },
        {
          "name": "furnished",
          "title": "Furnished",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "imageUrls",
          "title": "Image Urls",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "offer",
          "title": "Offer",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "parking",
          "title": "Parking",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "regularPrice",
          "title": "Regular Price",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "userRef",
          "title": "User Ref",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "listing",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/listings",
              "segments": [
                {
                  "lit": "listings"
                }
              ],
              "parts": [
                "listings"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/listings",
              "segments": [
                {
                  "lit": "listings"
                }
              ],
              "parts": [
                "listings"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "furnished",
                    "orig": "furnished",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 9
                  },
                  {
                    "name": "offer",
                    "orig": "offer",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "order",
                    "orig": "order",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "desc"
                  },
                  {
                    "name": "parking",
                    "orig": "parking",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "search_term",
                    "orig": "searchTerm",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "createdAt"
                  },
                  {
                    "name": "start_index",
                    "orig": "startIndex",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/listings/{id}",
              "segments": [
                {
                  "lit": "listings"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "listings",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/listings/{id}",
              "segments": [
                {
                  "lit": "listings"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "listings",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/listings/{id}",
              "segments": [
                {
                  "lit": "listings"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "listings",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "avatar",
          "title": "Avatar",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          },
          "format": "email"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "password",
          "title": "Password",
          "type": "`$STRING`"
        },
        {
          "name": "username",
          "title": "Username",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          }
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "user",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/users/{id}",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "users",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/users/{id}",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "users",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/users/{id}",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "users",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

