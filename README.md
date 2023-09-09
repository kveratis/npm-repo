# NPM Monorepo with Workspaces

This is a basic npm monorepo with workspaces

## How it was made

```cli
mkdir npm-repo
cd npm-repo
git init
npm init -y
npm install -D typescript eslint prettier
mkdir apps
mkdir packages
```

Edit package.json

- Remove "main"
- Add "private": true (This is a requirement for workspaces to prevent entire repo from accidentally being published to the registry, only affects the root of the repo)
- Add "workspaces": [
  "./apps/*",
  "./packages/*"
  ]

```cli
npm install
```

## Configure VSCode Worspace

- File > Preferences > Settings
- Workspace settings
  - Editor Tab Size: 2
- Recommended Extensions
  - esbenp.prettier-vscode
  - dbaeumer.vscode-eslint

## Adding a new workspace

```cli
npm init -w ./apps/new_app_name

npm init -w ./packages/new_package_name
```

## Run same script across all workspaces

```cli
npm run test -ws
```

## Run command for a specific workspace

```cli
npm run build -w module-a
```
