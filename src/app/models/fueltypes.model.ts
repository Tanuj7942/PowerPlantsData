import { Fueltypes } from "../interfaces/fueltypes.interface";

export class Fueltype implements Fueltypes {
    fueltypes: string;

    constructor(fueltypes: string) {
        this.fueltypes = fueltypes;
    }
}