'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
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

profileRouter.get('/profile', bearerAuthMiddleware, (request, response, next) => {
  console.log(request.user);
  return Profile.findOne({ user: request.user._id })
    .then((profile) => {
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.put('/profile', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  return Profile.findOne({ user: request.user._id })
    .then((profile) => {
      const options = { runValidators: true, new: true };
      return Profile.findByIdAndUpdate(profile._id, { bio: request.body.bio }, options);
    })
    .then((updatedProfile) => {
      return response.json(updatedProfile);
    })
    .catch(next);
});

export default profileRouter;
