# Express

## Learning Objectives

- List common reasons JavaScript is used for server applications
- Compare and contrast JavaScript in the browser vs JS on the server
- Compare and contrast Express.js to Rails / Sinatra.
- Use `npm` to manage project dependencies
- Use `module.exports` and `require` to organize code
- Use Handlebars templates to simplify rendering in Express
- Use and configure middleware, e.g. body-parser to handle form submissions
- Link to static assets in an Express application

## Opening Framing (15/15)

Let's start out by listing the things we've covered in the first 3 units of WDI.

- First we wrote code for the client using JavaScript for our application logic.
- Next, we moved into Ruby and wrote apps with server rendered pages with all of our logic in Ruby.
- Most recently, we wrote more complex code to be run as a Single Page App using AngularJS and supporting the client code with a Rails API.

This most recent paradigm, SPA supported by a seperate API will be the one we use going forward and is close to the 'micro-service' architecture that is very popular contemporarily.

The class introduces Node and Express. Node is a JavaScript runtime environment (ie a program for running JavaScript code) for running JS in a server environment.

Express is a ["Sinatra inspired web development framework for node.js."](https://expressjs.com/)

The relation is analogous!
> Express:NodeJS::Sinatra:Ruby


<details>
  <summary>What is a web framework?</summary>
  <p style="color:grey;">
  A web framework is a toolset for listening for an responding to web requests.
  </p>  
</details>


<details>
  <summary>
  What is meant by opinionated/unopinionated in regards to frameworks?
  </summary>
  <p style="color:grey;">
  The first web framework we used in Ruby was Sinatra; through just the line `require 'sinatra'`, we got access to a bunch of methods we could use to listen for particular requests. Next we used Rails which served the same purpose as Sinatra but made lots of inferences for us and provided extremely powerful helper tools. Frameworks that leverage inference and "convention over configuration" are called opinionated. Rails is extremely opinionated. Sinatra is not.  
  </p>
  <p style="color:grey;">
  The Express project prides itself in being unopinionated. Just like we did with Sinatra, we have a lot of freedom in how we structure our application, its routes, resources, and assets (folders/files, how to load different files, managing dependencies, etc). This also means we need to do more ourselves.
  </p>
</details>



### Turn and Talk (3 min)
- Why might we prefer an unopinionated framework?

## Full Stack JavaScript
Everything we cover from here on is an extension of what we've already learned.
We will use Node and Express to do the exact same thing we have done with Ruby and Sinatra/Rails.

Writing JavaScript for the server has become very popular because it allows you to write all JavaScript.
The MEAN stack (MongoDB, Express, Angular, Node) is a very popular all JS tech stack.

The JavaScript we write to be executed by Node is still JavaScript, but the environment is different. We've been writing JavaScript to be run by a browser on a client machine. Now, we will write JavaScript to be run by Node on our server as we had done with Ruby.

<details>
  <summary>
  What is the global object in the browser environment?
  </summary>

  > `window`. In node, the global object is `process`

</details>

## Hello World - Express (We Do 30 min, 45 min)

Let's jump right into creating a simple "Hello World!" Express application.

In the terminal:
```bash
$ mkdir hello-express
$ cd hello-express
$ npm init
```

---

<details>
  <summary>
  Q. What did npm do just now? (ST-WG)
  </summary>

  > `npm` stands for node package manager. NPM installs and manages dependencies (called Modules in JavaScript) for our nodeJS application. Modules are analogous to Gems and NPM is similar to bundler.

  `$ npm init` will initialize a new NodeJS application. Upon initialization it
  will prompt you for some user input to update the package.json. Using the `-y` argument allows you to use the defaults and not prompt for any options.
</details>



```bash
$ cat package.json
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

> the `--save` flag updates the package.json to include the
dependency you just installed. We could manually edit the `package.json` file but conventionally we use the CLI tool.

We can see in `package.json` that the default main file for a node app is "index.js". We could change this, but we'll use the default for now.

Let's make a new file `$ touch index.js` and place the following contents. In
`index.js`:

```js
const express = require("express");
const app = express();

app.listen(4000, () => {
  console.log("app listening on port 4000");
});
```

We've required the Express module which is a function that returns an instance of a web app.
We invoke the module instantiating a constant `app` which holds all the methods and state we use to write and run our web app.
The listen method starts the app and specifies the port where the app will listen for requests.

> How is this similar to Sinatara? How is it different?

When we run the application(`$ node index.js`) we can see in the terminal `app listening on port 4000` The process continues to run occupying the shell process until we hit `ctrl + c` just like pervious servers we have run. Let's try going to the local host of that port number. In the browser enter
`http://localhost:4000`.

In the browser we'll see something like :

```
Cannot GET /
```

What does this mean?
What does the equivalent error look like in Sinatra?
How about Rails?

We've told the server what port to listen on, but we didn't specify any route handlers.
The absence of a `get` handler for the `"/"` route is our problem here.
Let's update `index.js`:

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```
We'll dive into the route handling methods momentarily.

We refresh and...

```
Cannot GET /
```

No change.
We added a route and handled it by sending the string `"hello world"` as the response.
The running server however has not been changed until we restart the server (also remeniscent of Sinatra) and refresh the page in the browser. And we see:

`Hello World`

Constantly needing to restart the server will get very tedious.

Q. What was the fix for that in Sinatra?
---

> sinatra/reloader from the sinatra-contrib repo would restart the server any time that files changed

The node module `nodemon` (a portmanteau of "node monitor") performs a similar task to `sinatra/reloader` but goes about it slightly differently.
Instead of requiring `nodemon` in our code, we use `nodemon` from the command line (demonstrated after install).

In the terminal:

```bash
$ npm install --global nodemon
```

> When using the `--global` flag (-g for short), we're specifying that nodemon
will be installed "globally" (not per project) so we can utilize nodemon across
all of our node applications (and also that it is not included in our project dependencies).

Then we start up our application a bit differently now. In the terminal:

```bash
$ nodemon index.js
```

## Params in URL in Express (5/50)

Let's take a second to compare this `GET '/'` handler in express to [how we would write a handler in Sinatra](https://github.com/ga-wdi-exercises/emergency_compliment/blob/solution/server.rb#L14-L19).

Remember parameters in our ruby frameworks? It's very similar in JS.
Let's update `index.js` to include:

```js
app.get("/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});
```

## Break(10/60)

## You do: 99 Bottle of Beer(20/80)
The readme can be found [here](https://github.com/ga-wdi-exercises/99_bottles_express)

## Views (20/100)

Let's leverage our [solution to 99 Bottles of
Beer](https://github.com/ga-dc/99_bottles_express/tree/solution) to learn about views.

Handlebars is a JavaScript module for templeting.
Handlebars templates are very simlar to the erb templates we used in Sinatra and Rails letting us write code to augment our HTML.

Install Handlebars (`hbs`) as a project dependency:

```bash
$ npm install --save hbs
```

In `index.js`, [configure our express app](https://expressjs.com/en/guide/using-template-engines.html) to use Handlebars as its 'view engine' (there are [many other templating engines](https://github.com/expressjs/express/wiki#template-engines)):

```js
app.set("view engine", "hbs");
```

Let's go ahead and create a directory and some views. In the root directory of
the Express 99 bottles application. In the terminal:

```bash
$ mkdir views
$ touch views/index.hbs
$ touch views/layout.hbs
```

Let's change up our existing `index.js` to utilize a template rather than
sending in a string directly.

In `index.js`:

```js
/* instead of
app.get("/:numberOfBottles?", ( req, res ) => {
  let numberOfBottles = req.params.numberOfBottles || 99
  let next = numberOfBottles - 1
  if (numberOfBottles > 1){
    res.send(numberOfBottles + " bottles of beer on the wall <a href='/" + next + "'>Take one down pass it around")
  } else {
    res.send("1 bottle of beer on the wall <a href='/'>Start Over</a>")
  }
}) */

// we want this
app.get("/:numberOfBottles?", ( req, res ) => {
  let bottles = req.params.numberOfBottles || 99;
  let next = bottles - 1;
  res.render("index", {bottles, next});
})
```

Instead of directly building a string as the response of that get request, we instead want to render a view using Handlebars.
The `.render` function takes two arguments:
  - the first is the name of the view we want to render (since we've set the templating engine, we don't need to include the file extension).
  - the second argumentnis an object with values that will be made available in the view.

The only problem is our view is empty! Let's go ahead and change that now. In
`views/layouts.hbs`:

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

Note the "triple-stash". This is necessary if what will be rendered in the the brances will include html which should not be escaped.

This is also a great time to note how we serve static assets. Notice we linked a
stylesheet in our layout file.

In our `index.js`, let's also add:
 `app.use(express.static(__dirname + '/public'))`

This allows us to utilize files in that folder in the layout.

Notice the `{{{body}}}` syntax. This is because Handlebars by default escapes
HTML and you need the additional set of brackets to indicate that you want to
render the tags in the body as HTML.

Finally we should update our index view to reflect the same strings we had
before. In `views/index.hbs`:

```html
{{bottles}} bottles of beer on the wall.
{{#if next}}
  <a href='/{{next}}'>Take One Down, Pass it Around</a>
{{else}}
  <a href='/'>Start Over</a>
{{/if}}
```

> The syntax your seeing for the conditional statement is a [built-in helper from Handlebars](http://handlebarsjs.com/block_helpers.html).

## module.exports (20/120)

A major distinction between JavaScript run in the browser and JavaScript run on the server is how it the code loaded into the environment.

<details>
<summary>How do we load a script in the browser</summary>

> We use a script tag (`<script src="/path/to/script"></script>`) in our HTML to tell the client browser to request, to load, and run a script

</details>


<details>
<summary>Why is this not an option in a server side environment?</summary>

> On the server, there is no HTML document

</details>

<details>
<summary>What does it mean to 'polute the global namespace' and how have we seen this problem in the browser?</summary>

> 'Poluting the global namespace' means declaring variables in globla scope.
This is undesirable because the larger an app is and the more global scope is used, the more likely we are to have a collision where some part of the app uses a global variable for one purpose and different part of the app uses a global variable with the same name for another.

> In the browser, the _only_ way for different scripts to interact with one another is the global namespace.

> AngularJS kept track of modules internally and we wrapped all of our code in IIFEs so that the extend of polution of the global namespace was just the `angular` object.

</details>

We have already seen the `require` method used to load JavaScript files and modules. The `require` method returns a value which can be set to a variable and does not need to be grabbed out of global scope.

Node is doing something similar to AngularJS in managing dependencies for us to keeps things organized.
The other end of the `require` method, is the `module.exports` object.
By assigning particular values to `module.exports`, we can explicitly define the object that will be brought in when another file `requires()` the file from which we are exporting.

For example:
```js
// calculator.js
module.exports = {
  add(a,b){
    return a + b
  }
}
```
To use `require(...)` to import a local file rather than a node module (like `require('express')`), the string `require` is called with needs to be a path.

Since the argument to require needs to be recognizable as a path, the path to a file in the same directory needs to be prefaced with a `./`.

```js
// in index.js
// instantiate global variable to grant access to module we've created
const calculator = require("./calculator.js");

// use variable to call the .add() function defined in calculator.js
calculator.add(3,4)
```

A practical example would be to import our route handlers from a seperate file:

```js
const bottles = require("./controllers/bottles.js");
app.get("/:numberOfBottles?", bottles.index );
```

We could create a routes module that defines our index route. Let's create a `controllers/bottles.js` file with the following contents:

```js
module.exports = {
  index( req, res ){
    let bottles = req.params.numberOfBottles || 99;
    let next = bottles - 1;
    res.render('index',{
      bottles,
      next
    });
  }
};
```

> We see the exact same behavior; just moved some logic into a different file.
What advantages does that bring to us with regard to separation of concerns in MVC? (st-wg)

If we had the 7 RESTful routes that Rails provides for each model, you can start to see how keeping everything in the `index.js` can begin to become unwieldy.

## Break (10/130)

## HTML Forms: Bodyparser & Post requests (20/150)

Let's personalize our 99 bottles app.  We'll make a welcome page with a form asking for user's name.

We need a route and a view (with a form)


```js
app.get("/", (req, res) => {
  res.render("welcome");
});
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

Submit a name:

```
Cannot POST /
```

### Q. How can we fix this?

> In `index.js`...

```js
app.post("/", (req, res) => {
  res.send("Hello there!")
})
```

Well it works, but it's not super valuable, we're not even getting our
parameter.
Let's greet the name submitted in the form:

```js
app.post("/", (req, res) => {
  res.send("Hello " + req.params.player_name)
})
```

hello undefined... oh man.. and just to be sure let's `console.log(req.params)`.
It's an empty object!

Our html form information is not in `req.params`. Express is not handling information posted from an html form.  We need to install middleware in order to get form data and JSON data in a POST request for Express applications. Rails and Sinatra already include the middleware to handle this (RACK). By default Express does not, so we need to install it manually.

Middleware is code that runs in between receiving the request and responding. Body-parser used to be included to Express, but they took it out.

Another very commonly used middleware is the [`cors` module](https://github.com/expressjs/cors).
Like `body-parser`, `cors` is also maintained by the express team.

Express prides itself in its minimalism.
There are many [frameworks built on express](https://expressjs.com/en/resources/frameworks.html) that are opinionated and do a lot more out of the box.
Express tries to stay flexible though.

In the terminal:

```bash
$ npm install --save body-parser
```

In `index.js`:

```js
// configure app to use body parser
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //handles json post requests
app.use(bodyParser.urlencoded({ extended: true })); // handles form submissions
```

NB: only the urlencoded bodyparser middleware is necessary to get this form working.
The json bodyparser is necessary if we want to handle AJAX requests with JSON bodies.

Another thing to note is that, in Express, `req.params` holds just path params.
Anything handled by the bodyParser (json or form bodies) will be held in `req.body`.
If you want to get at values in a query string (ie url after a `?`), these values will be held in `req.query`

So we change the final post request in index.js to:

```js
app.post("/", (req, res) => {
  res.send(`hello ${req.body.player_name}`)
})
```

And finally, we'll integrate it the name into our index template:

Update index.js:

```js
app.post("/", (req, res) => {
  res.render("index", {
    player_name: req.body.player_name,
    bottles: 99,
    next: 98
  });
});
```

And to our view:
```html
{{#if player_name}}
  Hey {{player_name}}, there are
{{/if}}
```

:tada:

## You do - Ultimate Compliment (Homework)

* [Ultimate Compliment](https://github.com/ga-dc/compliment-express)
  * You might want to look at the [Sinatra Version Solution](https://github.com/ga-dc/emergency_compliment/tree/solution)

## Sample Quiz Questions
- What is `npm`?

- Write a get request using any path as you would in an Express application.

- How does `module.exports` help us with separation of concerns?
