import {UserType} from './user-type.model';

export class User {​​

    constructor(
        public firstName: string,
        public lastName: string,
        public password: string,
        public email: string,
        public address: string,
        public postalCode: string,
        public city: string,
        public userTypeID: number,
        public userType?: UserType,
        public token?: string,
        public userID?: number,
        
    ) {​​ }​​

}​​
