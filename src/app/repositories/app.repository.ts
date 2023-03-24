import csvParser from "csv-parser";
import fs from 'fs';
import { Plants } from "../models/plants.model";
import { finished } from 'stream/promises';
import { Country } from "../models/countries.model";
import { Fueltype } from "../models/fueltypes.model";
// import { User } from '../entities/user.entity';

export class PowerPlantsRepository {
    private allPowerPlants: Plants[];
    private powerPlantsByCountry: Plants[];
    private powerPlantsByFueltype: Plants[];
    private powerPlantsByCountryAndFueltype: Plants[];
    private countries: Country[];
    private fueltypes: Fueltype[];

    constructor() {
        this.allPowerPlants = [];
        this.powerPlantsByCountry = [];
        this.powerPlantsByFueltype = [];
        this.powerPlantsByCountryAndFueltype = [];
        this.countries = [];
        this.fueltypes = [];
    }

    public getAllPowerPlants = async () => {
        console.log('All');
        this.allPowerPlants = [];
        const parse = fs.createReadStream('Data/Tanuj/global_power_plant_database.csv')
            .pipe(csvParser())
            .on('data', (data) => {
                this.allPowerPlants.push(new Plants(data.country, data.country_long, data.name, parseFloat(data.capacity_mw), [parseFloat(data.longitude), parseFloat(data.latitude)], data.primary_fuel))
            });
        await finished(parse);
        return this.allPowerPlants;
    };

    public getPowerPlantsByCountry = async (country: string) => {
        console.log('Country');
        this.powerPlantsByCountry = [];
        const parse = fs.createReadStream('Data/Tanuj/global_power_plant_database.csv')
            .pipe(csvParser())
            .on('data', (data) => {
                if (data.country == country) {
                    this.powerPlantsByCountry.push(new Plants(data.country, data.country_long, data.name, parseFloat(data.capacity_mw), [parseFloat(data.longitude), parseFloat(data.latitude)], data.primary_fuel))
                }
            });
        await finished(parse);
        return this.powerPlantsByCountry;
    }


    public getPowerPlantsByFueltype = async (fuel: string) => {
        console.log('Fuel');
        this.powerPlantsByFueltype = [];
        const parse = fs.createReadStream('Data/Tanuj/global_power_plant_database.csv')
            .pipe(csvParser())
            .on('data', (data) => {
                if (data.primary_fuel == fuel) {
                    this.powerPlantsByFueltype.push(new Plants(data.country, data.country_long, data.name, parseFloat(data.capacity_mw), [parseFloat(data.longitude), parseFloat(data.latitude)], data.primary_fuel))
                }
            });
        await finished(parse);
        return this.powerPlantsByFueltype;
    }

    public getPowerPlantsByCountryAndFueltype = async (country: string, fuel: string) => {
        console.log('Country & Fuel');
        this.powerPlantsByCountryAndFueltype = [];
        const parse = fs.createReadStream('Data/Tanuj/global_power_plant_database.csv')
            .pipe(csvParser())
            .on('data', (data) => {
                if (data.country == country && data.primary_fuel == fuel) {
                    this.powerPlantsByCountryAndFueltype.push(new Plants(data.country, data.country_long, data.name, parseFloat(data.capacity_mw), [parseFloat(data.longitude), parseFloat(data.latitude)], data.primary_fuel))
                }
            });
        await finished(parse);
        return this.powerPlantsByCountryAndFueltype;
    }

    public getCountries = async () => {
        console.log('getCountries');
        this.countries = [];
        const parse = fs.createReadStream('Data/Tanuj/countries.csv')
            .pipe(csvParser())
            .on('data', (data) => {
                this.countries.push(new Country(data.country_code, data.country_name))
            });
        await finished(parse);
        return this.countries;
    }

    public getFueltypes = async () => {
        console.log('getFueltypes');
        this.fueltypes = [];
        const parse = fs.createReadStream('Data/Tanuj/fueltypes.csv')
            .pipe(csvParser())
            .on('data', (data) => {
                this.fueltypes.push(new Fueltype(data.fuel_types))
            });
        await finished(parse);
        return this.fueltypes;
    }
}