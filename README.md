<a href="https://www.code-is-fun.ch" target="_blank">
    <img src="https://www.code-is-fun.ch/logo_pos.png" />
</a>

# code is fun - learn coding online
This repository contains all files for the frontend of the learning plattform www.code-is-fun.ch.
This Plattform *only* works in combination with the dedicated backend created with Directus.
The project is built on Vue 3.  

## 💻 Local Installation 
1. Clone this repository
2. Run `npm install` in your terminal
3. Create a file named `.env.local` and fill it with the correct credentials (these credentials cannot be found in this repo, because they hold sensitive information)
4. Run `npm run serve` to start de developement server

## 📃 File structure explained
*Only the most important files and folders are explained here.* 

Folder or File | Use
--- | ---
`src` | the main part of the vue setup is in there
`src/assets` | the main logo-file
`src/components` | all vue components used in the project
`src/css` | the styling of the page
`src/helpers` | a file with reusable js-functions
`src/router` | all available routes
`src/store` | the main place for data storing
`src/views` | all main pages accessible as routes
`src/App.vue` | most important file with base structure on which all views are based
`src/main.js` | file that loads the single page application
`public` | publicly accessible stuff

