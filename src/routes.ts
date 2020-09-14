import express from 'express';
import multer from 'multer';
import PostController from './controller/PostController';

const uploadConfig = require('./config/multer');

const postController = new PostController()

const routes = express.Router();
const upload = multer(uploadConfig)

routes.post('/newPosts', upload.single('image') ,postController.create);
routes.get('/newPosts', postController.index);
routes.put('/newPosts/:id',postController.update);
routes.delete('/newPosts/:id', postController.delete);

export default routes;