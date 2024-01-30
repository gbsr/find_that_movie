# Project Overview

This is a React application that allows users to search for movies using the OMDB API. The user can enter a movie title, and the application will display a list of matching movies. Each movie card includes the title of the movie and a link to its IMDB page.

## Key Files

### App.js

This is the main component of the application. It manages the state for the search query, the search results, the current page, and any error messages. It also defines the [`searchMovies`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/App.js") function, which fetches data from the OMDB API and updates the state with the results.

### MovieCard.jsx

This component represents a single movie in the search results. It displays the movie's title and a link to its IMDB page. It also fetches and displays a short plot summary for the movie.

### debounce.js

This file exports a [`useDebounce`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/helpers/debounce.js") hook, which can be used to delay a function call until a certain amount of time has passed without the function being called again. This can be useful for reducing the number of API requests made while the user is typing in the search box.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "http://localhost:3000") to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://facebook.github.io/create-react-app/docs/running-tests") for more information.

### `npm run build`

Builds the app for production to the [`build`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "build") folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

### `npm run eject`

Note: this is a one-way operation. Once you `eject`, you can't go back! If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Learn More

You can learn more in the [Create React App documentation](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://facebook.github.io/create-react-app/docs/getting-started").

To learn React, check out the [React documentation](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://reactjs.org/").
