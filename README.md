# Kurofune Work

> React Native app built with Expo (ejected) and EAS CLI

## Prerequisites

- Node.js (v18 or higher)
- Yarn (v3 or higher recommended)
- EAS CLI: yarn global add eas-cli
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

~~~bash
yarn install
~~~

## Development

Start the development server (Expo CLI) with:

~~~bash
npx expo start
~~~

### Environment configuration

- .env.production loads automatically whenever Expo/EAS resolves the branch name main; .env.development is used for staging and every other branch. That detection lives inside app.config.js and keeps the OTA update branch aligned (main for production builds, staging otherwise).
- Use .env.example as the starting point whenever you add new variables, and keep secrets out of the repo (move them into .env.local, which is already ignored).
- Override the auto-selection with APP_ENV=production or APP_ENV=development before running npx expo start, npx eas build, or any other EAS workflow if you need to simulate a different branch configuration.
- Any value you define (for example APP_ENV, API_BASE_URL, FEATURE_FLAG_NEW_UI) is exposed via Constants.expoConfig.extra, so the client can react to the current environment.

### Run on a local phone

- Scan the QR code in the terminal with Expo Go (Android or iOS) while the server is running.
- For a custom dev client, run npx expo start --dev-client and open the matching dev client on your device.
- To force a tunnel connection when needed: npx expo start --tunnel.

### Run on simulator/emulator

- Android emulator: use npx expo start --android (requires Android Studio).
- iOS simulator: use npx expo start --ios (requires Xcode on macOS).
- Alternatively, start the CLI (npx expo start) and use the menu shortcuts: a for Android, i for iOS.

## Building with EAS

### Android

~~~bash
npx eas build --platform android
~~~

### iOS

~~~bash
npx eas build --platform ios
~~~

### Submit builds

Use EAS Submit with the latest builds:

~~~bash
npx eas submit --platform android --latest
npx eas submit --platform ios --latest
~~~

## OTA updates

Publish over-the-air updates via EAS Update:

~~~bash
npx eas update --branch main --message Describe the update
~~~

Use --branch to target different release tracks (e.g., preview, production).

