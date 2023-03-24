import App from './app';
import PowerPlantsRoute from './routes/app.route';

const app = new App([new PowerPlantsRoute()]);

app.listen();
