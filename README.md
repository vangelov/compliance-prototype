# Products Task

A simple CRUD application for books.

## How to run it

-   `yarn/npm install`
-   `yarn/npm start`

This runs the app in development mode. In order to build it for production run:

-   `yarn/npm build`

## Notes

-   Permissions can be updated in the `src/state/permissions/api.js` file
-   Errors can be simulated by uncommenting the relevant code in the `api.js` files in `src/state/products` and `src/state/permissions`

## Folder organization

-   `/App`: Contains all components. This folder has the following recursive tree structure and file name conventions:

        /ComponentX
            /ComponentY
                index.js
            ComponentZ.js
            index.js

    The file tree structure mimics the render tree on the DOM, i.e. if `ComponentX` contains or may contain `ComponentY` or `ComponentZ` as children, the last two are files or directories in the `/ComponentX` folder. This organization allows us to easily see the UI structure of app.

-   `/state`: Contains all code related to the app state: actions, selectors, reducers, etc. The folder is organized by the reducer name in the store. It has the following recursive tree structure and file name conventions:

         /reducerNameInTheStoreX
             /reducerNameInTheStoreY
             /reducerNameInTheStoreZ
             reducer.js (or reducerMaker.js)
             selectors.js
             actions.js
