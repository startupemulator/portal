# StartupEmulator Portal [![StartupEmulator  CI](https://github.com/startupemulator/portal/actions/workflows/pipeline.yml/badge.svg)](https://github.com/startupemulator/portal/actions/workflows/pipeline.yml)

## Commit changes to repository

> Warning: please use following command for commit data to the repo

```bash
$ npm run commit
```

or

```bash
$ git cz
```

In case of wrong commit message `commitlint` tool will throw error

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Storybook

```
npm run storybook
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Docker build

```bash
docker build -t startupemulator_portal .
```

## Docker run

```bash
docker run -it -p 3000:3000 startupemulator_portal
```
