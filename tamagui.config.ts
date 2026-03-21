import { createFont, createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  color: {
    background: "#f6f7f8",
    surface: "#ffffff",
    primary: "#137fec",
    textMain: "#0f172a",
    textSub: "#64748b",
    border: "#e5e7eb",
    primarySoft: "rgba(19, 127, 236, 0.1)",

    danger: "#ef4444",
    dangerSoft: "rgba(239, 68, 68, 0.15)",
    dangerBorder: "rgba(239, 68, 68, 0.3)",

    info: "#3b82f6",
    infoSoft: "rgba(59, 130, 246, 0.15)",
    infoBorder: "rgba(59, 130, 246, 0.3)",

    neutral: "#64748b",
    neutralSoft: "rgba(100, 116, 139, 0.15)",
    neutralBorder: "rgba(100, 116, 139, 0.3)",

    success: "#22c55e",
    successSoft: "rgba(34, 197, 94, 0.15)",
    warning: "#f59e0b",
    warningSoft: "rgba(245, 158, 11, 0.15)",
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 48,
    9: 64,
    true: 16, // Added 'true' defaults
  },
  size: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 48,
    9: 64,
    10: 128,
    true: 16,
  },
  radius: {
    1: 6,
    2: 10,
    3: 16,
    4: 24,
    round: 999,
    true: 10,
  },
  zIndex: {
    // 🚨 REQUIRED category
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    true: 100,
  },
});

const systemFont = createFont({
  family: "System",
  size: { 1: 12, 2: 14, 3: 16, 4: 18, 5: 20, 6: 24, 7: 30, true: 16 }, // Added 'true' defaults
  lineHeight: { 1: 16, 2: 20, 3: 24, 4: 28, 5: 32, 6: 36, 7: 40, true: 24 },
  weight: { 400: "400", 500: "500", 600: "600", 700: "700", true: "400" },
  letterSpacing: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -0.5, 6: -0.5, 7: -1, true: 0 },
});

const shorthands = {
  p: "padding",
  px: "paddingHorizontal",
  py: "paddingVertical",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  m: "margin",
  mb: "marginBottom",
  mr: "marginRight",
  mt: "marginTop",
  w: "width",
  h: "height",
  bg: "backgroundColor",
  br: "borderRadius",
  f: "flex",
  ai: "alignItems",
  jc: "justifyContent",
  ta: "textAlign",
  pos: "position",
} as const;

const config = createTamagui({
  tokens,
  shorthands,
  fonts: {
    heading: systemFont,
    body: systemFont,
  },
  defaultFont: "body",
  media: {
    sm: { maxWidth: 860 },
    md: { maxWidth: 1024 },
    lg: { maxWidth: 1280 },
  },
  themes: {
    light: {
      background: tokens.color.background,
      surface: tokens.color.surface,
      primary: tokens.color.primary,
      textMain: tokens.color.textMain,
      textSub: tokens.color.textSub,
      border: tokens.color.border,
      primarySoft: tokens.color.primarySoft,
    },
  },
});

export type AppConfig = typeof config;
declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;
