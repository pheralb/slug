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
![Check workflow](https://github.com/pheralb/slug/actions/workflows/ci.yml/badge.svg)
![GitHub stars](https://img.shields.io/github/stars/pheralb/slug)
![GitHub releases](https://img.shields.io/github/release/pheralb/slug)
![GitHub issues](https://img.shields.io/github/issues/pheralb/slug)
![GitHub license](https://img.shields.io/github/license/pheralb/slug)

</div>

## 👋 Introduction

[**Slug**](slug.vercel.app) is a service that offers to shorten urls in a simple, fast and secure way. It's built with [**T3 Stack**](https://create.t3.gg/), a web development stack made by [**Theo**](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack **typesafety**.

This project uses the following technologies:

- [**create-t3-app**](https://create.t3.gg) - The best way to start a full-stack, typesafe Next.js app.
- [**Next.js 14 App Router**](https://nextjs.org/) - The React Framework for the Web.
- [**Auth.js v5**](https://authjs.dev/) - Authentication for the Web.
- [**Prisma**](https://prisma.io) - A next-generation Node.js and TypeScript ORM.
- [**Turso**](https://turso.tech/) (SQLite) + [**libSQL**](https://github.com/tursodatabase/libsql) - SQLite for Production.
- [**Next.js Server Actions**](https://nextjs.org/docs/api-reference/server-actions) - Asynchronous functions that are executed on the server.
- [**TailwindCSS**](https://tailwindcss.com) + [**shadcn/ui**](https://ui.shadcn.com) & [**Radix Primitives**](https://www.radix-ui.com) - Design System.
- [**Prettier**](https://prettier.io) with [**prettier-plugin-tailwindcss**](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - Code Formatter.
- [**@next/mdx**](https://nextjs.org/docs/app/building-your-application/configuring/mdx) + [**bright**](https://bright.codehike.org/) - Documentation with MDX & Code Highlighting.
- [**Lucide Icons**](https://lucide.dev) + [**svgl**](https://svgl.app) - Beautiful SVG icons & logos for the web.

> ⚠️ This is a community project, not associated with [Vercel](https://vercel.com/).

## 🔭 Roadmap

This is the roadmap I will be following for the complete migration to v3:

⬆️ **Known issues:**

- [ ] Fix issue when logging in with different provider but with the same email. Redirect to an existing route in the app ([authjs error](https://authjs.dev/reference/core/errors#accountnotlinked)).

⬆️ **Dependencies:**

- [x] Update `@prisma/adapter-libsql`, `@prisma/client` & `prisma` to the stable version when it's released.
- [ ] Update `next-auth` to the stable version (v5) when it's released.

⬆️ **Auth:**

- [x] Sign In with Github.
- [x] Sign In with Google.

⬆️ **Middleware:**

- [x] Redirect with `/*` and `/s/*`.
- [x] Separate public, protected & authentication routes.

⬆️ **Dashboard (main):**

- [x] Create a new short URL.
- [x] List all shorted URLs.
- [x] Delete a shorted URL.
- [x] Update a shorted URL.

⬆️ **Dashboard (settings):**

- [x] Change name.
- [x] Change email.
- [x] Delete account.
- [ ] Download all links data.

## 👨‍🚀 Getting Started

> 🚧 You will need [Nodejs +20 (LTS recommended)](https://nodejs.org/en/) installed.

1. Fork this project:

- [Click here](https://github.com/pheralb/slug/fork).

2. Clone the repository:

```bash
git clone git@github.com:YOU_USER/slug.git
```

3. Install dependencies:

```bash
# Install pnpm globally if you don't have it:
npm install -g pnpm

# and install dependencies:
pnpm install
```

4. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following [schema](https://github.com/pheralb/slug/blob/main/src/env/schema.mjs#L8).

```bash
# Database:
DATABASE_URL= # "file:./dev.db"
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

# Auth.js =>
AUTH_SECRET=
AUTH_URL=

# Github Provider =>
GITHUB_ID=
GITHUB_CLIENT_SECRET=

# Google Provider =>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- 📚 You can read the complete documentation [here](https://slug.vercel.app/docs).

## ✌️ Contributing

<a href="https://github.com/pheralb/slug/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pheralb/slug" />
</a>

<p></p>

## 🚀 Deploy on Vercel

- ✅ [slug.vercel.app](https://slug.vercel.app/).

## 🔑 License

- [MIT](https://github.com/pheralb/slug/blob/main/LICENSE).
