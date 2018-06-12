
Lab 40: 

Profile functionality added.
Now users can create and update their profiles.

--------------------

Lab 39:

Several fields on the account creation form are now subject to validation. 

Usernames and passwords have a minimum character length. 
Usernames must include a number.
Emails must be valid emails. 

---------------------

A new version of the app adds user authentication and routes.
The app dashboard is now only accessible to logged in users. 
Lab 38:

The app now receives cookies as a means of persisting the login token and remembering a user within a single session. 

-----------------
Lab 37:

The new back-end, sluggram, requires a .env file with the following properties:

PORT=3000
DEBUG=true
CORS_ORIGINS=http://localhost:8080
MONGO_URI=mongodb://localhost/testing
SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=

------------------------------
Lab 36: 

This application has a front-end powered by React/Redux, and a back-end providing routing and access to a MongoDB database. It's merely a full-CRUD interface for a generic resource. 

To build it, you will need both file systems. 
Add the folllowing to a .env file in the front-end:

API_URL=http://localhost:3000
NODE_ENV=development

And for the back-end:

PORT=3000
MONGODB_URI='mongodb://localhost/somedbname'

Then run MongoDB on your local host so that it's actively listening.
Remember to npm install all the necessary packages on both back and front ends.

At this point, you will be ready to run the back-end server. Use npm or nodemon to get the server running.

If the back-end is running without a problem, you can npm run-script watch the front end, and see if you can access the full CRUD functionality.




