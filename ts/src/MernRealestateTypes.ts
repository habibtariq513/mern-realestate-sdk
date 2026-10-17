// Typed models for the MernRealestate SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Listing {
  address: string
  bathrooms: number
  bedrooms: number
  description: string
  discountPrice?: number
  furnished: boolean
  id: string
  imageUrls: any[]
  name: string
  offer: boolean
  parking: boolean
  regularPrice: number
  type: string
  userRef: string
}

export interface ListingLoadMatch {
  id: string
}

export interface ListingListMatch {
  furnished?: boolean
  limit?: number
  offer?: boolean
  order?: string
  parking?: boolean
  search_term?: string
  sort?: string
  start_index?: number
  type?: string
}

export interface ListingCreateData {
  address: string
  bathrooms: number
  bedrooms: number
  description: string
  discountPrice?: number
  furnished: boolean
  id: string
  imageUrls: any[]
  name: string
  offer: boolean
  parking: boolean
  regularPrice: number
  type: string
  userRef: string
}

export interface ListingUpdateData {
  id: string
  address?: string
  bathrooms?: number
  bedrooms?: number
  description?: string
  discountPrice?: number
  furnished?: boolean
  imageUrls?: any[]
  name?: string
  offer?: boolean
  parking?: boolean
  regularPrice?: number
  type?: string
  userRef?: string
}

export interface ListingRemoveMatch {
  id: string
}

export interface User {
  avatar?: string
  email: string
  id: string
  password?: string
  username: string
}

export interface UserLoadMatch {
  id: string
}

export interface UserUpdateData {
  id: string
  avatar?: string
  email?: string
  password?: string
  username?: string
}

export interface UserRemoveMatch {
  id: string
}

