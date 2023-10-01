import { env } from '$env/dynamic/private';

export const prerender = Boolean(env.LOCAL);
