JakePHP
-------

JakePHP is a boilerplate created for modern web application development on Linux platforms. Simply clone, and start developing!

Features
========

* [PHP](http://php.net)
* [Composer](https://getcomposer.org/download/)
* [Slim3](http://www.slimframework.com/)
* [npm](http://npmjs.com)
* [Webpack](https://webpack.github.io)
* [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)
* [PostCSS](https://github.com/postcss/postcss)
* [Babel](https://babeljs.io)
* [ReactJS](https://facebook.github.io/react/)

Installation
============

Clone the repo:

    git clone http://github.com/JamesTheHacker/JakePHP
    cd JakePHP

Install NodeJS dependencies:

    npm install

Install composer dependencies:

    php composer.phar install

Running The Development Server
==============================

In the terminal run the following command:

    npm start

This will launch PHP's built in server in the background, and Webpack's `webpack-dev-server`. If you navigate to [http://localhost:8080](http://localhost:8080) you should now see **JakePHP** in action.

**Hot Module Replacement & Live Reloading**

[Hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html) and live reloading is enabled by default. Say goodbye to manual browser refreshing in development!

After running `npm start` open `src/css/components/hello.css` in your favorite text editor  and change the background color to `red`. Hit save. You should now see the page automatically reload with a red background. Try create a new `js` module in `src/js` and importing into `entry.js`. Magic happens :)

**Log Files**

Because PHP is running in the background `STDERR` and `STDOUT` are not visible in the terminal. Instead, any errors are redirected to a log file: `app/logs/php.log`.

`app/logs/app.log` is used to store [Monolog](https://github.com/Seldaek/monolog) log messages from within the Slim3 application.

Build
=====

When you're ready to push your application to production you need to build the JavaScript and CSS files. Webpack takes care of this for you. It takes all the CSS and JavaScript files within the `src/` directory and bundles them into `app.js` and `app.css` files and saves them to `app/public/`. It will also minify, compress and optimize the files which results in smaller filesizes.

To build run the following command:

    npm run build

JavaScript and CSS Best Practices
=================================

JavaScript and CSS files should be stored under the `src/js` and `src/css` directories respectively. Each directory contains a `components` directory which should be used to modularize your CSS and JavaScript files - especially if you're using ReactJS.

Do not use `entry.js` for anything other than bootstrapping. Use `src/js/base.js` and `src/css/base.css` for including components.

PostCSS
=======

By default the following PostCSS plugins are installed and configured:

* [postcss-import](https://github.com/postcss/postcss-import)
* [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
* [postcss-nested](https://github.com/postcss/postcss-nested)
* [precss](https://github.com/jonathantneal/precss)
* [lost](https://github.com/peterramsing/lost)
* [autoprefixer](https://github.com/postcss/autoprefixer)

Use ES6 :)
==========

**JakePHP** uses Babel to transpile ES6 into ES5. You can start using ES6 right away, no configuration required! If you've never used ES6 you're missing out. [Checkout ES6's new features](https://github.com/lukehoban/es6features).

ReactJS
=======

ReactJS is ready to use out of the box. Components are stored in the `src/js/components` directory. If you don't require ReactJS remove the following lines from `src/js/base.js`

    import React from 'react';
    import ReactDom from 'react-dom';
    import Hello from './components/Hello.jsx';

    ReactDom.render(
      <Hello />,
      document.getElementById('root')
    );

Composer
========

Composer is a package manager for PHP. Checkout [Packagist](https://packagist.org/).

Installing a package is simple. Let's install [Facebook's Graph SDK](https://github.com/facebook/php-graph-sdk):

    php composer.phar require facebook/graph-sdk

Use in your application like so:

    $fb = new \Facebook\Facebook([
        'app_id' => '{app-id}',
        'app_secret' => '{app-secret}',
        'default_graph_version' => 'v2.8',
        //'default_access_token' => '{access-token}', // optional
    ]);

It's as easy as that :)

Slim3
=====

Slim3 is a lightweight micro framework. It's well documented, easy to use, and very useful for creating an API or web application.

The root directory for the Slim3 application is `app/`. This directory contains the following files/directories:

* **logs**: Used for storing application and PHP logs
* **public**: Used for storing assets such as CSS files, JS files, images and index.php
* **src**: This is where you put your project source files, custom classes etc.
* **templates**: This is where the HTML view templates live
* **tests**: Unit tests live here. Slim3 uses [PHPUnit](https://phpunit.de/).

Issues
======

* If you try to run `npm start` after running `npm run build` make sure you delete the `app/public/app.css` and `app/public/app.js` files. If not, these files will be loaded in and may cause issues with hot module replacement and live reloading.

FAQ's
=====

If you have a question, or a problem, please file an issue.

**Why is there a src directory outside the app/ directory?**

The `src/` directory is used to store CSS and JavaScript files/components. These files are not used in the final build of the application and are not a part of the Slim3 application. Remember, Webpack bundles all these files into minified `app.js` and `app.css` files and stores them in `app/public/`.

**How do I get rid of the welcome message?**

That's easy ...

1. Remove the following lines from `src/js/base.js`:

    import Hello from './components/Hello.jsx';

    ReactDom.render(
      <Hello />,
      document.getElementById('root')
    );

2. Delete the `src/js/components/Hello.jsx` file
3. Delete the `src/css/hello.css` file
4. Remove the following line from `src/css/base.css`:

    @import "./components/hello.css"

5. Delete the following line from `app/templates/index.html`:

    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100" rel="stylesheet">


About Jake
==========

This project was named after my 9 year old stepson Jake. He's awesome and has an active interest in game development and programming. [Here he is doing binary addition](https://www.youtube.com/watch?v=bbMW7aWs08Q).

<3

Contributing
============

This project is a active work in progress. I welcome any feedback, support and contributions. If you have a problem please file an issue. If you want to fix an issue, or add something cool to the project please submit a pull request.

TODO
====

* Add JS linting support
