import { Router } from "express";
import PowerPlantsController from "../controllers/app.controller";
import { Routes } from "../interfaces/routes.interface";

class PowerPlantsRoute implements Routes {
    public path = '/powerplants';
    public router = Router();
    private powerPlantsController = new PowerPlantsController();

    constructor() {
        this.initializeRoutes();
        // this.powerPlantsController = new PowerPlantsController();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.powerPlantsController.getAllPowerPlants);
        this.router.get(`${this.path}/country/:country`, this.powerPlantsController.getPowerPlantsByCountry);
        this.router.get(`${this.path}/fueltype/:fuel`, this.powerPlantsController.getPowerPlantsByFueltype);
        this.router.get(`${this.path}/both/:country/:fuel`, this.powerPlantsController.getPowerPlantsByCountryAndFueltype);
        this.router.get(`${this.path}/countries`, this.powerPlantsController.getCountries);
        this.router.get(`${this.path}/fueltypes`, this.powerPlantsController.getFueltypes);
    }
}

export default PowerPlantsRoute;