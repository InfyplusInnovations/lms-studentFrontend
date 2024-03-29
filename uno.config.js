import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  presets: [
    presetAttributify({}),
    presetWind({}),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        sans: "Roboto",
        mono: ["Fira Code", "Fira Mono:400,700"],
        fredoka: "Fredoka",
      },
    }),
  ],
  theme: {
    colors: {},
    size: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
  },
  rules: [
    ["no-shadow", { "box-shadow": "none" }],
    ["q-ma-auto", { margin: "auto" }],
    ["q-pa-auto", { padding: "auto" }],
    [
      /^q-m[xy]-(\d+)$/,
      ([, d]) => ({
        "margin-left": `${d / 4}rem`,
        "margin-right": `${d / 4}rem`,
      }),
    ],
    [/^q-ma-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [
      /^q-p[xy]-(\d+)$/,
      ([, d]) => ({
        "padding-left": `${d / 4}rem`,
        "padding-right": `${d / 4}rem`,
      }),
    ],
    [/^q-pa-(\d+)$/, ([, d]) => ({ padding: `${d / 4}rem` })],
    [
      /^q-p[xy]-(.*)$/,
      ([, c], { theme }) => {
        if (theme.size[c])
          return {
            "padding-left": theme.size[c],
            "padding-right": theme.size[c],
          };
      },
    ],
    [
      /^q-pa-(.*)$/,
      ([, c], { theme }) => {
        if (theme.size[c]) return { padding: theme.size[c] };
      },
    ],
  ],
});
