import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import SearchDialog from "@/components/SearchDialog";
import { GoogleAnalytics } from "@next/third-parties/google";
import { OpenPanelComponent } from "@openpanel/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://docs.nomploy.com"),
	title: {
		default: "Nomploy Documentation",
		template: "%s | Nomploy",
	},
	description:
		"Open Source Alternative to Vercel, Netlify and Heroku. Deploy your applications with ease.",
	keywords: [
		"nomploy",
		"deployment",
		"docker",
		"hosting",
		"devops",
		"open source",
	],
	authors: [{ name: "Nomploy Team" }],
	openGraph: {
		title: "Nomploy Documentation",
		description: "Open Source Alternative to Vercel, Netlify and Heroku",
		type: "website",
	},
};

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<head>
				{/* Privacy-friendly analytics by Plausible */}
				<script
					defer
					src="https://plausible.pipoline.com/js/pa-AEDASVCEVtgSEBSKCf2Ls.js"
				/>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Plausible init snippet
					dangerouslySetInnerHTML={{
						__html:
							"window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
					}}
				/>
			</head>
			<body className="flex flex-col min-h-screen">
				<GoogleAnalytics gaId="G-HZ71HG38HN" />
				<OpenPanelComponent
					apiUrl="https://openpanel.nomploy.com/api"
					clientId="bf5a178b-7f28-4461-bf47-d63feff15922"
					trackScreenViews={true}
					trackOutgoingLinks={true}
					trackAttributes={true}
					globalProperties={{ site: "docs" }}
				/>
				<RootProvider
					search={{
						SearchDialog,
					}}
				>
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
