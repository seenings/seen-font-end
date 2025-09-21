import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {defineConfig} from "vite";
// https://vitejs.dev/config/

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                main: "index.html",
                test: "test/index.html",
                "multi-photo": "test/multi-photo/index.html",
                "photo-title-db": "test/indexed-db/index.html",
                "photo-cache": "test/photo/photo-cache/index.html",
            }
        }
    },
    plugins: [
        vue(),
        vueJsx()
    ],
    server: {
        host: "0.0.0.0",
        port: 8101,
        proxy: {
            "/seen": {
                target: "http://[::1]:8082",
            },
        }
    },
});
