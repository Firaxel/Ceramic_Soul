import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                catalog: resolve(__dirname, "catalog.html"),
            },

        },
    },

    server: {
        https: true // Увімкнення HTTPS
    },
    plugins: [mkcert()],
})


