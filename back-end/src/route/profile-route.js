'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';


const profileRouter = new Router();
const jsonParser = json();

profileRouter.get('/profiles', bearerAuthMiddleware, (request, response, next) => {
  return Profile.find()
    .then((profiles) => {
      const allUsers = [];
      profiles.forEach(profile => allUsers.push(profile.username));
      return response.json(allUsers);
    })
    .catch(next);
});

profileRouter.get('/profiles/me', bearerAuthMiddleware, (request, response, next) => {
  return Profile.findOne({ user: request.user._id })
    .then((profile) => {
      if (!profile) return next(new HttpError(404, 'ERROR user not found'));
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.put('/profiles/me', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  return Profile.findOne({ user: request.user._id })
    .then((profile) => {
      if (!profile) return next(new HttpError(404, 'ERROR user not found'));
      profile.set(request.body)
      return response.json(profile);
    })
    .catch(next);
});

export default profileRouter;

