import { Box } from "./box.model";
import { User } from "./user.model";
import { Location } from "../models/location.model";
export class BoxUser {

    constructor(

        public boxID: number,
        public userID: number,
        public startDate: Date,
        public endDate: Date,
        public boxUserID?: number,
        public box?: Box,
        public user?: User,
        public locations?: Location[]

    ){}
}
