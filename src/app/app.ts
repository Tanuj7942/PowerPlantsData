import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Routes } from './interfaces/routes.interface';
import { appConfig } from './config/app.config';

class App {
    public app: express.Application;
    // public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        // dotenv.config();
        this.app = express();
        // this.env = process.env.NODE_ENV || 'development';
        this.port = appConfig.port || 2000;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        // this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            // console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private initializeRoutes(routes: Routes[]) {
        // logger.info('all routes - ', routes) 
        routes.forEach((route) => {
            this.app.use('/v1', route.router);
        });
    }

    // private initializeErrorHandling() {
    //     this.app.use(notFoundErrorHandler);
    //     this.app.use(errorHandler);
    // }
}

export default App;
