# NPM Monorepo with Workspaces

This is a basic npm monorepo with workspaces

## How it was made

```cli
npm install -g esbuild
npm install turbo --global
esbuild --version
mkdir npm-repo
cd npm-repo
git init
git branch -M main
npm init -y
npm install -D typescript eslint prettier esbuild
tsc --init
mkdir apps
mkdir packages
npm install -D @types/node @types/jest jest
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-prettier
npm install dayjs lodash
npm install -D @types/lodash ts-jest ts-node'
```

Edit package.json

- Remove "main"
- Add "private": true (This is a requirement for workspaces to prevent entire repo from accidentally being published to the registry, only affects the root of the repo)
- Add "workspaces": [ "./apps/*", "./packages/*" ]

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
npm run build -ws
npm run test -ws
```

## Run command for a specific workspace

```cli
npm run build -w module-a
npm run start -w module-a
```

## Localstack

### Setup awslocal

Set the following in your bash or zsh profile

```bash
alias awslocal="AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=${DEFAULT_REGION:-$AWS_DEFAULT_REGION} aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566"
```

```cli
docker-compose up -d
aws --endpoint-url=http://localhost:4566 sts get-caller-identity
# or if you set the above alias
awslocal sts get-caller-identity
```

## AWS CDK

### Install CDK

```cli
npm install -g aws-cdk
cdk --version
```

### Bootstrap for LocalStack development

```cli
npm install -g aws-cdk-local
cdklocal --version
awslocal sts get-caller-identity
cdklocal bootstrap aws://000000000000/us-east-1
```

Check if stack has valid configuration

```cli
cdk synth
```

Check the differences between what you have specified and what is deployed

```cli
cdk diff
```

Deploying with LocalStack

```cli
cdklocal deploy STACK_NAME
or
cdklocal deploy --all --require-approval=never
or
cdklocal deploy --parameters Duration=1
```

Remove stack

```cli
cdklocal destroy name_of_stack
```

### Bootstrap for other accounts/region (Once for each)

```cli
aws sts get-caller-identity
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

## Create a new application

```cli
cd apps
mkdir new-app
cd new-app
cdk init --language=typescript
```
