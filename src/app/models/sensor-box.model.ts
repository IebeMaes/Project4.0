import { Box } from "./box.model";
import { Sensor } from "./sensor.model";

export class SensorBox {

    constructor(
        public boxID: number,
        public sensorID: number,
        public box?: Box,
        public sensor?: Sensor
    ){}
}
