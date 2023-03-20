import { PowerPLants } from "../interfaces/plants.interface";

export class Plants implements PowerPLants {
    country: string;
    country_name: string;
    name: string;
    capacity: number;
    // latitude: number;
    // longitude: number;
    geometry: Array<number>;
    primaryfuel: string;

    constructor(country: string, country_name: string, name: string, capacity: number, geometry: Array<number>, primaryfuel: string) {
        this.country = country;
        this.country_name = country_name;
        this.name = name;
        this.capacity = capacity;
        // this.latitude = latitude;
        // this.longitude = longitude;
        this.geometry = geometry; 
        this.primaryfuel = primaryfuel;
    }
}