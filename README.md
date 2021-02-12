# Mock Pinterest
> Mock Pinterest is a front-end application built with React.js that replicates the popular Pinterest application. All data is user-generated and stored in a firebase database. Users are able to create boards and pins and associate pins with selected boards. User can also use the searchbar to find specific boards and pins. 

## Deployed Site 
https://react-pinterest-322f4.web.app/

## Deploying Your Own Firebase/React app
## Create the `.env` file
1. In the ROOT of your application, create a `.env` file
1. Add `.env` to your `.gitignore` file
1. Place the following in that file with your keys as the values
```
REACT_APP_API_KEY=XXX
REACT_APP_AUTH_DOMAIN=XXX
REACT_APP_DATABASE_URL=XXX
REACT_APP_PROJECT_ID=XXX
REACT_APP_STORAGE_BUCKET=XXX
REACT_APP_MESSAGING_SENDER_ID=XXX
REACT_APP_APP_ID=XXX
REACT_APP_MEASUREMENT_ID=XXX
```

## Create the `apiKeys.js` file
1. Create `apiKeys.js` in your `helpers` directory.
1. Place the following in the file:
```
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export default firebaseConfig;
```


## Get Started with Firebase Deploy
1.  Globally install the Firebase tools on your machine (1x per machine)

`npm install firebase-tools -g`

NOTE: if after global installation, you have issues, you can run `npm install firebase-tools` in your specific project. If you run into permissions errors, use `sudo` before the command.

2.  Log into your firebase account via google (1x per machine unless you get logged out)
`firebase login`

:warning: Notes for windows users:
* Use the integrated terminal in VS Code
* If you are getting this error: `Error: Cannot run login:ci in non-interactive mode.` run the following command `firebase login --interactive`

## If Your Project Uses Webpack:
### Firebase Setup:
1. Update the scripts section of your package.json to include a deploy script:
```json
"scripts": {
    "deploy": "npm run build && firebase deploy"
  },
```
2. Create a Firebase project (if you don't already have one for the database, Firebase will cap it at 5, BUT it will also let you create more if you request them and mention you are in school).
3. Run `firebase init`
    * Select `hosting` using your arrow keys, **hit the space bar and hit enter**
    ```
    SAMPLE OUTPUT:
    ? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. 
    Hosting: Configure and deploy Firebase Hosting sites
    ```
    * Please select an option: using your arrow keys select **Use an existing project**
    ```
    SAMPLE OUTPUT:
    === Project Setup
    ? Please select an option: Use an existing project
    ? Select a default Firebase project for this directory: fir-cows-958ae (firebase-cows)
    i  Using project fir-cows-958ae (firebase-cows)
    ```
    * Project Setup > select the project using your arrow keys, hit the space bar and hit enter
    * What do you want to use as your public directory? (public) > type `build` and hit enter
    * Configure as a single-page app (rewrite all urls to /index.html)? (y/N) > type `y` and hit enter
    ```
    SAMPLE OUTPUT:
    === Hosting Setup
    ? What do you want to use as your public directory? build
    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ✔  Wrote build/index.html

    i  Writing configuration info to firebase.json...
    i  Writing project information to .firebaserc...

    ✔  Firebase initialization complete!
    ```
    * **IF it asks you if you want to overwrite > type `n` and hit enter**
4. run `npm run deploy`
5. Modify your `.gitignore` - add the firebase folder `.firebase/`

### After Changes are made
So you made some cool new changes to your project.  You did a PR and merged everything to master.  How do you get those changes deployed to firebase?  Easy!  Locally switch to master and pull down the changes.  Then run `npm run deploy`.  Then check that your changes are there.  Firebase does do some caching so if you don't see your changes clear your cache and look again.

## If Your Project Is Just Vanilla JS
### Setup
1.  Nest all of your project in a directory named 'public' EXCEPT for the README and any screenshots for the README. EG:
```
- public/
  |-index.html
  |-js/
    |-stuff.js
    |-main.js
  |-main.css
- README.md
- screenshots/
```
2. Create a Firebase project (if you don't already have one for the database, Firebase will cap it at 5, BUT it will also let you create more if you request them and mention you are in school).
3. Run `firebase init`
    * Select `hosting` using your arrow keys, hit the space bar and hit enter
    * Project Setup > select the project using your arrow keys, hit the space bar and hit enter
    * What do you want to use as your public directory? (public) > type `public` and hit enter
    * Configure as a single-page app (rewrite all urls to /index.html)? (y/N) > type `n` and hit enter
4. run `firebase deploy`

### After changes are made
Each time you are ready to re-deploy run `firebase deploy`



