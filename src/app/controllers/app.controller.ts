import { Request, Response } from 'express';
import { ApiResponse } from '../middleware/api.response.middleware';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/app.service';
// import { ApiResponse } from '../middlewares/api.response.middleware';
// import { asyncMiddleware } from "../middlewares/error.handler.middleware";

class UserController {

    private userService;

    constructor() {
        this.userService = new UserService();
    }

    public getData = async (req: Request, res: Response) => {
            const response = await this.userService.getData();
            ApiResponse.result(res, response, StatusCodes.OK);
        }
}

export default UserController;