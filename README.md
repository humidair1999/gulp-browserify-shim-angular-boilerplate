# gulp-browserify-shim-angular-boilerplate

#### A boilerplate for gulp, browserify, and angular that includes all the trimmings to get you started quickly


---


New things are shiny! This boilerplate uses the following libraries and tools:


- gulp (and a few plugins)
- browserify (via gulp-browserify)
- angular
- napa
- HTML5BP
- My own [nodejsSimpleBoilerplate](https://github.com/jkymarsh/nodejsSimpleBoilerplate)


---


#### Core concepts


- Attempt to manage ALL dependencies via npm/napa: view the `package.json` for more info. This is in contrast to using a dependency manager like Bower.

- Manage browserify and its shim configuration entirely via gulp tasks.

- Establish logical defaults for directory structure and code organization.


---


#### How to run


1. Clone this repo (duh)
2. Ensure you have gulp and browserify installed, if necessary
3. `npm install` to install all dependencies and napa packages
4. Either `npm start` to start the webserver, or use a package like supervisor or nodemon
5. `gulp` or `gulp prod` to compile the client-side JS for the first time
6. Refresh your browser and marvel with joy!


---


#### Please note


This is still a work-in-progress! Make sure you check out the `.gitignore` and `package.json` files.