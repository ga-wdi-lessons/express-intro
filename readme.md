# Express

## Learning Objectives

- List common reasons JavaScript is used for server applications
- Compare and contrast JavaScript in the browser vs on the server
- Compare and contrast Express to Rails and Sinatra
- Use `npm` to manage project dependencies
- Use `module.exports` and `require` to organize code
- Use Handlebars templates to simplify rendering in Express
- Use and configure middleware (e.g. body-parser to handle form submissions)
- Link to static assets in an Express application

## Opening Framing (5 minutes / 0:05)

Let's start out by listing the things we've covered in the first three units of WDI...

- First we wrote code for the client using JavaScript for our application logic
- Next, we moved into Ruby and wrote apps with server rendered pages with all of our logic in Ruby
<!-- - Most recently, we wrote more complex code to be run as a Single Page App using AngularJS and supporting the client code with a Rails API

This most recent paradigm – SPA supported by a seperate API – will be the one we use going forward and is close to the "micro-service" architecture that is popular today. -->

This lesson introduces two new tools: Node and Express.
- **Node** is a JavaScript runtime environment for running JS in a server environment.
- **Express** is an un-opinionated ["Sinatra-inspired web development framework for node.js."](https://expressjs.com/)

<details>
  <summary><strong>What is a web framework?</strong></summary>
  <br>

  > A web framework is a toolset for listening and responding to web requests.

</details>

<br>

<details>
  <summary><strong>What do we mean when we say a framework is opinionated or un-opinionated?</strong></summary>
  <br>

  > The first web framework we used in Ruby was Sinatra. With `require 'sinatra'` we got access to a bunch of methods we could use to listen for particular requests. Next we used Rails, which served the same purpose as Sinatra but made lots of inferences for us and provided extremely powerful helper tools. Frameworks that leverage inference and "convention over configuration" are called opinionated. Rails is extremely opinionated. Sinatra is not.  
  >
  > The Express project prides itself in being un-opinionated. Like with Sinatra, we have a lot of freedom in how we structure our application, its routes, resources and assets (folders/files, how to load different files, managing dependencies, etc). This also means we need to do more ourselves.

</details>

<br>


### Turn and Talk (5 minutes / 0:10)

> Two minutes T&T. Three minutes discussion.

Why might we prefer an un-opinionated framework? Why might we not?

## Full Stack JavaScript

Everything we cover from here on is an extension of what we've already learned.
We will use Node and Express to do the exact same thing we have done with Ruby and Sinatra/Rails.

Writing JavaScript for the server has become very popular because it allows you to write front-end and back-end code in JavaScript.
<!-- The MEAN stack (MongoDB, Express, Angular, Node) is a very popular all-JS tech stack. -->
The MERN stack (MongoDB, Express, React, Node) is a very popular all-JS tech stack.

The JavaScript we write today is the same JavaScript we've come to know – it's just the environment that's different. We've been writing JavaScript to be run by a browser on a client machine. Now we will write JavaScript to be run by Node on a server.

<details>
  <summary><strong>What is the global object in the browser environment?</strong></summary>
  <br>

  > `window`. In node, the global object is `process`

</details>

<br>

## We Do: Hello World with Express (30 minutes / 0:40)

Let's jump right into creating a simple "Hello World!" Express application...

```bash
$ mkdir hello-express
$ cd hello-express
$ npm init
```

**npm** stands for "Node Package Manager". npm installs and manages dependencies – called "modules" in JavaScript – for our Node application. Modules are analogous to Gems in Ruby, while npm is similar to Bundler.

<details>
  <summary><strong>What does <code>npm init -y</code> do?</strong></summary>
  <br>

  > `$ npm init` will initialize a new NodeJS application. Upon initialization it
  will prompt you for some user input to update the package.json. Using the `-y` argument allows you to use the defaults and not prompt for any options.

</details>

<br>

Let's take a look at one of the files that was generated: `package.json`...

```js
{
  "name": "hello-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

> The `package.json` file contains metadata about your app or module. NPM is also able to manage scripts related to the project. We won't dive into this but [more here](https://css-tricks.com/why-npm-scripts/). Most relevant to us right now is that the file includes the list of project dependencies like the Gemfile did in our Ruby projects.

NOTE: use `npm init -y` to accept all defaults instead of going through the prompts.

The next thing we'd like to do is install the Express node module. Unlike with bundler, instead of adding a dependency by updating a file, we instead use the `npm` command from the terminal:

```bash
$ npm install --save express
```

> the `--save` flag updates the package.json to include the dependency you just installed. We could manually edit the `package.json` file but conventionally we use the CLI tool.

We can see in `package.json` that the default main file for a node app is `index.js`. We could change this, but we'll use the default for now.

Let's make a new `index.js` file and give it the following contents...

```js
const express = require("express")
const app = express()

app.listen(4000, () => {
  console.log("app listening on port 4000")
})
```

What's going on here?
- We've required the Express module which is a function that returns an instance of a web app
- Then we invoke the module instantiating a constant `app` which holds all the methods and state we use to write and run our web app
- The `listen` method starts the app and specifies the port where the app will listen for requests

When we run the application – `$ node index.js` – we can see `app listening on port 4000` in the terminal. The process continues to run occupying the shell process until we hit `ctrl + c` just like pervious servers we have run.

Let's try going to the local host of that port number by visiting `http://localhost:4000` in the browser. We'll see something like this...

```
Cannot GET /
```

<details>

  <summary><strong>What does this error mean? How might it be similar to what weve' seen in Sinatra and Rails?</strong></summary>
  <br>

  > We've told the server what port to listen on, but we didn't specify any route handlers. The absence of a `get` handler for the `"/"` route is our problem here.

</details>

<br>

Let's update `index.js`...

```js
app.get("/", (req, res) => {
  res.send("Hello World")
})
```

We added a route and handled it by sending the string `"hello world"` as the response. Let's see if this takes effect in the browser...

```
Cannot GET /
```

No change. The running server however has not been changed until we restart the server and refresh the page in the browser. And we see...

```
Hello World
```

Constantly needing to restart the server will get very tedious.

<details>
  <summary><strong>What was the fix for that in Sinatra?</strong></summary>
  <br>

  > `sinatra/reloader` from the sinatra-contrib repo would restart the server any time that files changed

</details>

<br>

The node module `nodemon` (a portmanteau of "node monitor") performs a similar task to `sinatra/reloader` but goes about it slightly differently. Instead of requiring `nodemon` in our code, we use `nodemon` from the command line.

In the terminal...

```bash
$ npm install --global nodemon
```

> When using the `--global` flag (-g for short), we're specifying that nodemon will be installed "globally" so we can utilize nodemon across all of our node applications (and also that it is not included in our project dependencies).

Then we start up our application a bit differently now. In the terminal...

```bash
$ nodemon index.js
```

## Params in URL in Express (5 minutes / 0:45)

Let's take a second to compare this `GET '/'` handler in express to [how we would write a handler in Sinatra](https://github.com/ga-wdi-exercises/emergency_compliment/blob/solution/server.rb#L14-L19).

Remember `params` in our Ruby frameworks? It's very similar in JS.

Let's update `index.js` to include...

```js
app.get("/:name", (req, res) => {
  res.send(`hello ${req.params.name}`)
})
```

## Break (10 minutes / 0:55)

## You Do: 99 Bottle of Beer (30 minutes / 1:25)

> 20 minutes exercise. 10 minutes review.

The exercise can be found [here](https://github.com/ga-wdi-exercises/99_bottles_express).

## Views (20 minutes / 1:45)

Let's leverage our [solution to 99 Bottles of
Beer](https://github.com/ga-dc/99_bottles_express/tree/solution) to learn about views.

Handlebars is a JavaScript module for templating. Handlebars templates are very similar to the `.erb` files we used in Sinatra and Rails in that we use code to augment our HTML.

> Handlebars is not the only templating engine we can use. [There are many others](https://github.com/expressjs/express/wiki#template-engines).

Install Handlebars as a project dependency...

```bash
$ npm install --save hbs
```

In `index.js`, let's [configure our express app](https://expressjs.com/en/guide/using-template-engines.html) to use Handlebars as its "view engine"...

```js
app.set("view engine", "hbs")
```

Let's go ahead and create a directory that will contain our templates in the root directory of
the Express 99 bottles application. In the terminal...

```bash
$ mkdir views
$ touch views/index.hbs
$ touch views/layout.hbs
```

Let's change up our existing `index.js` to utilize a template rather than sending in a string directly. In `index.js`...

```js
app.get("/:numberOfBottles?", ( req, res ) => {
  let bottles = req.params.numberOfBottles || 99
  let next = bottles - 1
  res.render("index", {bottles, next})
})
```

Instead of directly building a string as the response of that `GET` request, we instead want to render a view using Handlebars.
The `.render` function takes two arguments...
  1. The name of the view we want to render
  2. An object with values that will be made available in the view

The only problem is our view is empty! Let's go ahead and change that now. In `views/layouts.hbs`...

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
   {{{body}}}
  </body>
</html>
```

Notice the `{{{body}}}` syntax. This is because Handlebars by default escapes HTML and you need the additional set of brackets to indicate that you want to render the tags in the body as HTML.

This is also a great time to note how we serve static assets. Notice we linked a stylesheet in our layout file. In our `index.js`, let's also add...

 `app.use(express.static(__dirname + '/public'))`

This allows us to utilize files in that folder in the layout.

Finally we should update our index view to reflect the same strings we had before. In `views/index.hbs`...

```html
{{bottles}} bottles of beer on the wall.
{{#if next}}
  <a href='/{{next}}'>Take One Down, Pass it Around</a>
{{else}}
  <a href='/'>Start Over</a>
{{/if}}
```

> This syntax for the conditional statement is a [built-in helper from Handlebars](http://handlebarsjs.com/block_helpers.html).

## `module.exports` (20 minutes / 2:05)

A major distinction between JavaScript run in the browser and JavaScript run on the server is how the code is loaded into the environment.

<details>
  <summary><strong>How do we load a script in the browser?</strong></summary>
  <br>

  > We use a script tag (`<script src="/path/to/script"></script>`) in our HTML to tell the client browser to request, to load and run a script.

</details>

<br>

<details>
  <summary><strong>Why is this not an option in a server side environment?</strong></summary>
  <br>

  > There is no HTML document on the server.

</details>

<details>
<summary>What does it mean to 'polute the global namespace' and how have we seen this problem in the browser?</summary>

> 'Poluting the global namespace' means declaring variables in global scope.
This is undesirable because the larger an app is and the more global scope is used, the more likely we are to have a collision where some part of the app uses a global variable for one purpose and different part of the app uses a global variable with the same name for another.

> In the browser, the _only_ way for different scripts to interact with one another is by way of the global namespace.

  <!-- > AngularJS kept track of modules internally and we wrapped all of our code in IIFEs so that the extend of pollution of the global namespace was just the `angular` object. -->

</details>

<br>

We have already seen the `require` method used to load JavaScript files and modules. The `require` method returns a value which can be set to a variable and does not need to be grabbed out of global scope.

The other end of the `require` method, is the `module.exports` object. By assigning particular values to `module.exports`, we can explicitly define the object that will be brought in when another file `requires()` the file from which we are exporting.

For example...

```js
// calculator.js
module.exports = {
  add(a,b){
    return a + b
  }
}
```
To use `require(...)` to import a local file rather than a node module, the string that is passed into `require` needs to be a path.

```js
// index.js

// Instantiate global variable to grant access to module we've created
const calculator = require("./calculator.js")

// Use variable to call the .add() function defined in calculator.js
calculator.add(3,4)
```

> The path to a file in the same directory needs to be prefaced with a `./`.

A practical example would be to import our route handlers from a separate file...

```js
const bottles = require("./controllers/bottles.js")
app.get("/:numberOfBottles?", bottles.index )
```

We could create a routes module that defines our index route. Let's create a `controllers/bottles.js` file with the following contents...

```js
module.exports = {
  index( req, res ){
    let bottles = req.params.numberOfBottles || 99
    let next = bottles - 1
    res.render('index', {
      bottles,
      next
    })
  }
}
```

> We see the exact same behavior – just moved some logic into a different file.

If we had the seven RESTful routes that Rails provides for each model, you can start to see how keeping everything in the `index.js` can begin to become unwieldy.

## Break (10 minutes / 2:15)

## HTML Forms & POST Requests (20 minutes / 2:35)

Let's personalize our 99 bottles app.  We'll make a welcome page with a form asking for user's name.

We need a route and a view with a form...

```js
app.get("/", (req, res) => {
  res.render("welcome")
})
```

```html
<!-- views/welcome.hbs -->
<h1>Welcome to 99 Bottles</h1>
<form action="/" method="post">
  <label for="player_name">Please enter your name</label>
  <input id="player_name" type="text" name="player_name">
  <input type="submit">
</form>
```

Submit a name...

```
Cannot POST /
```

### How can we fix this?

> In `index.js`...

```js
app.post("/", (req, res) => {
  res.send("Hello there!")
})
```

Well it works, but it's not super valuable, we're not even getting our parameter. Let's greet the name submitted in the form...

```js
app.post("/", (req, res) => {
  res.send("Hello " + req.params.player_name)
})
```

hello undefined. Oh man. To be sure let's `console.log(req.params)`.

It's an empty object!

Our HTML form information is not in `req.params`. That's because Express is not handling information posted from a form. We need to install middleware – code that runs in between receiving the request and responding – in order to get form or JSON data in a POST request for Express applications. Rails and Sinatra already include the middleware to handle this. Express, by default, does not, so we need to install it manually.

### You Do: `body-parser` Walkthrough (10 minutes)

The middleware we will install is called **body-parser**. It used to be included to Express, but they took it out.

> Express prides itself in its minimalism. There are many [frameworks built on express](https://expressjs.com/en/resources/frameworks.html) that are opinionated and do a lot more out of the box. Express tries to stay flexible though.

In the terminal...

```bash
$ npm install --save body-parser
```

In `index.js`...

```js
// configure app to use body parser
const bodyParser = require("body-parser")

app.use(bodyParser.json()) //handles json post requests
app.use(bodyParser.urlencoded({ extended: true })) // handles form submissions
```

> Only the `urlencoded` body-parser middleware is necessary to get this form working.
The JSON bodyparser is necessary if we want to handle AJAX requests with JSON bodies.

Another thing to note is that, in Express, `req.params` holds just path params. Anything handled by the bodyParser (JSON or form bodies) will be held in `req.body`.

So we change the final post request in `index.js` to...

```js
app.post("/", (req, res) => {
  res.send(`hello ${req.body.player_name}`)
})
```

And finally, we'll integrate it the name into our index template...

```js
app.post("/", (req, res) => {
  res.render("index", {
    player_name: req.body.player_name,
    bottles: 99,
    next: 98
  })
})
```

And to our view...

```html
{{#if player_name}}
  Hey {{player_name}}, there are {{bottles}} left on the wall.
{{/if}}
```

> Be prepared to answer the following questions after completing this walkthrough...
> - What is the purpose of `body-parser`?
> - What is the difference between `bodyParser.urlencoded` and `bodyParser.json`?
> - How do we go about accessing values sent through a form in Express?

## You Do: Emergency Compliment (Homework)

[Emergency Compliment](https://github.com/ga-dc/compliment-express)

> Looking at the [Sinatra solution](https://github.com/ga-dc/emergency_compliment/tree/solution) for this assignment might be helpful.

## Sample Quiz Questions

- What is `npm`?
- Write a get request using any path as you would in an Express application.
- How does `module.exports` help us with separation of concerns?
