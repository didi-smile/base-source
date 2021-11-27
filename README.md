# VNLP source base
![VNLP](https://img.shields.io/badge/VNLP%20Tech-vnlp.ai-brightgreen)

Base source for VNLP projects


## Guide
1. **Respond with error**
    - Using `throw` with `VError` to response with error

2. **Logger**
    - Using VLogger to log in source code
    - Log rules:
        - `logger.info`: when you need to store an information of an action
        - `logger.error`: when you need to log an error
        - `logger.warn`: when you need to log warning, it doesn't affect current flow but can affect system in the future
        - `logger.debug`: when you need to log something make you debug easier
    - Change log level according to *deploy environment*

3. **Coding convention**
    - Reference: https://github.com/airbnb/javascript
    - All third-party lib must be imported on top of file

4. **Dependencies**
    - Must not import sibling file directly. For example:
        - Service cannot import another service directly, must add it as a dependencies and pass to `service factory` instead.
    - Must not import code of upper layer. For example:
        - Service can import common functions, helpers functions, but not vice versa.

5. **Define JSDoc**
    - Use `/**` to quickly create jsdoc
    - Reference: https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support

6. **Recommend VSCode extensions**
    - GitLens
    - Code Spell Checker
    - Javascript(ES6) Code Snippets
    - Todo Tree

## Step by step to create a new module
1. **Create new module directory in `/modules`**

2. **Define new route**
    - Create new api route in `api.js`
    - Attach middlewares: `verify token`, `validate request data`, ...
    - Import controller

3. **Define middleware, validation**
    - Create new validation to validate input data of this api
    - Using `Joi` schema to validate data, you can find guide [here](https://joi.dev/api/?v=17.4.2)
    - Using `validate` built-in function of `express-validation` to attach to API like a middleware

4. **Define new controller**
    - Import services and dependencies
    - Create service with `serviceFactory`
    - Extract data input from request
    - Respond using `res.success`
    - Wrapper method of controller with `tryCatchWrapper` in `constructor`

5. **Define new service**
    - Create a service inside directory `/modules/.../services`
    - In service file, create a class `Service` with input are list of `dependencies` and return a function
    - Write **business logic** in service function

6. **Define new model**
    - To mapping Data with DB, you should create a model according to a collection in MongoDB
    - Define options with `collection`, schema of model in `/modules/.../model.js`

7. **Define new repository**
    - To interact with DB, you should create a repository
    - A new repository will extends from a `BaseRepository`
    - If you want to create some custom action to DB, you can create method in repository file.


## Integration
- Logger (Pino with ELK stack)
- Tracing (Jaeger)
- Message Queue (bull, RabbitMQ or Kafka)


## Run
- Run `npm install` to install packages
- Run `npm start` to start server
- Run `npm run test` to run tests
- Run `npm run dev` to start server with DEBUG level


## TODO
- Add pre-commit, lint to clean code
- Add redis connection
- Add log to monitor slow query DB
- Create websocket components
- Create Dockerfile
- Create documentation with Swagger
- Create metrics with Prometheus
- Create cli command to generate module in one command


## Contribute
- VNLP team members can create PR to this repo to contribute to this source
- If you have a problem with this source, you can add an issue and tag `@duysmile` or email me `duy210697@gmail.com`
