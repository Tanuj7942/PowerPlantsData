import csvParser from "csv-parser";
import fs from 'fs';
import { Plants } from "../models/plants.model";
import { finished } from 'stream/promises';
// import { User } from '../entities/user.entity';

export class UserRepository {
    private results: Plants[] = [];
    constructor() {
    }
    public getData = async () => {
        const parse = fs.createReadStream('Data/Tanuj/global_power_plant_database.csv')
        .pipe(csvParser())
        .on('data', (data) => {
            // if(data.country == "AFG") {
                this.results.push(new Plants(data.country, data.country_long, data.name, parseFloat(data.capacity_mw), [parseFloat(data.longitude), parseFloat(data.latitude)], data.primary_fuel))
            // }
        });
        await finished(parse);
        return this.results;
    };
}