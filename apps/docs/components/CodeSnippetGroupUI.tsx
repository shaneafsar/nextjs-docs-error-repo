"use client";
import { useSearchParams } from "next/navigation";
import { Fragment, ReactNode, createContext } from "react";
import { useCookies } from "react-cookie";

import { useStore } from "@nanostores/react";

import { selectedLanguage } from "@store/codeLanguage";

const languageDisplay = {
  abap: "Abap",
  "actionscript-3": "Actionscript-3",
  ada: "Ada",
  apache: "Apache",
  apex: "Apex",
  apl: "Apl",
  applescript: "Applescript",
  ara: "Ara",
  asm: "Asm",
  astro: "Astro",
  awk: "Awk",
  ballerina: "Ballerina",
  bat: "Bat",
  batch: "Batch",
  beancount: "Beancount",
  berry: "Berry",
  be: "Be",
  bibtex: "Bibtex",
  bicep: "Bicep",
  blade: "Blade",
  c: "C",
  cadence: "Cadence",
  cdc: "CDC",
  clarity: "Clarity",
  clojure: "Clojure",
  clj: "CLJ",
  cmake: "CMake",
  cobol: "Cobol",
  codeql: "CodeQL",
  ql: "QL",
  coffee: "Ccoffee",
  cpp: "C++",
  crystal: "Crystal",
  csharp: "C#",
  "c#": "C#",
  cs: "CS",
  css: "CSS",
  cue: "CUE",
  cypher: "Cypher",
  cql: "CQL",
  d: "D",
  dart: "Dart",
  dax: "Dax",
  diff: "Diff",
  docker: "Docker",
  dockerfile: "Dockerfile",
  "dream-maker": "Dream Maker",
  elixir: "Elixir",
  elm: "Elm",
  erb: "ERB",
  erlang: "Erlang",
  erl: "Erlang",
  fish: "Fish",
  fsharp: "F#",
  "f#": "F#",
  fs: "fs",
  gdresource: "gdresource",
  gdscript: "gdscript",
  gdshader: "Gotdot Shaders",
  gherkin: "Gherkin",
  "git-commit": "git commit",
  "git-rebase": "git rebase",
  glsl: "GLSL",
  gnuplot: "GNUplot",
  go: "GO",
  graphql: "GraphQL",
  groovy: "Groovy",
  hack: "Hack",
  haml: "Haml",
  handlebars: "Handlebars",
  hbs: "HBS",
  haskell: "Haskell",
  hs: "HS",
  hcl: "HCL",
  hjson: "HJSON",
  hlsl: "HLSL",
  html: "HTML",
  http: "HTTP",
  imba: "IMBA",
  ini: "INI",
  properties: "Properties",
  java: "Java",
  javascript: "JavaScript",
  js: "JavaScript",
  "jinja-html": "Jinja HTML",
  jison: "jison",
  json: "JSON",
  json5: "JSON5",
  jsonc: "JSONC",
  jsonnet: "Jsonnet",
  jssm: "JSSM",
  fsl: "FSL",
  jsx: "jsx",
  julia: "Julia",
  kotlin: "Kotlin",
  kusto: "Kusto",
  kql: "KQL",
  latex: "Latex",
  less: "Less",
  liquid: "Liquid",
  lisp: "Lisp",
  logo: "Logo",
  lua: "Lua",
  make: "Make",
  makefile: "Makefile",
  markdown: "Markdown",
  md: "Markdown",
  marko: "Marko",
  matlab: "Matlab",
  mdx: "MDX",
  mermaid: "Mermaid",
  nextflow: "Nextflow",
  nf: "NG",
  nginx: "Nginx",
  nim: "Nim",
  nix: "Nix",
  "objective-c": "Objective-C",
  objc: "Objective-C",
  "objective-cpp": "Objective C++",
  ocaml: "OCaml",
  pascal: "Pascal",
  perl: "Perl",
  php: "PHP",
  plsql: "PLSQL",
  postcss: "Postcss",
  powerquery: "Powerquery",
  powershell: "Powershell",
  ps: "ps",
  ps1: "ps1",
  prisma: "prisma",
  prolog: "prolog",
  proto: "proto",
  pug: "pug",
  jade: "jade",
  puppet: "puppet",
  purescript: "Purescript",
  python: "Python",
  py: "Python",
  r: "R",
  raku: "raku",
  perl6: "perl6",
  razor: "razor",
  reg: "reg",
  rel: "rel",
  riscv: "riscv",
  rst: "rst",
  ruby: "Ruby",
  rb: "Ruby",
  rust: "Rust",
  rs: "rs",
  sas: "sas",
  sass: "Sass",
  scala: "Scala",
  scheme: "scheme",
  scss: "Scss",
  shaderlab: "shaderlab",
  shader: "shader",
  shellscript: "Shellscript",
  bash: "Bash",
  console: "Console",
  sh: "Shell",
  shell: "Shell",
  zsh: "ZSH",
  smalltalk: "smalltalk",
  solidity: "solidity",
  sparql: "sparql",
  sql: "SQL",
  "ssh-config": "ssh-config",
  stata: "stata",
  stylus: "stylus",
  styl: "styl",
  svelte: "Svelte",
  swift: "Swift",
  "system-verilog": "system-verilog",
  tasl: "tasl",
  tcl: "tcl",
  tex: "tex",
  toml: "Toml",
  tsx: "tsx",
  turtle: "turtle",
  twig: "twig",
  typescript: "TypeScript",
  ts: "TypeScript",
  v: "v",
  vb: "vb",
  cmd: "cmd",
  verilog: "verilog",
  vhdl: "VHDL",
  viml: "viml",
  vim: "Vim",
  vimscript: "vimscript",
  "vue-html": "Vue HTML",
  vue: "Vue",
  vyper: "vyper",
  vy: "vy",
  wasm: "WebAssembly",
  wenyan: "wenyan",
  文言: "文言",
  wgsl: "wgsl",
  wolfram: "wolfram",
  xml: "XML",
  xsl: "xsl",
  yaml: "Yaml",
  yml: "Yml",
  zenscript: "ZenScript",
};

interface CodeSnippetGroupProps {
  children: ReactNode[];
  languages: string[];
  languageInCookie?: string;
  title: string;
}
interface LanguagesContext {
  language: string;
  languages: string[];
  languageInCookie?: string;
  languageDisplay: {};
}
export const LanguagesContext = createContext<LanguagesContext | null>(null);

const getLanguage = (
  inStore: string | null,
  inSearch: string | null,
  inCookie: string | undefined,
  snippetLanguages: string[]
): string => {
  if (inStore && snippetLanguages.find((l) => l === inStore)) return inStore;
  if (inSearch && snippetLanguages.find((l) => l === inSearch)) return inSearch;
  if (inCookie && snippetLanguages.find((l) => l === inCookie)) return inCookie;
  return snippetLanguages[0];
};

export const CODE_SNIPPET_COOKIE_NAME = "docs-code-snippet-group-language";

export const CodeSnippetGroupUI = ({
  children,
  languages,
  languageInCookie,
  title,
}: CodeSnippetGroupProps) => {
  const searchParams = useSearchParams();
  const languageInSearchParams = searchParams.get("language");
  const languageFromStore = useStore(selectedLanguage);
  const [cookies, _] = useCookies();

  if (languageInCookie === undefined) {
    languageInCookie = cookies[CODE_SNIPPET_COOKIE_NAME];
  }

  const language = getLanguage(
    languageFromStore,
    languageInSearchParams,
    languageInCookie,
    languages
  );

  return (
    <div className="not-prose mt-8">
      <LanguagesContext.Provider
        value={{ languages, languageInCookie, language, languageDisplay }}
      >
        {children.find((_, index) => languages[index] === language)}
      </LanguagesContext.Provider>
    </div>
  );
};
