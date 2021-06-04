import { Location } from '../models/location.model'
import { BoxUser } from './box-user.model';

export class Box {

    constructor(

        public macAddress: string,
        public name: string,
        public comment: string,
        public active: boolean,
        public boxID?: number,
        public boxUsers?: BoxUser[]
        //public location?: Location
    ){}
}
