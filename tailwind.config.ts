import type { Config } from "tailwindcss";

const config: Config = {
   content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      container: {
         center: true,
         screens: {
            "2xl": "calc(100vw - 200px)",
         },
      },

      extend: {
         fontSize: {
            xxs: "0.625rem",
         },
         fontFamily: {
            sans: ["var(--helvetica)"],
         },
         colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            muted: "var(--muted)",
         },
      },
   },
   plugins: [],
};
export default config;
