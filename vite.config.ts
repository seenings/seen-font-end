import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import {resolve} from "path";
import {defineConfig} from "vite";
// https://vitejs.dev/config/

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                test: resolve(__dirname, "test/index.html"),
                "multi-photo": resolve(__dirname, "test/multi-photo/index.html"),
                "photo-title-db": resolve(__dirname, "test/indexed-db/index.html"),
                "photo-cache": resolve(__dirname, "test/photo/photo-cache/index.html"),
            },
        },
    },
    plugins: [
        vue(),
        vueJsx(),
    ],
    server: {
        host: "0.0.0.0",
        port: 8101,
        proxy: {
            "/seen": {
                target: "http://localhost:80",
            },
        },
    },
});
