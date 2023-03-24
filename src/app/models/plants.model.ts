import { PowerPLants } from "../interfaces/plants.interface";

export class Plants implements PowerPLants {
    country: string;
    countryname: string;
    name: string;
    capacity: number;
    geometry: Array<number>;
    primaryfuel: string;

    constructor(country: string, countryname: string, name: string, capacity: number, geometry: Array<number>, primaryfuel: string) {
        this.country = country;
        this.countryname = countryname;
        this.name = name;
        this.capacity = capacity;
        this.geometry = geometry; 
        this.primaryfuel = primaryfuel;
    }
}