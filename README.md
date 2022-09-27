<img src="https://i.ibb.co/nRDsr1j/banner-gh-readme.jpg" />
<div align="center">

![GitHub stars](https://img.shields.io/github/stars/pheralb/slug)
![GitHub issues](https://img.shields.io/github/issues/pheralb/slug)
![GitHub license](https://img.shields.io/github/license/pheralb/slug)
[![Required Node.JS >=16.0.0](https://img.shields.io/static/v1?label=node&message=%20%3E=16.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

</div>

## ⚒ With T3 Stack

The [**T3 Stack**](https://create.t3.gg/) is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack typesafety. This project is using:

- ✅ **Bootstrapping**: [create-t3-app](https://create.t3.gg).
- ✅ **Framework**: [Nextjs + Typescript](https://nextjs.org/).
- ✅ **Auth**: [Next-Auth.js](https://next-auth.js.org)
- ✅ **ORM**: [Prisma](https://prisma.io).
- ✅ **Database**: [Planetscale](https://planetscale.com/).
- ✅ **Styling**: [TailwindCSS + HeadlessUI](https://tailwindcss.com).
- ✅ **Typescript Schema Validation**: [Zod](https://github.com/colinhacks/zod).
- ✅ **End-to-end typesafe API**: [tRPC](https://trpc.io/).
- ✅ **Safely serialize JavaScript expressions**: [Superjson](https://github.com/blitz-js/superjson).

## 👨‍🚀 Getting Started

> 🚧 You will need [Nodejs +16 (LTS recommended)](https://nodejs.org/en/) installed.

1. Fork this project:

- [Click here](https://github.com/pheralb/slug/fork).

2. Clone the repository:

```bash
git clone git@github.com:YOU_USER/slug.git
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

> 🚧 The environment variables must match the following [schema](https://github.com/pheralb/slug/blob/main/src/env/schema.mjs#L8).

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

### 🔑 How to get environment variables:

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

## 🎉 Deploy on Vercel

- ✅ [https://slug.vercel.app/](https://slug.vercel.app/).
