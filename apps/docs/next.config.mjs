import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: "standalone",
	outputFileTracingIncludes: {
		"/**": ["../../node_modules/.pnpm/@swc+helpers@*/node_modules/@swc/helpers/**"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "templates.nomploy.com",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/docs/core",
				permanent: false,
			},
			{
				source: "/docs",
				destination: "/docs/core",
				permanent: false,
			},
			{
				source: "/docs/templates",
				destination: "https://nomploy.com/templates",
				permanent: true,
			},
			{
				source: "/docs/templates/:id*",
				destination: "https://nomploy.com/templates/:id*",
				permanent: true,
			},
		];
	},
};

export default withMDX(config);
