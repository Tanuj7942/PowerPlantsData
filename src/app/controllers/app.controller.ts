import { Request, Response } from 'express';
import { ApiResponse } from '../middleware/api.response.middleware';
import { StatusCodes } from 'http-status-codes';
import PowerPlantsService from '../services/app.service';
// import { ApiResponse } from '../middlewares/api.response.middleware';
// import { asyncMiddleware } from "../middlewares/error.handler.middleware";

class PowerPlantsController {

    private powerPlantsService;

    constructor() {
        this.powerPlantsService = new PowerPlantsService();
    }

    public getAllPowerPlants = async (req: Request, res: Response) => {
        const response = await this.powerPlantsService.getAllPowerPlants();
        ApiResponse.result(res, response, StatusCodes.OK);
    }

    public getPowerPlantsByCountry = async (req: Request, res: Response) => {
        const response = await this.powerPlantsService.getPowerPlantsByCountry(req.params.country);
        ApiResponse.result(res, response, StatusCodes.OK);
    }

    public getPowerPlantsByFueltype = async (req: Request, res: Response) => {
        const response = await this.powerPlantsService.getPowerPlantsByFueltype(req.params.fuel);
        ApiResponse.result(res, response, StatusCodes.OK);
    }

    public getPowerPlantsByCountryAndFueltype = async (req: Request, res: Response) => {
        const response = await this.powerPlantsService.getPowerPlantsByCountryAndFueltype(req.params.country, req.params.fuel);
        ApiResponse.result(res, response, StatusCodes.OK);
    }

    public getCountries = async (req: Request, res: Response) => {
        const response = await this.powerPlantsService.getCountries();
        ApiResponse.result(res, response, StatusCodes.OK);
    }

    public getFueltypes = async (req: Request, res: Response) => {
        const response = await this.powerPlantsService.getFueltypes();
        ApiResponse.result(res, response, StatusCodes.OK);
    }
}

export default PowerPlantsController;