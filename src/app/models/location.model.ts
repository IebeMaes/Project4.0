import { BoxUser } from "./box-user.model";

export class Location {

    constructor(
        public boxUserID: number,
        public latitude: number,
        public longitude: number,
        public startDate: Date,
        public endDate: Date,
        public locationID?: number,
        public boxUser?: BoxUser
    ){}
}
