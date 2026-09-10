import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Check, X, Zap, Globe, Bell, Users, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Nomploy vs. Dokku Comparison | Nomploy | Nomploy",
	description:
		"Nomploy vs. Dokku: Compare self-hosted PaaS platforms. See how Nomploy's UI-first approach stacks up against Dokku's CLI-based workflow for deployments.",
};

type FeatureValue = boolean | "limited";

interface FeatureRow {
	feature: string;
	nomploy: FeatureValue;
	dokku: FeatureValue;
	section?: string;
}

const featureComparisonRows: FeatureRow[] = [
	// Setup & Installation
	{ feature: "One-command installation", nomploy: true, dokku: true, section: "Setup & Installation" },
	{ feature: "Web-based UI dashboard", nomploy: true, dokku: false },
	{ feature: "Works with firewall and Tailscale out of the box", nomploy: true, dokku: false },
	{ feature: "Lightweight CPU usage while idle", nomploy: true, dokku: true },
	// Deployment
	{ feature: "Deploy from GitHub, GitLab, Bitbucket", nomploy: true, dokku: "limited", section: "Deployment" },
	{ feature: "Auto-deploy on git push", nomploy: true, dokku: true },
	{ feature: "Docker Compose support", nomploy: true, dokku: "limited" },
	{ feature: "Deploy from custom Docker images", nomploy: true, dokku: true },
	{ feature: "Nixpacks and Buildpack support", nomploy: true, dokku: true },
	{ feature: "Preview deployments (review apps)", nomploy: true, dokku: false },
	{ feature: "One-click app templates", nomploy: true, dokku: false },
	// Networking & Domains
	{ feature: "Built-in reverse proxy", nomploy: true, dokku: true, section: "Networking & Domains" },
	{ feature: "Automatic SSL via Let's Encrypt", nomploy: true, dokku: true },
	{ feature: "Custom domain management via UI", nomploy: true, dokku: false },
	// Data & Backups
	{ feature: "Database deployment (Postgres, MySQL, Redis, etc.)", nomploy: true, dokku: true, section: "Data & Backups" },
	{ feature: "Scheduled database backups (S3)", nomploy: true, dokku: "limited" },
	{ feature: "Back up arbitrary Docker volumes", nomploy: true, dokku: false },
	// Monitoring & Alerts
	{ feature: "Real-time monitoring (CPU, RAM, disk)", nomploy: true, dokku: false, section: "Monitoring & Alerts" },
	{ feature: "Metrics enabled by default", nomploy: true, dokku: false },
	{ feature: "Automated alerts from metrics", nomploy: true, dokku: false },
	{ feature: "Application log viewer in UI", nomploy: true, dokku: false },
	// Teams & Access
	{ feature: "Teams and multi-user support", nomploy: true, dokku: false, section: "Teams & Access" },
	{ feature: "Role-based access control (RBAC)", nomploy: true, dokku: false },
	{ feature: "Projects grouping", nomploy: true, dokku: false },
	{ feature: "Multi-server deployment", nomploy: true, dokku: false },
	{ feature: "API access", nomploy: true, dokku: true },
	{ feature: "AI-assisted deployments", nomploy: true, dokku: false },
];

const whyChooseItems = [
	{
		icon: Zap,
		title: "Skip the CLI, ship from a dashboard",
		description:
			"Dokku requires SSH access and CLI commands for every operation—deploying, scaling, configuring domains, managing databases. Nomploy puts all of that in a visual dashboard. Connect your repo, configure your service, and deploy—all without touching a terminal. You still get full Docker access when you need it.",
		image: {
			src: "/images/nomploy-build-logs.png",
			alt: "Nomploy deployment panel showing build and deployment logs",
		},
	},
	{
		icon: Bell,
		title: "Get monitoring and backups out of the box",
		description:
			"Dokku has no built-in monitoring or backup system—you'd need to set up separate tools and cron jobs. Nomploy includes real-time CPU, memory, and disk metrics, automated alerts, and scheduled S3-compatible backups for both databases and Docker volumes from day one.",
		image: {
			src: "/images/nomploy-monitoring-dashboard.png",
			alt: "Nomploy monitoring dashboard showing CPU, memory and disk metrics",
		},
	},
	{
		icon: Users,
		title: "Built for teams, not just solo operators",
		description:
			"Dokku is fundamentally a single-server, single-user tool. Nomploy supports multi-user access with role-based permissions, project organization, and multi-server deployments. When your project grows from a solo effort to a team operation, Nomploy scales with you.",
		image: {
			src: "/images/nomploy-environments.png",
			alt: "Nomploy project organization with production and staging environments",
		},
	},
	{
		icon: Globe,
		title: "Manage everything in one place",
		description:
			"With Dokku, databases, SSL, and domains each require separate plugins and CLI commands. Nomploy integrates database management, domain configuration, SSL certificates, Docker Compose, and deployment pipelines into a single, cohesive interface—reducing context-switching and operational overhead.",
		image: {
			src: "/images/nomploy-domains.png",
			alt: "Nomploy domains configuration with automatic HTTPS certificates",
		},
	},
	{
		icon: Shield,
		title: "Give teams more control over access",
		description:
			"Nomploy gives teams built-in role-based access and project organization in the UI, so you can manage services, databases, and infrastructure as you grow across multiple servers—with the right level of oversight for developers seeking control without handing out broad server access. Dokku user access starts at the SSH key level. More granular control for users with specific needs depends on extra plugins or tooling.",
		image: {
			src: "/images/nomploy-users.png",
			alt: "Nomploy team access and role-based permissions dashboard",
		},
	},
];

const integrationRows = [
	{
		category: "Git providers",
		nomploy: "GitHub, GitLab, Bitbucket, Gitea, Git Generic",
		dokku: "Git push via SSH",
	},
	{
		category: "Build and deployment systems",
		nomploy: "Docker, Docker Compose, Nixpacks, Heroku Buildpacks, Paketo Buildpacks, Railpack",
		dokku: "Docker, Heroku Buildpacks (via plugins)",
	},
	{
		category: "Notifications and communication",
		nomploy: "Slack, Mattermost, Telegram, Discord, Lark, Microsoft Teams, Email (SMTP), Resend, Gotify, Ntfy, Pushover, Webhook",
		dokku: "None built-in",
	},
];

function FeatureCell({ value }: { value: FeatureValue }) {
	if (value === true) return <Check className="mx-auto h-5 w-5 text-green-500" />;
	if (value === "limited") return <span className="text-xs text-amber-500">Limited</span>;
	return <X className="mx-auto h-5 w-5 text-muted-foreground/50" />;
}

export default function NomployVsDokkuPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative overflow-hidden border-b border-border/30 bg-black py-20 sm:py-32">
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.1}
					height={40}
					width={40}
					duration={3}
					repeatDelay={1}
					className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
				/>
				<Container className="relative z-10">
					<div className="mx-auto max-w-4xl text-center">
						<h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
							Nomploy vs. Dokku
						</h1>
						<p className="mt-6 text-lg text-muted-foreground">
							Both platforms let you self-host applications on your own server.
							But they take fundamentally different approaches—GUI-first vs.
							CLI-first—and that shapes everything about the experience.
						</p>

						<div className="mt-16 grid gap-8 sm:grid-cols-2">
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Nomploy</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For teams that want a visual, full-featured deployment
									platform with a polished UI, built-in monitoring, database
									management, multi-server support, and team
									collaboration—choose Nomploy.
								</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-card p-6 text-left">
								<h3 className="text-xl font-semibold text-white">Dokku</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									For experienced developers who prefer a CLI-driven,
									Heroku-like PaaS that's minimal and scriptable, with a
									plugin ecosystem for extending functionality—choose Dokku.
									Trade-offs include fewer enterprise features and
									integrations.
								</p>
							</div>
						</div>

						<div className="mt-16">
							<h2 className="text-xl font-semibold text-white sm:text-2xl">
								A Nomploy vs. Dokku comparison for growing teams
							</h2>
							<p className="mt-4 text-muted-foreground">
								Choose Nomploy if you want complete control over your
								infrastructure with a simpler way to manage apps, databases,
								and multiple servers.
							</p>
						</div>

						<Button className="mt-10 rounded-full" asChild>
							<Link
								href="https://docs.nomploy.com/docs/core/installation"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get started with Nomploy
							</Link>
						</Button>
					</div>
				</Container>
			</section>

			{/* Nomploy vs Dokku at a glance */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Nomploy vs. Dokku at a glance
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							Read our comprehensive Nomploy vs. Dokku comparison before you
							make your decision.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Feature</th>
									<th className="px-4 py-4 text-center font-semibold">Nomploy</th>
									<th className="px-4 py-4 text-center font-semibold">Dokku</th>
								</tr>
							</thead>
							<tbody>
								{featureComparisonRows.map((row) => (
									<>
										{row.section && (
											<tr key={`section-${row.section}`} className="border-b border-border bg-muted/20">
												<td
													colSpan={3}
													className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
												>
													{row.section}
												</td>
											</tr>
										)}
										<tr
											key={row.feature}
											className="border-b border-border/50 hover:bg-muted/30"
										>
											<td className="px-4 py-3 text-sm">{row.feature}</td>
											<td className="px-4 py-3 text-center">
												<FeatureCell value={row.nomploy} />
											</td>
											<td className="px-4 py-3 text-center">
												<FeatureCell value={row.dokku} />
											</td>
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Why you should go with Nomploy */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Why you should go with Nomploy
						</h2>
					</div>

					<div className="mx-auto mt-16 max-w-6xl space-y-20">
						{whyChooseItems.map((item, index) => (
							<div
								key={item.title}
								className={`flex flex-col gap-8 md:flex-row md:items-center ${
									index % 2 === 1 ? "md:flex-row-reverse" : ""
								}`}
							>
								<div className="flex-1">
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
										<item.icon className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-semibold text-white">
										{item.title}
									</h3>
									<p className="mt-3 text-muted-foreground">{item.description}</p>
								</div>
								<div className="flex-1">
									<div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
										<Image
											src={item.image.src}
											alt={item.image.alt}
											fill
											className="object-cover object-top"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Nomploy integrates with the leading solutions */}
			<section className="border-b border-border/30 py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-display text-3xl tracking-tight sm:text-4xl">
							Nomploy integrates with the leading solutions
						</h2>
						<p className="mt-4 text-lg text-muted-foreground">
							When it comes to a Nomploy vs. Dokku comparison, you want the
							self-hosted PaaS that syncs with the tools in your
							workflow.
						</p>
					</div>

					<div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-4 text-left font-semibold">Category</th>
									<th className="px-4 py-4 text-left font-semibold">Nomploy</th>
									<th className="px-4 py-4 text-left font-semibold">Dokku</th>
								</tr>
							</thead>
							<tbody>
								{integrationRows.map((row) => (
									<tr
										key={row.category}
										className="border-b border-border/50"
									>
										<td className="px-4 py-3 font-medium">{row.category}</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.nomploy}
										</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{row.dokku}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</section>

			{/* Why Nomploy is perfect for teams */}
			<section className="border-b border-border/30 bg-black py-20 sm:py-32">
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
							Why Nomploy is perfect for teams of any size
						</h2>
						<p className="mt-6 text-lg text-muted-foreground">
							Whether you've outgrown Dokku's CLI-only workflow or you're
							choosing your first self-hosted PaaS, Nomploy gives you the visual
							interface, team features, Docker Compose support, and built-in
							tooling that Dokku relies on plugins and shell scripts for—all in
							one cohesive platform.
						</p>
					</div>
				</Container>
			</section>

			{/* Stats */}


			{/* Final CTA */}
			<CallToAction />
		</div>
	);
}
