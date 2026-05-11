import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import injectHTML from 'vite-plugin-html-inject';



const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: "/Ceramic_Soul/",

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                catalog: "catalog.html",
                blog: "blog.html",
                about: "about.html",
                // footer: "footer.html",
            },

        },
    },
    plugins: [
        ViteImageOptimizer({
            logStats: true,
            ansiColors: true,
            test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
            exclude: undefined,
            include: undefined,
            includePublic: true,
            svg: {
                multipass: true,
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                cleanupNumericValues: false,
                                cleanupIds: {
                                    minify: false,
                                    remove: false,
                                },
                                convertPathData: false,
                            },
                        },
                    },
                    'sortAttrs',
                    {
                        name: 'addAttributesToSVGElement',
                        params: {
                            attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                        },
                    },
                ],
            },
            png: {
                // https://sharp.pixelplumbing.com/api-output#png
                quality: 50,
            },
            jpeg: {
                // https://sharp.pixelplumbing.com/api-output#jpeg
                quality: 50,
            },
            jpg: {
                // https://sharp.pixelplumbing.com/api-output#jpeg
                quality: 50,
            },
            tiff: {
                // https://sharp.pixelplumbing.com/api-output#tiff
                quality: 50,
            },
            // gif does not support lossless compression
            // https://sharp.pixelplumbing.com/api-output#gif
            gif: {},
            webp: {
                // https://sharp.pixelplumbing.com/api-output#webp
                lossless: true,
            },
            avif: {
                // https://sharp.pixelplumbing.com/api-output#avif
                lossless: true,
            },
            cache: false,
            cacheLocation: undefined,
        }),

        mkcert(),

        injectHTML(),
    ],

    server: {
        https: true // Увімкнення HTTPS
    },

})


