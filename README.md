# 🐄

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and TypeScript.

## Technologies

| Technology      | Use                  |
| --------------- | -------------------- |
| Cucumber        | BDD Testing          |
| SonarCloud      | Code Analysis        |
| React Router V6 | Routing              |
| Prettier        | Linting / Formatting |
| Github Actions  | CI                   |
| Azure           | CD                   |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test -- --coverage --testResultsProcessor=jest-sonar-reporter`

Launches the test runner with coverage for SonarCloud.

### `npm run cucumber-test`

Launches the cucumber tests.

### `npm run docker-start`

Builds docker image of the project.
