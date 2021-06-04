import { Box } from './box.model';

export class Monitoring {

    constructor(
        public boxID: number,
        public box: Box,
        public dateTime: Date,
        public sdCapacity: string,
        public batteryPercentage: number,
        public monitoringID?: number,
    ){

    }
}
