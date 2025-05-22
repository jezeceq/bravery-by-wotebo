// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {

    let baseUrl = './';

    if (command === 'build' && process.env.DEPLOY_ENV === 'GH_PAGES') {
        baseUrl = '/bravery-by-wotebo/';
    }

    return {
        plugins: [],
        base: baseUrl,
        build: {
            outDir: 'dist',
        },
    };
});