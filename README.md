<div align="center">
  <a href="https://slug.vercel.app">
    <img
      src="public/images/logo_svg.svg"
      alt="Slug Logo"
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
![Turso Badge](https://img.shields.io/badge/Turso-4FF8D2?logo=turso&logoColor=000&style=flat)
![GitHub stars](https://img.shields.io/github/stars/pheralb/slug)
![GitHub releases](https://img.shields.io/github/release/pheralb/slug)
![GitHub issues](https://img.shields.io/github/issues/pheralb/slug)
![GitHub license](https://img.shields.io/github/license/pheralb/slug)

</div>

## 👋 Introduction

[Slug](slug.vercel.app) is a service that offers to shorten urls in a simple, fast and secure way. It's built with [**T3 Stack**](https://create.t3.gg/), a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack **typesafety**. 

This project uses the following technologies:

- 🧑‍🚀 **Bootstrapping**: [create-t3-app](https://create.t3.gg).
- ✨ **Framework**: [Next.js 14 /app Router](https://nextjs.org/).
- 🔒 **Auth**: [Auth.js v5](https://authjs.dev/).
- 🏗️ **ORM**: [Prisma](https://prisma.io).
- ☁️ **Database**: [Turso](https://turso.tech/) (SQLite) + [libSQL](https://github.com/tursodatabase/libsql).
- 🎨 **Styling**: [TailwindCSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) & [Radix Primitives](https://www.radix-ui.com).
- 💅 **Formatting**: [Prettier](https://prettier.io) with [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) + [ESLint](https://eslint.org).
- 🙂 **Icons**: [Lucide Icons](https://lucide.dev) + [svgl](https://svgl.app).

> ⚠️ This is a community project, not associated with [Vercel](https://vercel.com/).

## 🔭 Roadmap

⬆️ **Dependencies:**

- [x] Update `@prisma/adapter-libsql`, `@prisma/client` & `prisma` to the stable version when it's released.
- [ ] Update `next-auth` to the stable version (v5) when it's released.

⬆️ **Auth:**

- [x] Sign In with Github.
- [ ] Sign In with Google.

⬆️ **Middleware:**

- [x] Redirect with `/*` and `/s/*`.
- [x] Separate public, protected & authentication routes.

⬆️ **Dashboard (main):**

- [x] Create a new short URL.
- [x] List all shorted URLs.
- [x] Delete a shorted URL.
- [x] Update a shorted URL.

⬆️ **Dashboard (settings):**

- [ ] Change password.
- [ ] Change email.
- [ ] Activate/remove 2FA.
- [ ] Delete account.

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
