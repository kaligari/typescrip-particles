import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
    test: {
        environment: 'jsdom',
        deps: {
            inline: ['vitest-canvas-mock'],
        },
        // For this config, check https://github.com/vitest-dev/vitest/issues/740
        threads: false,
        environmentOptions: {
            jsdom: {
                resources: 'usable',
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
})
