# Topics to discuss

## Session 1: JWT and proxy server
- [x] IDE configuration
- [x] JWT token structure
- [x] Proxy implementation / current project
  - [x] `authorization` header
  - [x] `WWW-Authenticate: Bearer` and 401
- [x] JWT generation https://www.npmjs.com/package/jsonwebtoken
- [x] dotenv with `loadEnvFile` https://nodejs.org/api/process.html#processloadenvfilepath
- [x] authentification

## Session 2: Unit testing

### Topics

- [x] Jest configuration
- [x] Babel, why?
- [x] Basic test structure, AAA pattern and nesting in Jest
- [x] First tests

### Install Jest

See https://jestjs.io/docs/getting-started

- `npm install --save-dev jest`
- extend `package.json` with `test` command
- `npm install --save-dev @babel/core @babel/preset-env babel-jest`
- create `babel.config.cjs` file
```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};
```
## Session #3: Patterns

- [ ] IoC container
- [ ] singleton
- [ ] decorator
  - [ ] logging token creation
- [ ] facade
  - [ ] facade for response
- [ ] observer
  - [ ] logging requests
- [ ] command
  - [ ] artificial example
- [ ] state
  - [ ] artificial example
