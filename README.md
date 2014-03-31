# gulp-browserify-shim-angular-boilerplate

#### A boilerplate for gulp, browserify, and angular that includes all the trimmings to get you started quickly


---


New things are shiny! This boilerplate uses the following libraries and tools:


- `gulp` (and a few utility plugins)
- `browserify` (via `gulp-browserify` and `watchify`)
- `angular` (via `bower`)
- HTML5BP
- My own [nodejsSimpleBoilerplate](https://github.com/jkymarsh/nodejsSimpleBoilerplate)


---


#### Core concepts


- Segregate compiled 'libs' bundle from 'app' bundle; this not only makes it easier to manage third-party dependencies separately from app code, it also allows you to share the 'libs' bundle between physical pages, if necessary.

- Provide both 'dev' and 'prod' bundles of both the 'libs' and 'app' bundles; the 'dev' bundles preserve sourcemaps and do not minify, while the 'prod' bundles do the opposite.

- Establish logical defaults for directory structure and code organization.


---


#### How to run


1. Clone this repo, dummy
2. Ensure you have `gulp` installed globally, if necessary
3. `npm install`
4. `bower install`
5. Either `npm start` to start the webserver, or use a package like `supervisor` or `nodemon`
6. Check out the `gulpfile` for tasks to compile both the libs bundle and the app code, and compile each
7. Refresh your browser and marvel with joy!


---


#### Please note


This is still a work-in-progress! Make sure you check out the `.gitignore`, `package.json`, and `bower.json` files.
