import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
 
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// export default defineConfig({
// 	plugins: [sveltekit()]
// });
 
export default defineConfig({

    server: {

        fs: {

            allow: ['.'],

        },

    },

    plugins: [sveltekit()]

});
