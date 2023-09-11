
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

# Client-side routing issue


## Background

After August 25th 2023, we noticed that client-side navigation no longer worked on all Vercel preview and production builds that happened after that date. To make things stranger, there were no code changes committed directly related to it after that point. 

Several attempts were made to debug and resolve the issue. Currently, the fix appears to be to update our `page.tsx` to use `force-dynamic` instead of `force-static`. What's concerning is that:
- We don't know why this seemed to happen out of the blue.
- Running this build as `output: standalone` and running on another service (i.e. Replit) demonstrates that client-side routing works as expected with `force-static` still in place.

This repository is reduced version of the actual private repo -- it just contains about 100 pages (rendered via MDX & Contentlayer). It uses AppRouter.

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

Add the following to your `.env.local` file inside `apps/docs`:
```sh
AUTH_MOCKING="enabled"
NEXT_PUBLIC_BASE_PATH="/doc-beta"
```

You should be able to see the docs running at <http://localhost:3000>.

## Testing with `force-static`

| Method                                      | Client-side navigation works? |
| ------------------------------------------- | ----------------------------- |
| pnpm dev (local)                                    | ✅                             |
| pnpm build && pnpm start (local)                   | ✅                             |
| `output: standalone` , run on Replit        | ✅                             |
| Deploy to Vercel Preview/Production via CLI |  ❌                            |

## Testing with `force-dynamic`

| Method                                      | Client-side navigation works? |
| ------------------------------------------- | ----------------------------- |
| pnpm dev (local)                                    | ✅                             |
| pnpm build && pnpm start (local)                   | ✅                             |
| `output: standalone` , run on Replit        | ✅                             |
| Deploy to Vercel Preview/Production via CLI |  ✅                            |


## Output of pnpm build (local) - `force-static`

```sh
docs:build: Route (app)                                Size     First Load JS
docs:build: ┌ ○ /                                      197 B          89.5 kB
docs:build: ├ ○ /_not-found                            0 B                0 B
docs:build: ├ ● /[...slug]                             2.31 kB         319 kB
docs:build: ├   ├ /pages%2Fonboarding
docs:build: ├   ├ /pages%2Ftest_content%2Fcomponents
docs:build: ├   ├ /pages%2Ftest_content%2Fcontent
docs:build: ├   └ [+81 more paths]
docs:build: ├ ○ /api-reference                         175 B          84.5 kB
docs:build: ├ ○ /api-reference/[slug]                  268 B           317 kB
docs:build: ├ ℇ /api-reference/opengraph-image         0 B                0 B
docs:build: ├ ℇ /api-reference/twitter-image           0 B                0 B
docs:build: ├ λ /api/auth                              0 B                0 B
docs:build: ├ λ /api/cookie                            0 B                0 B
docs:build: ├ λ /api/cookie-remove                     0 B                0 B
docs:build: ├ λ /api/feedback                          0 B                0 B
docs:build: ├ λ /api/telemetry                         0 B                0 B
docs:build: ├ ℇ /opengraph-image                       0 B                0 B
docs:build: ├ ℇ /opengraph/[...path]                   0 B                0 B
docs:build: ├ ○ /opengraph/titles.json                 0 B                0 B
docs:build: ├ ○ /redirects                             0 B                0 B
docs:build: ├ ○ /robots.txt                            0 B                0 B
docs:build: ├ ○ /sitemap.xml                           0 B                0 B
docs:build: └ ℇ /twitter-image                         0 B                0 B
docs:build: + First Load JS shared by all              78.5 kB
docs:build:   ├ chunks/149-16ea833412541c74.js         25.8 kB
docs:build:   ├ chunks/c35c518b-f07181ce4f3ec05a.js    50.5 kB
docs:build:   ├ chunks/main-app-5e00c1921476785b.js    215 B
docs:build:   └ chunks/webpack-8de289081b7ba91a.js     1.97 kB
docs:build: 
docs:build: Route (pages)                              Size     First Load JS
docs:build: ─ ○ /404                                   182 B            80 kB
docs:build: + First Load JS shared by all              79.9 kB
docs:build:   ├ chunks/framework-eb124dc7acb3bb04.js   45 kB
docs:build:   ├ chunks/main-da2bc8f892fc20d0.js        32.6 kB
docs:build:   ├ chunks/pages/_app-e32ef5888f7937da.js  195 B
docs:build:   └ chunks/webpack-8de289081b7ba91a.js     1.97 kB
docs:build: 
docs:build: ƒ Middleware                               47.3 kB
docs:build: 
docs:build: ℇ  (Streaming)  server-side renders with streaming (uses React 18 SSR streaming or Server Components)
docs:build: λ  (Server)     server-side renders at runtime (uses getInitialProps or getServerSideProps)
docs:build: ○  (Static)     automatically rendered as static HTML (uses no initial props)
docs:build: ●  (SSG)        automatically generated as static HTML + JSON (uses getStaticProps)
```

## Output of pnpm build (local) - `force-dynamic`

```sh
docs:build: Route (app)                                Size     First Load JS
docs:build: ┌ ○ /                                      197 B          89.5 kB
docs:build: ├ ○ /_not-found                            0 B                0 B
docs:build: ├ ● /[...slug]                             2.31 kB         319 kB
docs:build: ├   ├ /pages%2Fonboarding
docs:build: ├   ├ /pages%2Ftest_content%2Fcomponents
docs:build: ├   ├ /pages%2Ftest_content%2Fcontent
docs:build: ├   └ [+81 more paths]
docs:build: ├ ○ /api-reference                         175 B          84.5 kB
docs:build: ├ ○ /api-reference/[slug]                  268 B           317 kB
docs:build: ├ ℇ /api-reference/opengraph-image         0 B                0 B
docs:build: ├ ℇ /api-reference/twitter-image           0 B                0 B
docs:build: ├ λ /api/auth                              0 B                0 B
docs:build: ├ λ /api/cookie                            0 B                0 B
docs:build: ├ λ /api/cookie-remove                     0 B                0 B
docs:build: ├ λ /api/feedback                          0 B                0 B
docs:build: ├ λ /api/telemetry                         0 B                0 B
docs:build: ├ ℇ /opengraph-image                       0 B                0 B
docs:build: ├ ℇ /opengraph/[...path]                   0 B                0 B
docs:build: ├ ○ /opengraph/titles.json                 0 B                0 B
docs:build: ├ ○ /redirects                             0 B                0 B
docs:build: ├ ○ /robots.txt                            0 B                0 B
docs:build: ├ ○ /sitemap.xml                           0 B                0 B
docs:build: └ ℇ /twitter-image                         0 B                0 B
docs:build: + First Load JS shared by all              78.5 kB
docs:build:   ├ chunks/149-16ea833412541c74.js         25.8 kB
docs:build:   ├ chunks/c35c518b-f07181ce4f3ec05a.js    50.5 kB
docs:build:   ├ chunks/main-app-5e00c1921476785b.js    215 B
docs:build:   └ chunks/webpack-8de289081b7ba91a.js     1.97 kB
docs:build: 
docs:build: Route (pages)                              Size     First Load JS
docs:build: ─ ○ /404                                   182 B            80 kB
docs:build: + First Load JS shared by all              79.9 kB
docs:build:   ├ chunks/framework-eb124dc7acb3bb04.js   45 kB
docs:build:   ├ chunks/main-da2bc8f892fc20d0.js        32.6 kB
docs:build:   ├ chunks/pages/_app-e32ef5888f7937da.js  195 B
docs:build:   └ chunks/webpack-8de289081b7ba91a.js     1.97 kB
docs:build: 
docs:build: ƒ Middleware                               47.3 kB
docs:build: 
docs:build: ℇ  (Streaming)  server-side renders with streaming (uses React 18 SSR streaming or Server Components)
docs:build: λ  (Server)     server-side renders at runtime (uses getInitialProps or getServerSideProps)
docs:build: ○  (Static)     automatically rendered as static HTML (uses no initial props)
docs:build: ●  (SSG)        automatically generated as static HTML + JSON (uses getStaticProps)
```


