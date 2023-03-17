import { Router } from "express";
import UserController from "../controllers/app.controller";
import { Routes } from "../interfaces/routes.interface";

class UserRoute implements Routes {
    public path = '/v1/user';
    public router = Router();
    private userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,
            this.userController.getData);
    }
}

export default UserRoute;