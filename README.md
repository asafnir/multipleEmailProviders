# multipleEmailProviders
service that provides an abstraction between two different email service providers.

## language microframework and lib
NodeJs + Express for back end
React + Ant.d 
Express-validator

## Configuration
You will need to add the API KEYS of the email service providers
- Update the PUBLIC_KEY and SECRET_KEY that you generate within the file `.env`
_[.env](.env)_

We use TypeScript and ES6 you will maybe need to set "module": "commonjs" in _[./tsconfig](./tsconfig)_

## Steps to build it

Clone the repo and build it. You'll need [Node](http://nodejs.org/download/) 

```
git clone https://github.com/asafnir/3simultaneous.git
cd multipleEmailProviders/
yarn
yarn run start-both
``` 
