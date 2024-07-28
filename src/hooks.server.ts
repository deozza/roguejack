import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://f30853e3060f4e1b8c531ee938d6de7d@glitchtip.letsjam.dev/3',
	tracesSampleRate: 1
});

export const handleError = Sentry.handleErrorWithSentry();

export const handle = sequence(Sentry.sentryHandle(), async function _handle({ event, resolve }) {
	return await resolve(event, {
		filterSerializedResponseHeaders: (key, value) => {
			return key.toLowerCase() === 'content-type';
		}
	});
});
