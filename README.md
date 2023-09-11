
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

We noticed that client-side navigation no longer worked on all Vercel preview and production builds that occurred after August 25th 2023. Strangely, preview builds with no code changes since that date were exhibiting the issue. 

Several attempts were made to debug and resolve the issue. Currently, the fix appears to be to update our `page.tsx` to use `force-dynamic` instead of `force-static`. What's concerning is that:
- We don't know why `force-static` worked before that date.
- Running this build as `output: standalone` and running on another service (i.e. Replit) demonstrates that client-side routing works as expected with `force-static` still in place.

This repository is reduced version of the actual private repo -- it just contains about 100 pages (rendered via MDX & Contentlayer). It uses AppRouter.

* Last working build with `force-static`: https://new-world-docs-oudhfxkng-algolia.vercel.app/
* One of the next preview builds (still with `force-static`) resulting in no client-side navigation: 

## Get started

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

## How to test
1. Observe client-side navigation -- can check network tab to see if a full page load is performed on navigation.
2. Adjust `export const dynamic = "force-static"` in `apps/docs/app/[...slug]/page.tsx` to `force-dynamic`
3. Try builds on local, Vercel, and other services (e.g. Replit) and switch the constant, then perform navigations on the left-side bar. 


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



## Other information

Here's the paylod returned from the RSC request where client-side routing works.

In the broken preview and production requests since then, we noticed that the request returns the full server-side rendered HTML page -- never the RSC paylod.

``` sh
curl 'https://new-world-docs-oudhfxkng-algolia.vercel.app/doc-beta/guides/sending-events/getting-started?_rsc=1ag7k' \
  -H 'authority: new-world-docs-oudhfxkng-algolia.vercel.app' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'cache-control: no-cache' \
  -H 'next-router-prefetch: 1' \
  -H 'next-router-state-tree: %5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D' \
  -H 'next-url: /' \
  -H 'pragma: no-cache' \
  -H 'referer: https://new-world-docs-oudhfxkng-algolia.vercel.app/doc-beta' \
  -H 'rsc: 1' \
  -H 'sec-ch-ua: "Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' \
  --compressed

```


output:

```
1:HL["/doc-beta/_next/static/media/73f2d88eef2a3cb1-s.p.woff2",{"as":"font","type":"font/woff2"}]

2:HL["/doc-beta/_next/static/css/775de4bd34fc8e1b.css",{"as":"style"}]

3:HL["/doc-beta/_next/static/css/86eec3e5f601e2d3.css",{"as":"style"}]

0:["egCUm2qX8hTK73KG0svIc",[[["",{"children":[["slug","guides/sending-events/getting-started","c"],{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],"$L4",[[["$","link","0",{"rel":"stylesheet","href":"/doc-beta/_next/static/css/775de4bd34fc8e1b.css","precedence":"next"}],["$","link","1",{"rel":"stylesheet","href":"/doc-beta/_next/static/css/86eec3e5f601e2d3.css","precedence":"next"}]],"$L5"]]]]

6:HL["/doc-beta/_next/static/css/eb0f402f1b3ffccb.css",{"as":"style"}]

7:I{"id":3221,"chunks":["604:static/chunks/7469ad70-06c724e85e75c3c1.js","107:static/chunks/9586082c-96e83d67107e3c51.js","299:static/chunks/299-8abd9c28fd0fa8c2.js","894:static/chunks/894-f71a8cadea027143.js","116:static/chunks/116-7934c289e83ba7c1.js","185:static/chunks/app/layout-f6ac79959b204612.js"],"name":"","async":false}

8:I{"id":7084,"chunks":["604:static/chunks/7469ad70-06c724e85e75c3c1.js","107:static/chunks/9586082c-96e83d67107e3c51.js","299:static/chunks/299-8abd9c28fd0fa8c2.js","894:static/chunks/894-f71a8cadea027143.js","519:static/chunks/519-116529c63d973fe8.js","959:static/chunks/959-ab1951fbf5040488.js","42:static/chunks/42-3d8062329dcae0ab.js","330:static/chunks/330-f07f24a53b9bb2b1.js","877:static/chunks/app/[...slug]/page-80cd229f0c352ae9.js"],"name":"","async":false}

b:I{"id":9222,"chunks":["604:static/chunks/7469ad70-06c724e85e75c3c1.js","107:static/chunks/9586082c-96e83d67107e3c51.js","299:static/chunks/299-8abd9c28fd0fa8c2.js","894:static/chunks/894-f71a8cadea027143.js","116:static/chunks/116-7934c289e83ba7c1.js","185:static/chunks/app/layout-f6ac79959b204612.js"],"name":"ThemeProvider","async":false}

....

```



