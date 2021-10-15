# How to Build a Team Messenger Site With React (Slack Clone)

Read the full tutorial here: [**>> How to Build a Team Messenger Site With React (Slack Clone)**](https://www.cometchat.com/tutorials/#)

This example shows How to Build a Team Messenger Site With React (Slack Clone):

![Slack Clone](./screenshots/0.png)
<center><figcaption>Slack Clone</figcaption></center>

## Technology

This demo uses:

- CometChat Pro 2.4.0
- Firebase
- React
- Material Icons

## Running the demo

To run the demo follow these steps:

1. [Head to CometChat Pro and create an account](https://app.cometchat.com/signup)
2. From the [dashboard](https://app.cometchat.com/apps), add a new app called **"slack-clone"**
3. Select this newly added app from the list.
4. From the Quick Start copy the **APP_ID, APP_REGION and AUTH_KEY**. These will be used later.
5. Also copy the **REST_API_KEY** from the API & Auth Key tab(may no needed).
6. Navigate to the Users tab, and delete all the default users and groups leaving it clean **(very important)**.
7. Download the repository [here](https://github.com/Daltonic/slack-clone/archive/master.zip) or by running `git clone https://github.com/Daltonic/slack-clone.git` and open it in a code editor.
8. [Head to Firebase and create a new project](https://console.firebase.google.com)
9. Change file called **app.config.js** in the **src** folder of your project.

```js
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const COMETCHAT_CONSTANTS = {
    APP_ID: 'XXXXXXXXXX',
    REGION: 'US',
    AUTH_KEY: 'YYYYYYYYYYYYYYYYYYY'
}

export const FIREBASE_CONSTANTS ={
    apiKey: "XXXXXXXXXXXXXXXXXXX",
    authDomain: "slack-clone-c133a.firebaseapp.com",
    projectId: "slack-clone-c133a",
    storageBucket: "slack-clone-c133a.appspot.com",
    messagingSenderId: "XXXXXXXXXXXXX",
    appId: "XXXXXXXXXXXX",
    measurementId: "XXXXXXXXXXXXX"
}

export { firebaseConfig, cometChat }
```

11. Run the following command to install the app.

```sh
    npm install
    npm start
```

Questions about running the demo? [Open an issue](https://github.com/Daltonic/slack-clone/issues). We're here to help ✌️

## Useful links

- 🏠 [CometChat Homepage](https://app.cometchat.com/signup)
- 🚀 [Create your free account](https://app.cometchat.com/apps)
- 📚 [Documentation](https://prodocs.cometchat.com)
- 👾 [GitHub](https://www.github.com/cometchat-pro)
- 🔥 [Firebase](https://console.firebase.google.com)
- 🔷 [React](https://reactjs.org/)
- ✨ [Live Demo](https://slack-clone-b1ecf.web.app/)
