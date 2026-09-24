# PaDoc web app

This project is now a browser-based React and Vite implementation. The old Flutter and React Native code has been removed. The site works in desktop and mobile browsers and preserves the Firebase Auth and Firestore workflow.

## Local setup

1. Install Node.js 20 or newer.
2. Create a new Firebase project with Email/Password Authentication and Firestore enabled.
3. Copy `.env.example` to `.env` and fill it with the new Firebase web app configuration.
4. Install dependencies with `npm install`.
5. Start the site with `npm run dev`.

To deploy the Firestore rules, install the Firebase CLI, run `firebase login`, select the project with `firebase use <project-id>`, and run `firebase deploy --only firestore:rules`.

The app expects these Firestore collections:

- `users`: patient accounts, including `uid`, `name`, `email`, and `role: "user"`.
- `doctors`: doctor accounts, including `uid`, `name`, `email`, and optional `speciality`.
- `appointments`: patient bookings, including `patientId`, `doctorId`, `doctorName`, and `date`.

Firebase credentials are intentionally not committed. The new Firebase project credentials must be supplied in `.env` before the app can initialize Firebase.