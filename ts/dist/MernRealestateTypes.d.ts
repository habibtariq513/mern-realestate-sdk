export interface Listing {
    address: string;
    bathrooms: number;
    bedrooms: number;
    description: string;
    discountPrice?: number;
    furnished: boolean;
    id: string;
    imageUrls: any[];
    name: string;
    offer: boolean;
    parking: boolean;
    regularPrice: number;
    type: string;
    userRef: string;
}
export interface ListingLoadMatch {
    id: string;
}
export interface ListingListMatch {
    furnished?: boolean;
    limit?: number;
    offer?: boolean;
    order?: string;
    parking?: boolean;
    search_term?: string;
    sort?: string;
    start_index?: number;
    type?: string;
}
export interface ListingCreateData {
    address: string;
    bathrooms: number;
    bedrooms: number;
    description: string;
    discountPrice?: number;
    furnished: boolean;
    id: string;
    imageUrls: any[];
    name: string;
    offer: boolean;
    parking: boolean;
    regularPrice: number;
    type: string;
    userRef: string;
}
export interface ListingUpdateData {
    id: string;
    address?: string;
    bathrooms?: number;
    bedrooms?: number;
    description?: string;
    discountPrice?: number;
    furnished?: boolean;
    imageUrls?: any[];
    name?: string;
    offer?: boolean;
    parking?: boolean;
    regularPrice?: number;
    type?: string;
    userRef?: string;
}
export interface ListingRemoveMatch {
    id: string;
}
export interface User {
    avatar?: string;
    email: string;
    id: string;
    password?: string;
    username: string;
}
export interface UserLoadMatch {
    id: string;
}
export interface UserUpdateData {
    id: string;
    avatar?: string;
    email?: string;
    password?: string;
    username?: string;
}
export interface UserRemoveMatch {
    id: string;
}
