import type { Config } from "tailwindcss";

const config: Config = {
   content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      container: {
         center: true,
      },

      extend: {
         fontSize: {
            xxs: "0.625rem",
         },
         fontFamily: {
            sans: ["var(--font-helvetica-neue),"],
         },
         colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            muted: "var(--muted)",
         },
      },
   },
   plugins: [],
   variants: {
      extend: {
         backgroundColor: ["disabled"],
         textColor: ["disabled"],
         opacity: ["disabled"],
      },
   },
};
export default config;
