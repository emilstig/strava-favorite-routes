# Favorite Routes 🏃‍♂️

> A prototype that presents your starred Strava routes on a Google map.

## 🧘‍♂️ Demo

Live demo of the project can be found here —>

## 🏋️‍♀️ Setup project

1.  **Install the project.**

    ```sh
    yarn install
    ```

2.  **Setup your app.**

    To start developing with the Strava API, you will need to make an application to get the specific keys.

    1. If you have not already, go to https://www.strava.com/register and sign up for a Strava account
    2. After you are logged in, go to https://www.strava.com/settings/api and create an app
    3. You should see the “My API Application” page now. Keep it open and move on to the next step

3.  **Start the project.**

    Before starting up your project. Copy the .env.example into .env.development.local and replace the following variables with the ones from your newly created app page.

    `REACT_APP_STRAVA_ACCESS_TOKEN`

    `REACT_APP_STRAVA_USER_ID`

    ```sh
    yarn start
    ```

    Your site is now running at `http://localhost:3000`!

## 🤸‍♀️ Release History

- 0.1.0
  - The first prototype

## Author

Emil Enestig – [@emilenestig](https://twitter.com/emilenestig)
