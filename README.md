# Frontend Coding Challenge

Clone this repo, run `npm install` and start the project using `npm run dev`.
The instructions for completing the task can be found in the site that will launch.

## Additional Hints

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


### GraphQL typescript interface generation

To generate typescript interfaces for all queries from /src/api/requests, please run

``
npm run codegen
``

### Exercise 1
New pages have been added here: http://localhost:5173/histories

### Exercise 2
Notification has been added for both error handling and on successful load.

### Exercise 3
Testing has been added for HistoryCard component and for Histories page

