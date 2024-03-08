<div align="center">
  <a href="https://mintlify.com">
    <img
      src="public/images/logo_svg.svg"
      alt="Mintlify Logo"
      height="60"
    />
  </a>
  <p>
    <b>
      An open-source URL shortener built with T3 Stack.
    </b>
  </p>

<a href="https://slug.vercel.app/dashboard">Dashboard</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="https://slug.vercel.app/docs">Docs</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="#-roadmap">Roadmap</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="#-getting-started">Contribute</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="https://github.com/pheralb/slug/issues/new/choose">Create issue</a>
<span>&nbsp;&nbsp;❖&nbsp;&nbsp;</span>
<a href="https://twitter.com/pheralb_">X/Twitter</a>

![Next.js Badge](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat)
![GitHub stars](https://img.shields.io/github/stars/pheralb/slug)
![GitHub releases](https://img.shields.io/github/release/pheralb/slug)
![GitHub issues](https://img.shields.io/github/issues/pheralb/slug)
![GitHub license](https://img.shields.io/github/license/pheralb/slug)
![PlanetScale Badge](https://img.shields.io/badge/PlanetScale-000?logo=planetscale&logoColor=fff&style=flat)

</div>

## 🔭 Roadmap

⬆️ **Migrate to a new database:**

- [ ] Migrate all data to a new database.

⬆️ **Auth:**

- [x] Sign In with Github.
- [ ] Sign In with Google.
- [ ] Sign In with Email & Password.
- [ ] Reset password.

⬆️ **Middleware:**

- [x] Redirect with `/*` and `/s/*`.
- [x] Separate public, protected & authentication routes.

⬆️ **Dashboard (main):**

- [x] Create a new short URL.
- [x] List all shorted URLs.
- [ ] Delete a shorted URL.
- [ ] Update a shorted URL.

⬆️ **Dashboard (settings):**

- [ ] Change password.
- [ ] Change email.
- [ ] Activate/remove 2FA.
- [ ] Delete account.

## 🤔 What is T3 Stack?

The [**T3 Stack**](https://create.t3.gg/) is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack **typesafety**. This project is using:

- ✅ **Bootstrapping**: [create-t3-app](https://create.t3.gg).
- ✅ **Framework**: [Nextjs 13 + Typescript](https://nextjs.org/).
- ✅ **Auth**: [Next-Auth.js](https://next-auth.js.org)
- ✅ **ORM**: [Prisma](https://prisma.io).
- ✅ **Database**: [Planetscale](https://planetscale.com/).
- ✅ **Styling**: [TailwindCSS + HeadlessUI](https://tailwindcss.com).
- ✅ **Typescript Schema Validation**: [Zod](https://github.com/colinhacks/zod).
- ✅ **End-to-end typesafe API**: [tRPC](https://trpc.io/).
- ✅ **Safely serialize JavaScript expressions**: [Superjson](https://github.com/blitz-js/superjson).

## 📦 Project structure

```
- prisma
- public
- src
  |- components
  |- env
  |- layout
  |- motions
  |- pages
  |- schema
  |- server
  |- styles
  |- types
  |- ui
  |- utils
```

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
# or
ultra install
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

- NEXTAUTH_SECRET: `mykey123` for example.
- NEXTAUTH_URL: `http://localhost:3000/`.

5. Ready 🥳, now run:

```bash
# Push your DB to Planetscale:
npx prisma db push

# Run the project:
npm run dev

# (Optional) Run Prisma Studio to see your DB data:
npx prisma studio
```

😊 Contributing:

<a href="https://github.com/pheralb/slug/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pheralb/slug" />
</a>

<p></p>

## 🎉 Deploy on Vercel

- ✅ [https://slug.vercel.app/](https://slug.vercel.app/).

## 🔑 License

- [MIT](https://github.com/pheralb/slug/blob/main/LICENSE).
