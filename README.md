<h1 align="center">
  <img alt="cgapp logo" src="./README_logo.svg" width="224px"/><br/>
</h1>
<p align="center">
    Official <a href="https://www.algolia.com/doc-beta" target="_blank">Algolia documentation website</a>
</p>

<p align="center">
    <a href="https://nextjs.org/docs"
target="_blank">
        <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js badge" />
    </a>&nbsp;
    <a href="https://react.dev/" target="_blank">
        <img src="https://img.shields.io/badge/react-0B1535?style=for-the-badge&logo=react" alt="ReactJS badge" />
    </a>&nbsp;
    <a href="https://www.typescriptlang.org/docs/" target="_blank">
        <img src="https://img.shields.io/badge/typescript-0E2058?style=for-the-badge&logo=typescript" alt="TypeScript badge" />
    </a>&nbsp;
    <a href="https://tailwindcss.com/docs/" target="_blank">
        <img src="https://img.shields.io/badge/tailwindcss-36395A?style=for-the-badge&logo=tailwindcss" alt="Tailwindcss badge" />
    </a>
</p>

## ⚡️ Get started

First, you'll need [Node](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) to run the project locally.

Install dependencies with:

```sh
pnpm i
```

Run the development server:

```sh
pnpm dev
```

You should be able to see the docs running at <http://localhost:3000>.

## 💻 Contribute

### Guidelines

If you want to contribute to the docs platform, see the [development guide](https://algolia.atlassian.net/wiki/spaces/DOC/pages/4494721104/Development+guidelines).

### Tech stack

> This project is using **[pnpm](https://pnpm.io/)** to manage packages.

#### Front end

- **[NextJS](https://nextjs.org/)** as website builder
- **[React](https://react.dev/)** as main front end framework for our components
- **[tailwindcss](https://tailwindcss.com/)** as css framework

#### Testing

- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** as integration tester
- **[Vitest](https://vitest.dev/)** as test runner
- **[Playwright](https://playwright.dev/)** as E2E tester

#### CI/CD

- **[GitHub Actions](https://github.com/features/actions)** for CI
- **[Vercel](https://www.vercel.com/)** for CD

## 🚒 Assistance

Feel free to join our Slack channel [#proj-odyssey-updates](https://algolia.slack.com/archives/C050M1RL4UR) to ask for help, report a bug or anything related to the docs.

Looking for more information? Visit [the project wiki](https://algolia.atlassian.net/wiki/spaces/DOC/pages/4464935305/Docs+Migration+-+Project+Odyssey)!
