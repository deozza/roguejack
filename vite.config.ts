import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sentrySvelteKit } from '@sentry/sveltekit';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'letsjam',
				project: 'dungeons and jacks'
			}
		}),
		sveltekit(),
		purgeCss()
	],
	test: {
		coverage: {
			provider: 'v8',
			include: ['src/lib/**/*.ts']
		}
	}
});
