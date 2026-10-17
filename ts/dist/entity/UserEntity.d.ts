import { MernRealestateEntityBase } from '../MernRealestateEntityBase';
import type { MernRealestateSDK } from '../MernRealestateSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch, UserUpdateData, UserRemoveMatch } from '../MernRealestateTypes';
declare class UserEntity extends MernRealestateEntityBase<User> {
    constructor(client: MernRealestateSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
    update(this: any, reqdata?: UserUpdateData, ctrl?: Control): Promise<UserEntity>;
    remove(this: any, reqmatch?: UserRemoveMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
