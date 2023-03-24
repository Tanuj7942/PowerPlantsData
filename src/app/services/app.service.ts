// import { dataSource } from "../config/orm.config";
import { PowerPlantsRepository } from "../repositories/app.repository";

class PowerPlantsService {
    private powerPlantsRepo;

    constructor() {
        this.powerPlantsRepo = new PowerPlantsRepository();
    }

    public getAllPowerPlants = async () => {
        // console.log(await this.powerPlantsRepo.getAllPowerPlants());
        return await this.powerPlantsRepo.getAllPowerPlants();
    };

    public getPowerPlantsByCountry = async (country: string) => {
        return await this.powerPlantsRepo.getPowerPlantsByCountry(country);
    };

    public getPowerPlantsByFueltype = async (fuel: string) => {
        return await this.powerPlantsRepo.getPowerPlantsByFueltype(fuel);
    };

    public getPowerPlantsByCountryAndFueltype = async (country: string, fuel: string) => {
        return await this.powerPlantsRepo.getPowerPlantsByCountryAndFueltype(country, fuel);
    };

    public getCountries = async () => {
        return await this.powerPlantsRepo.getCountries();
    };

    public getFueltypes = async () => {
        return await this.powerPlantsRepo.getFueltypes();
    };

}

export default PowerPlantsService;