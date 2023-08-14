// src/index.ts
import { createFilter } from "@rollup/pluginutils";

// src/markdown.ts
import MarkdownIt from "markdown-it";
import { toArray, uniq } from "@antfu/utils";
import { componentPlugin } from "@mdit-vue/plugin-component";
import { frontmatterPlugin } from "@mdit-vue/plugin-frontmatter";

// src/head.ts
var headProperties = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "htmlAttrs",
  "bodyAttrs"
];
function preprocessHead(frontmatter, options) {
  if (!options.headEnabled)
    return frontmatter;
  const head = options.headField ? frontmatter[options.headField] || {} : frontmatter;
  const meta = head.meta = head.meta || [];
  if (head.title) {
    if (!meta.find((i) => i.property === "og:title"))
      meta.push({ property: "og:title", content: head.title });
    if (!meta.find((i) => i.name === "twitter:title"))
      meta.push({ name: "twitter:title", content: head.title });
  }
  if (head.description) {
    if (!meta.find((i) => i.name === "description"))
      meta.push({ name: "description", content: head.description });
    if (!meta.find((i) => i.property === "og:description"))
      meta.push({ property: "og:description", content: head.description });
    if (!meta.find((i) => i.name === "twitter:description"))
      meta.push({ name: "twitter:description", content: head.description });
  }
  if (head.image) {
    if (!meta.find((i) => i.property === "og:image"))
      meta.push({ property: "og:image", content: head.image });
    if (!meta.find((i) => i.name === "twitter:image"))
      meta.push({ name: "twitter:image", content: head.image });
    if (!meta.find((i) => i.property === "twitter:card"))
      meta.push({ name: "twitter:card", content: "summary_large_image" });
  }
  const result = {};
  for (const [key, value] of Object.entries(head)) {
    if (headProperties.includes(key))
      result[key] = value;
  }
  return Object.entries(result).length === 0 ? null : result;
}

// src/markdown.ts
var scriptSetupRE = /<\s*script([^>]*)\bsetup\b([^>]*)>([\s\S]*)<\/script>/mg;
var defineExposeRE = /defineExpose\s*\(/mg;
function extractScriptSetup(html) {
  const scripts = [];
  html = html.replace(scriptSetupRE, (_, attr1, attr2, code) => {
    scripts.push({
      code,
      attr: `${attr1} ${attr2}`.trim()
    });
    return "";
  });
  return { html, scripts };
}
function extractCustomBlock(html, options) {
  const blocks = [];
  for (const tag of options.customSfcBlocks) {
    html = html.replace(new RegExp(`<${tag}[^>]*\\b[^>]*>[^<>]*<\\/${tag}>`, "mg"), (code) => {
      blocks.push(code);
      return "";
    });
  }
  return { html, blocks };
}
function createMarkdown(options) {
  const isVue2 = options.vueVersion.startsWith("2.");
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    ...options.markdownItOptions
  });
  markdown.use(componentPlugin, options.componentOptions);
  if (options.frontmatter || options.excerpt) {
    markdown.use(frontmatterPlugin, {
      ...options.frontmatterOptions,
      grayMatterOptions: {
        excerpt: options.excerpt,
        ...options.frontmatterOptions.grayMatterOptions
      }
    });
  }
  markdown.linkify.set({ fuzzyLink: false });
  options.markdownItUses.forEach((e) => {
    const [plugin, options2] = toArray(e);
    markdown.use(plugin, options2);
  });
  options.markdownItSetup(markdown);
  return (id, raw) => {
    const {
      wrapperClasses,
      wrapperComponent,
      transforms,
      headEnabled,
      frontmatterPreprocess
    } = options;
    raw = raw.trimStart();
    if (transforms.before)
      raw = transforms.before(raw, id);
    const env = { id };
    let html = markdown.render(raw, env);
    const { excerpt = "", frontmatter: data = null } = env;
    const wrapperClassesResolved = toArray(
      typeof wrapperClasses === "function" ? wrapperClasses(id, raw) : wrapperClasses
    ).filter(Boolean).join(" ");
    if (wrapperClassesResolved)
      html = `<div class="${wrapperClassesResolved}">${html}</div>`;
    else
      html = `<div>${html}</div>`;
    const wrapperComponentName = typeof wrapperComponent === "function" ? wrapperComponent(id, raw) : wrapperComponent;
    if (wrapperComponentName) {
      const attrs2 = [
        options.frontmatter && ':frontmatter="frontmatter"',
        options.excerpt && ':excerpt="excerpt"'
      ].filter(Boolean).join(" ");
      html = `<${wrapperComponentName} ${attrs2}>${html}</${wrapperComponentName}>`;
    }
    if (transforms.after)
      html = transforms.after(html, id);
    if (options.escapeCodeTagInterpolation) {
      html = html.replace(/<code(.*?)>/g, "<code$1 v-pre>");
    }
    const hoistScripts = extractScriptSetup(html);
    html = hoistScripts.html;
    const customBlocks = extractCustomBlock(html, options);
    html = customBlocks.html;
    const scriptLines = [];
    let frontmatterExportsLines = [];
    let excerptExportsLine = "";
    let excerptKeyOverlapping = false;
    function hasExplicitExports() {
      return defineExposeRE.test(hoistScripts.scripts.map((i) => i.code).join(""));
    }
    if (options.frontmatter) {
      if (options.excerpt && data) {
        if (data.excerpt !== void 0)
          excerptKeyOverlapping = true;
        data.excerpt = excerpt;
      }
      const { head, frontmatter } = frontmatterPreprocess(data || {}, options, id, preprocessHead);
      if (options.excerpt && !excerptKeyOverlapping && frontmatter.excerpt !== void 0)
        delete frontmatter.excerpt;
      scriptLines.push(`const frontmatter = ${JSON.stringify(frontmatter)}`);
      frontmatterExportsLines = Object.entries(frontmatter).map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`);
      if (!isVue2 && options.exposeFrontmatter && !hasExplicitExports())
        scriptLines.push("defineExpose({ frontmatter })");
      if (!isVue2 && headEnabled && head) {
        scriptLines.push(`const head = ${JSON.stringify(head)}`);
        const importFrom = headEnabled === "unhead" ? "@unhead/vue" : "@vueuse/head";
        scriptLines.unshift(`import { useHead } from "${importFrom}"`);
        scriptLines.push("useHead(head)");
      }
    }
    if (options.excerpt) {
      scriptLines.push(`const excerpt = ${JSON.stringify(excerpt)}`);
      if (!excerptKeyOverlapping)
        excerptExportsLine = `export const excerpt = ${JSON.stringify(excerpt)}
`;
      if (!isVue2 && options.exposeExcerpt && !hasExplicitExports())
        scriptLines.push("defineExpose({ excerpt })");
    }
    scriptLines.push(...hoistScripts.scripts.map((i) => i.code));
    let attrs = uniq(hoistScripts.scripts.map((i) => i.attr)).join(" ").trim();
    if (attrs)
      attrs = ` ${attrs}`;
    const scripts = isVue2 ? [
      `<script${attrs}>`,
      ...scriptLines,
      ...frontmatterExportsLines,
      excerptExportsLine,
      "export default { data() { return { frontmatter } } }",
      "</script>"
    ] : [
      `<script setup${attrs}>`,
      ...scriptLines,
      "</script>",
      ...frontmatterExportsLines.length || excerptExportsLine ? [
        `<script${attrs}>`,
        ...frontmatterExportsLines,
        excerptExportsLine,
        "</script>"
      ] : []
    ];
    const code = [
      `<template>${html}</template>`,
      ...scripts.map((i) => i.trim()).filter(Boolean),
      ...customBlocks.blocks
    ].join("\n");
    return {
      code,
      map: { mappings: "" }
    };
  };
}

// src/utils.ts
import { createRequire } from "module";
var require2 = createRequire(import.meta.url);
function getVueVersion(defaultVersion = "3.2.0") {
  try {
    let v = require2("vue");
    if (v.default)
      v = v.default;
    return v.version || defaultVersion;
  } catch (e) {
    return defaultVersion;
  }
}
function isUnheadVueInstalled() {
  try {
    require2("@unhead/vue");
    return true;
  } catch {
    return false;
  }
}

// src/options.ts
function resolveOptions(userOptions) {
  const defaultOptions = {
    headEnabled: false,
    headField: "",
    frontmatter: true,
    excerpt: false,
    exposeFrontmatter: true,
    exposeExcerpt: false,
    escapeCodeTagInterpolation: true,
    customSfcBlocks: ["route", "i18n", "style"],
    componentOptions: {},
    frontmatterOptions: {},
    markdownItOptions: {},
    markdownItUses: [],
    markdownItSetup: () => {
    },
    wrapperComponent: null,
    transforms: {},
    vueVersion: userOptions.vueVersion || getVueVersion(),
    wrapperClasses: "markdown-body",
    include: null,
    exclude: null,
    frontmatterPreprocess: (frontmatter, options2, _id, defaults) => {
      return {
        head: defaults(frontmatter, options2),
        frontmatter
      };
    }
  };
  const options = {
    ...defaultOptions,
    ...userOptions
  };
  if (options.headEnabled === true)
    options.headEnabled = isUnheadVueInstalled() ? "unhead" : "vueuse";
  return options;
}

// src/index.ts
function VitePluginMarkdown(userOptions = {}) {
  const options = resolveOptions(userOptions);
  const markdownToVue = createMarkdown(options);
  const filter = createFilter(
    userOptions.include || /\.md$/,
    userOptions.exclude
  );
  return {
    name: "vite-plugin-vue-markdown",
    enforce: "pre",
    transform(raw, id) {
      if (!filter(id))
        return;
      try {
        return markdownToVue(id, raw);
      } catch (e) {
        this.error(e);
      }
    },
    async handleHotUpdate(ctx) {
      if (!filter(ctx.file))
        return;
      const defaultRead = ctx.read;
      ctx.read = async function() {
        return markdownToVue(ctx.file, await defaultRead()).code;
      };
    }
  };
}
var src_default = VitePluginMarkdown;
export {
  src_default as default
};
