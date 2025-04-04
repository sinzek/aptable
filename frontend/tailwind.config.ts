import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sora: ["var(--font-sora-sans)", "sans-serif"],
                aleo: ["var(--font-aleo-mono)", "monospace"],
            },
            colors: {
                // 500 is the default for each color, as shown in our color palette
                darkpurple: {
                    100: "#d4d1d6",
                    200: "#a8a4ad",
                    300: "#7d7683",
                    400: "#51495a",
                    500: "#261b31", // default
                    600: "#1e1627",
                    700: "#17101d",
                    800: "#0f0b14",
                    900: "#08050a",
                },

                purple: {
                    100: "#e4d3e6",
                    200: "#c9a6cd",
                    300: "#af7ab3",
                    400: "#944d9a",
                    500: "#792181", // default
                    600: "#611a67",
                    700: "#49144d",
                    800: "#300d34",
                    900: "#18071a",
                },
                maroon: {
                    100: "#dfccd2",
                    200: "#be99a6",
                    300: "#9e6679",
                    400: "#7d334d",
                    500: "#5d0020", // default
                    600: "#4a001a",
                    700: "#380013",
                    800: "#25000d",
                    900: "#130006",
                },
                red: {
                    100: "#fedddc",
                    200: "#fdbbb9",
                    300: "#fb9a95",
                    400: "#fa7872",
                    500: "#f9564f", // default
                    600: "#c7453f",
                    700: "#95342f",
                    800: "#642220",
                    900: "#321110",
                },
                orange: {
                    100: "#feebdb",
                    200: "#fed7b6",
                    300: "#fdc392",
                    400: "#fdaf6d",
                    500: "#fc9b49", // default
                    600: "#ca7c3a",
                    700: "#975d2c",
                    800: "#653e1d",
                    900: "#321f0f",
                },
                yellow: {
                    100: "#fff9d9",
                    200: "#fff2b4",
                    300: "#ffec8e",
                    400: "#ffe569",
                    500: "#ffdf43", // default
                    600: "#ccb236",
                    700: "#998628",
                    800: "#66591b",
                    900: "#332d0d",
                },
                teal: {
                    100: "#e8f6f3",
                    200: "#d1ece8",
                    300: "#bbe3dc",
                    400: "#a4d9d1",
                    500: "#8dd0c5", // default
                    600: "#71a69e",
                    700: "#557d76",
                    800: "#38534f",
                    900: "#1c2a27",
                },
                white: "#FFFFFF",
                black: "#000000",
                gray: {
                    100: "#F3F4F6", // lightest gray
                    200: "#E5E7EB",
                    300: "#D1D5DB",
                    400: "#9CA3AF",
                    500: "#6B7280",
                    600: "#4B5563",
                    700: "#374151",
                    800: "#1F2937",
                    900: "#111827", // darkest gray
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
