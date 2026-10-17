# Typed models for the MernRealestate SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ListingRequired(TypedDict):
    address: str
    bathrooms: int
    bedrooms: int
    description: str
    furnished: bool
    id: str
    imageUrls: list
    name: str
    offer: bool
    parking: bool
    regularPrice: float
    type: str
    userRef: str


class Listing(ListingRequired, total=False):
    discountPrice: float


class ListingLoadMatch(TypedDict):
    id: str


class ListingListMatch(TypedDict, total=False):
    furnished: bool
    limit: int
    offer: bool
    order: str
    parking: bool
    search_term: str
    sort: str
    start_index: int
    type: str


class ListingCreateDataRequired(TypedDict):
    address: str
    bathrooms: int
    bedrooms: int
    description: str
    furnished: bool
    id: str
    imageUrls: list
    name: str
    offer: bool
    parking: bool
    regularPrice: float
    type: str
    userRef: str


class ListingCreateData(ListingCreateDataRequired, total=False):
    discountPrice: float


class ListingUpdateDataRequired(TypedDict):
    id: str


class ListingUpdateData(ListingUpdateDataRequired, total=False):
    address: str
    bathrooms: int
    bedrooms: int
    description: str
    discountPrice: float
    furnished: bool
    imageUrls: list
    name: str
    offer: bool
    parking: bool
    regularPrice: float
    type: str
    userRef: str


class ListingRemoveMatch(TypedDict):
    id: str


class UserRequired(TypedDict):
    email: str
    id: str
    username: str


class User(UserRequired, total=False):
    avatar: str
    password: str


class UserLoadMatch(TypedDict):
    id: str


class UserUpdateDataRequired(TypedDict):
    id: str


class UserUpdateData(UserUpdateDataRequired, total=False):
    avatar: str
    email: str
    password: str
    username: str


class UserRemoveMatch(TypedDict):
    id: str
