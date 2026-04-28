import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Clean production-safe Vite config
export default defineConfig({
base: "/", // ✅ Required for Vercel (root deployment)

server: {
host: true,
port: 8080,
},

plugins: [
react(), // ✅ Standard React plugin (no CSP issues)
],

resolve: {
alias: {
"@": path.resolve(__dirname, "./src"),
},
},
});
