import { Themes } from "@geist-ui/core";

export const darkTheme = Themes.createFromDark({
  type: "solardark",
  palette: {
    background: "#2e3134",
    foreground: "#eef0f2",
  
    secondary: "#eef0f2",

    accents_1: "#f18303",
    accents_2: "#f18303",
    accents_3: "#2b2d2f",
    accents_4: "#333638",

    link: "#f18303",
    selection: "#f18303",
  },
});

export const lightTheme = Themes.createFromLight({
  type: "solarlight",
  palette: {
    background: "#eef0f2",
    foreground: "#2e3134",

    accents_1: "#f18303",
    accents_2: "#f18303",
    accents_4: "#eef0f2",
    accents_3: "#d7dadd",

    link: "#f18303",
    selection: "#f18303"
  },
});
