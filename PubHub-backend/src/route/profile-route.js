'use strict';

import HttpError from 'http-errors';
import { Router } from 'express';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';


const profileRouter = new Router();

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

export default profileRouter;
