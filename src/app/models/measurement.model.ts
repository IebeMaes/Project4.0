import { Sensor } from "./sensor.model";
import { Box } from './box.model';

export class Measurement {

    constructor(
        public boxID: number,
        public sensorID: number,
        public value: string,
        public timeStamp: Date,
        public box?: Box,
        public sensor?: Sensor,
        public measurementID?: number
    ){

    }
}
