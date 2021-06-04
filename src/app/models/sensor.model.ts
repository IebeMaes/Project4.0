import { SensorType } from "./sensor-type.model";

export class Sensor {

    constructor(
        public name: string,
        public sensorTypeID: number,
        public sensorType?: SensorType,
        public sensorID?: number
    ){

    }
}
