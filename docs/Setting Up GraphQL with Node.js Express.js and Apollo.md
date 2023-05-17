Setting Up GraphQL with Node.js, Express.js, and Apollo

# Setting up a monorepo project

```sh
npm install --global lerna
```

```sh
mkdir ngsocial
cd ngsocial
lerna init
```

# Generating a package.json file

```sh
cd packages
mkdir server && cd server
pnpm init
```

# Installing Express.js and development dependencies

```sh
pnpm add express
```

ts-node, a tool that enables you to start a development server based on TypeScript
directly from the Terminal without compiling it to plain JavaScript

```sh
pnpm add --save-dev typescript ts-node
.\node_modules\.bin\tsc -v
.\node_modules\.bin\tsc --init
```

Next, we need to install the type definitions for Node and Express.js using the following
command:

```sh
pnpm add –save-dev @types/node @types/express
```

commit the change
```sh
git add -A
git commit -m "Installing Express and development dependencies"
