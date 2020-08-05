import express from 'express';
import ClassesContoller from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classContoller = new ClassesContoller();
const connectionsController = new ConnectionsController();

routes.post('/classes', classContoller.create);
routes.get('/classes', classContoller.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;