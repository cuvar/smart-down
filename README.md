# smart-down

This is a simple demonstration app of how distributed note-taking apps can work using [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation). 

## Getting started
First, clone the repo and install all dependencies using `npm install`.

For testing purposes, you can run the app locally using `npm run dev`. This will start the app on port 3000. You can then access the app via `http://localhost:3000`.

For production, you can build the app using `npm run build` and then start it using `npm start`. The app will then be available on port 3000. 

## Functionalities
smart-down is a simple note-taking app, that stores all notes locally on the server. Hence, no database is needed. The app uses basic auth for administration purposes. Rename the `.env.example` to `.env` and set the username and password as well as other values. An administrator can 
- create new notes
- control whether they are publicly accessible or not
- delete notes

By default, notes are not publicly accessible. To make them publicly accessible, the administrator has to click `share` on the note screen. The note will then be accessible via the same link, e.g. `http://yourserver.com/a-wonderful-uuid-to-your-note`.

Users can write and delete content from notes. However, users need to persist their modifications with a click on the `save` button. Otherwise, the changes will be lost.

Internally, the app uses [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) for resolving conflicts of users' modifications. This way, multiple users can edit notes simultaneously.