# urll

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## ⚒ With T3 Stack

The "T3 Stack" is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack typesafety. This project is using:

- ✅ [Nextjs + Typescript](https://nextjs.org/).
- ✅ [Next-Auth.js](https://next-auth.js.org)
- ✅ [Prisma](https://prisma.io).
- ✅ [Planetscale](https://planetscale.com/).
- ✅ [TailwindCSS](https://tailwindcss.com).
- ✅ [Zod](https://github.com/colinhacks/zod).

> 📦 [Getting Started with create-t3-app](https://github.com/t3-oss/create-t3-app#getting-started).

## 👨‍🚀 Getting Started

> You will need [Nodejs +16 (LTS recommended)](https://nodejs.org/en/) installed.

1. Fork this project:

- [Click here](https://github.com/pheralb/urll/fork).

2. Clone the repository:

```bash
git clone git@github.com:YOU_USER/urll.git
```

3. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

4. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following [schema](https://github.com/pheralb/urll/blob/main/src/env/schema.mjs#L8).

```bash
# Planetscale DB URL:
DATABASE_URL:

# Github OAuth secrets:
GITHUB_ID:
GITHUB_CLIENT_SECRET:

# Next Auth config:
NEXTAUTH_SECRET:
NEXTAUTH_URL:
```

### How to get environment variables:

**Planetscale database:**
- [Create a new database](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#getting-started-planet-scale-dashboard).
- [Create a dev branch](https://planetscale.com/docs/onboarding/branching-and-deploy-requests#create-a-dev-branch).
- [In the dev branch, click on "Connect" and select "Prisma". Now you have the DATABASE_URL](https://planetscale.com/docs/concepts/connection-strings#creating-a-password).

> 🚧 The environment variable in the dev branch is not the same as main. When you deploy your app to production, in the environment variables change DATABASE_URL to the main variable.

**Github OAuth:**
- [Click here to create new Github OAuth app](https://github.com/settings/applications/new).
- Go to "Client secrets" and generate new client secret and and paste it into GITHUB_CLIENT_SECRET env.
- Copy the Client ID and paste it into GITHUB_ID env.

**Next Auth:**
- NEXTAUTH_SECRET: ``mykey123`` for example.
- NEXTAUTH_URL: ``http://localhost:3000/``.

5. Ready 🥳, now run:

```bash
# Push your DB to Planetscale:
npx prisma db push

# Run the project:
npm run dev
```

## 🚀 Deploy on Vercel

- ✅ [https://urll.vercel.app/](https://urll.vercel.app/).