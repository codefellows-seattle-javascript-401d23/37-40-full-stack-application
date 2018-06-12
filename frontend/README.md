# Parcel Creator
**Author**: Joanna Coll
**Version**: 1.0.0 

## Overview

This app lets the user input data to create a user account. It has a dashboard where the form for user data is displaying. The user can add following information: name, email, password that gets to create an account. The login is necessary to access the dashboard and the rest of the features. All the data added from the user input gets stored on mongodb and the password is stored as a token for the safety.

## Getting Started

1. To start you need to install all the necessary dependencies and create all the directories for front-end.
2. Start with building webpack.common.js and webpack.dev.js files and utils to pre-define functions bind.
3. Create .env files both for front-end and back-end.
4. Create reducer, store and action files. 
5. Reducer should contain token actions:
  * `TOKEN_SET`
  * `TOKEN_REMOVE`
6. Create Dashboard component that renders basic view of the page after login
7. Create UI state that takes name, email and password to authenticate.
8. Actions file - auth.js needs to create actions for login and signup.
9. Create auth-redirect.js file to store conditions on how to access some routes. Dashboard will be accessed only with a login otherwise the user will be displayed ROOT_ROUTE which is landing page.
  * Do I need to connect ot the store?
  - This component needs access to the token.
  * Do I need props?
  - Yes we need the location?
  * Do I need any member functions/methods or life-cycle hooks?
  - Nothing besides render.
  * What do i need to render?  

10. Create Landing page and the view options for singup or login.
11. Add reporter and thunk middleware to your redux store.
12. Render all the components into HTML.
13. Add logout route in token.js, header.js and auth.js and routes.js.
This will give a logout functionality and an option to store cookies locally.
14. Link Header component to app.js.
13. Change scss file accordingly.
14. Run: run dbon, npm run start, npm run watch to test the app. The address line must be at least 10 characters long.


## Architecture
JavaScript, Node.js, Airbnb package, webpack babel, Sass, React, Redux, Enzyme, Jest, Babel, middleware, Superagent, MongoDB, other dependencies

## Change Log

05-12-2018 4:00pm - The application is finished.
05-12-2018 9:30pm - Finished writing README.md




