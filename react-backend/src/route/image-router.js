'use strict';

import multer from 'multer';
import { Router } from 'express';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import Image from '../model/image';
import { s3Upload, s3Remove } from '../lib/s3';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const imageRouter = new Router();

imageRouter.post('/images', bearerAuthMiddleware, multerUpload.any(), (request, response, next) => {
  console.log(request, 'the request');
  if (!request.account) {
    return next(new HttpError(404, 'IMAGE ROUTER ERROR: not found'));
  }

  if (!request.body.description || request.files.length > 1 || request.files[0].fieldname !== 'image') {
    return next(new HttpError(400, 'IMAGE ROUTER ERROR, invalid request'));
  } 

  const file = request.files[0];
  const key = `${file.filename}.${file.originalname}`;

  return s3Upload(file.path, key)
    .then((awsUrl) => {
      return new Image({
        description: request.body.description,
        account: request.account._id,
        url: awsUrl,
      }).save();
    })
    .then(image => response.json(image))
    .catch(next);
});

imageRouter.get('/images/:id', bearerAuthMiddleware, (request, response, next) => {
  return Image.findById(request.params.id)
    .then((image) => {
      if (!image) {
        return next(400, 'No Image, bad ID');
      }

      logger.log(logger.INFO, 'Returning a 200 status code and requested Image');
      return response.json(image);
    })
    .catch(next);
});

imageRouter.delete('/images/:id', bearerAuthMiddleware, (request, response, next) => {  
  return Image.findById(request.params.id)
    .then((image) => {
      if (!image._id) {
        return next(new HttpError(404, 'DELETE - image not found'));
      }
      return s3Remove(image.url);
    })
    .then(() => response.sendStatus(204));
});

export default imageRouter;
