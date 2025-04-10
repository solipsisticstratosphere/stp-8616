import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { globalStylesOptions } from './global.styles';

const githubPagesPathFix = () => {
  return {
    name: 'github-pages-path-fix',
    transformIndexHtml(html) {
      return html
        .replace(/(href|src)=["']\/stp-8616\//g, '$1="./')
        .replace(/src=["']\/stp-8616\/assets\//g, 'src="./assets/');
    },
  };
};

export default defineConfig(({ command }) => {
  return {
    base: '/stp-8616/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      githubPagesPathFix(),
      ViteImageOptimizer({
        exclude: /^sprite.svg$/,
        png: {
          quality: 60,
        },
        jpeg: {
          quality: 60,
        },
        jpg: {
          quality: 60,
        },
        webp: {
          quality: 60,
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: globalStylesOptions,
        },
      },
    },
  };
});
