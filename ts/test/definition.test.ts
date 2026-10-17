import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "listing",
    "accessor": "Listing",
    "op": "create",
    "method": "POST",
    "path": "/listings",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Modern Canal View Villa in DHA Phase 6",
      "description": "Spacious 1-kanal luxury house with solar backup and landscaped lawn.",
      "address": "Sector C, DHA Phase 6, Lahore",
      "regularPrice": 45000000,
      "discountPrice": 42500000,
      "bathrooms": 6,
      "bedrooms": 5,
      "furnished": true,
      "parking": true,
      "type": "sale",
      "offer": true,
      "imageUrls": [
        "x"
      ],
      "userRef": "65f00112233445566778899a"
    },
    "idField": "id"
  },
  {
    "entity": "listing",
    "accessor": "Listing",
    "op": "list",
    "method": "GET",
    "path": "/listings",
    "args": [],
    "select": {
      "furnished": "v1",
      "limit": 9,
      "offer": "v1",
      "order": "desc",
      "parking": "v1",
      "search_term": "v1",
      "sort": "createdAt",
      "start_index": 0,
      "type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "searchTerm",
      "type",
      "offer",
      "parking",
      "furnished",
      "sort",
      "order",
      "limit",
      "startIndex"
    ],
    "queryArgs": [
      {
        "name": "furnished",
        "wire": "furnished"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offer",
        "wire": "offer"
      },
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "parking",
        "wire": "parking"
      },
      {
        "name": "search_term",
        "wire": "searchTerm"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "start_index",
        "wire": "startIndex"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": "65f1a2b3c4d5e6f7a8b9c0d1",
        "name": "Modern Canal View Villa in DHA Phase 6",
        "description": "Spacious 1-kanal luxury house with solar backup and landscaped lawn.",
        "address": "Sector C, DHA Phase 6, Lahore",
        "regularPrice": 45000000,
        "discountPrice": 42500000,
        "bathrooms": 6,
        "bedrooms": 5,
        "furnished": true,
        "parking": true,
        "type": "sale",
        "offer": true,
        "imageUrls": [
          "x"
        ],
        "userRef": "65f00112233445566778899a"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "listing",
    "accessor": "Listing",
    "op": "load",
    "method": "GET",
    "path": "/listings/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Modern Canal View Villa in DHA Phase 6",
      "description": "Spacious 1-kanal luxury house with solar backup and landscaped lawn.",
      "address": "Sector C, DHA Phase 6, Lahore",
      "regularPrice": 45000000,
      "discountPrice": 42500000,
      "bathrooms": 6,
      "bedrooms": 5,
      "furnished": true,
      "parking": true,
      "type": "sale",
      "offer": true,
      "imageUrls": [
        "x"
      ],
      "userRef": "65f00112233445566778899a"
    },
    "idField": "id"
  },
  {
    "entity": "listing",
    "accessor": "Listing",
    "op": "remove",
    "method": "DELETE",
    "path": "/listings/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "Operation completed successfully"
    },
    "idField": "id"
  },
  {
    "entity": "listing",
    "accessor": "Listing",
    "op": "update",
    "method": "PUT",
    "path": "/listings/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Modern Canal View Villa in DHA Phase 6",
      "description": "Spacious 1-kanal luxury house with solar backup and landscaped lawn.",
      "address": "Sector C, DHA Phase 6, Lahore",
      "regularPrice": 45000000,
      "discountPrice": 42500000,
      "bathrooms": 6,
      "bedrooms": 5,
      "furnished": true,
      "parking": true,
      "type": "sale",
      "offer": true,
      "imageUrls": [
        "x"
      ],
      "userRef": "65f00112233445566778899a"
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "65f00112233445566778899a",
      "username": "habibtariq",
      "email": "habib@example.com",
      "avatar": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "remove",
    "method": "DELETE",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "Operation completed successfully"
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "update",
    "method": "PUT",
    "path": "/users/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "65f00112233445566778899a",
      "username": "habibtariq",
      "email": "habib@example.com",
      "avatar": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
