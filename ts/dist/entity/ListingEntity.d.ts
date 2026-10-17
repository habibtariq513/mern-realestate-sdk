import { MernRealestateEntityBase } from '../MernRealestateEntityBase';
import type { MernRealestateSDK } from '../MernRealestateSDK';
import type { Control } from '../types';
import type { Listing, ListingLoadMatch, ListingListMatch, ListingCreateData, ListingUpdateData, ListingRemoveMatch } from '../MernRealestateTypes';
declare class ListingEntity extends MernRealestateEntityBase<Listing> {
    constructor(client: MernRealestateSDK, entopts: any);
    make(this: ListingEntity): ListingEntity;
    load(this: any, reqmatch?: ListingLoadMatch, ctrl?: Control): Promise<ListingEntity>;
    list(this: any, reqmatch?: ListingListMatch, ctrl?: Control): Promise<ListingEntity[]>;
    create(this: any, reqdata?: ListingCreateData, ctrl?: Control): Promise<ListingEntity>;
    update(this: any, reqdata?: ListingUpdateData, ctrl?: Control): Promise<ListingEntity>;
    remove(this: any, reqmatch?: ListingRemoveMatch, ctrl?: Control): Promise<ListingEntity>;
}
export { ListingEntity };
