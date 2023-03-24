import { Countries } from "../interfaces/countries.interface";

export class Country implements Countries {
    countrycode: string;
    countryname: string;

    constructor(countrycode: string, countryname: string) {
        this.countrycode = countrycode;
        this.countryname = countryname;
    }
}