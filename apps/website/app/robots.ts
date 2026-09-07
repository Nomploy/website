import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: ["https://nomploy.com/sitemap.xml", "https://nomploy.com/llms.txt"],
	};
}
