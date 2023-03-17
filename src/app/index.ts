import App from './app';
import UserRoute from './routes/app.route';

const app = new App([new UserRoute()]);

app.listen();
