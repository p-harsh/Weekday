# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

.css colors

<hr/>

## Project Description

The folder structure of the project

- assets - to contain images and icons used
- common - common components that can be used in more than two components
- configs - contains configuration file to control easy updating and readability
- hooks - componental logics that can be used multiple times
- utils - utilities function, e.g. store, redux reducers, and other functions
- Views - Different views of the app, Dashboard, Profile, etc.

Each component folder contains an index.jsx file which exports the required components, the logic to not use index file as main components is because of readability.
While working on various components it becomes difficult to identify which component is which by seeing the name index.js of all the files
