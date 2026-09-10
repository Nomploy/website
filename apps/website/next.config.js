// Internationalization removed

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	// Serve the installer straight from the Nomploy code repo (single source of
	// truth) so `curl -sSL https://nomploy.com/install.sh | sh` always runs the
	// latest, real installer rather than a stale copy checked into this repo.
	async rewrites() {
		return [
			{
				source: "/install.sh",
				destination:
					"https://raw.githubusercontent.com/Nomploy/nomploy/main/install.sh",
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: "static.ghost.org",
			},
			{
				hostname: "testing-ghost-8423be-31-220-108-27.traefik.me",
			},
			{
				hostname: "images.unsplash.com",
			},
			{
				hostname: "www.gravatar.com",
			},
			{
				hostname: "cms.nomploy.com",
			},
		],
		// domains: [
		// 	"static.ghost.org",
		// 	"testing-ghost-8423be-31-220-108-27.traefik.me",
		// 	"images.unsplash.com",
		// 	"www.gravatar.com",
		// 	"cms.nomploy.com",
		// ],
	},
};

module.exports = nextConfig;
