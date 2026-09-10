"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ContactFormModal } from "./ContactFormModal";
import { Container } from "./Container";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";

const GITHUB_URL = "https://github.com/nomploy/nomploy";
const INSTALL_DOCS_URL = "https://docs.nomploy.com/docs/core/installation";

const pricingFaqs = [
	{
		question: "Is Nomploy really free?",
		answer:
			"Yes. Nomploy is open source and free to self-host, with no limits on servers, deployments, applications or databases. You only pay for the infrastructure you choose to run it on.",
	},
	{
		question: "Do I need my own server?",
		answer:
			"Yes. You self-host Nomploy on your own server (e.g. Hetzner, Hostinger, AWS, DigitalOcean) or on-premise. Installation takes a single command — see the installation guide.",
	},
	{
		question: "Is there a limit on the number of deployments?",
		answer:
			"No. You can deploy unlimited applications and databases across as many servers as you like.",
	},
	{
		question: "What's included in the Enterprise plan?",
		answer:
			"Enterprise adds fine-grained RBAC, SSO/SAML (Azure, OKTA, etc.), SCIM user provisioning, audit logs, white labeling, and an MSA/SLA with priority support — all self-hosted on your own infrastructure. Contact us to learn more.",
	},
	{
		question: "What kind of support is available?",
		answer:
			"The open-source version is supported by our community on Discord. Enterprise includes priority support and dedicated services.",
	},
	{
		question: "Do you offer a managed cloud?",
		answer:
			"Not yet — Nomploy is self-hosted for now, but a managed Cloud is on the way: we host the control plane while your apps and data stay on your own servers. Join the waitlist above to hear when it launches; in the meantime you can run Nomploy on any server in minutes.",
	},
];

function SwirlyDoodle(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 281 40"
			preserveAspectRatio="none"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
			/>
		</svg>
	);
}

const selfHostedFeatures = [
	"Unlimited Servers",
	"Unlimited Deployments",
	"Unlimited Applications & Databases",
	"Unlimited Environments",
	"Volume & Database Backups",
	"Scheduled Jobs",
	"Docker Compose & Multi-server",
	"Basic RBAC & 2FA",
	"Community Support (Discord)",
];

const enterpriseFeatures = [
	"Everything in Self-Hosted, plus…",
	"Fine-grained RBAC",
	"SSO / SAML (Azure, OKTA, etc)",
	"SCIM User Provisioning",
	"Audit Logs",
	"White Labeling",
	"MSA / SLA",
	"Priority Support and Services",
];

const cloudFeatures = [
	"We host the control plane for you",
	"Connect your own servers over SSH",
	"Your apps & data stay on your servers",
	"Automatic updates & monitoring",
	"Any provider (AWS, GCP, Hetzner…)",
];

export function Pricing() {
	const [openContactModal, setOpenContactModal] = useState(false);

	return (
		<section
			id="pricing"
			aria-label="Pricing"
			className="relative border-t border-border/30 bg-black py-20 sm:py-32 overflow-hidden"
		>
			<Container className="relative">
				<div className="relative text-center overflow-hidden py-8 -my-8">
					<AnimatedGridPattern
						numSquares={20}
						maxOpacity={0.1}
						height={40}
						width={40}
						duration={3}
						repeatDelay={1}
						className={cn(
							"[mask-image:radial-gradient(600px_circle_at_50%_50%,white,transparent)]",
							"absolute inset-0",
						)}
					/>
					<Link
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Nomploy is open source on GitHub"
						className="relative mb-4 inline-flex"
					>
						<Badge
							variant="secondary"
							className="gap-1.5 border-primary/30 bg-primary/10 px-3 py-1 text-primary transition-colors hover:bg-primary/20"
						>
							<Sparkles className="h-3.5 w-3.5" />
							100% open source · Self-host for free
						</Badge>
					</Link>
					<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
						<span className="relative whitespace-nowrap">
							<SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-muted-foreground" />
							<span className="relative">Free &amp; Open</span>
						</span>{" "}
						Source.
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Self-host Nomploy for free today — managed Cloud is on the way.
					</p>
				</div>

				<div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
					{/* Self-Hosted (Open Source) */}
					<section
						className={clsx(
							"relative flex flex-col rounded-3xl border-2 border-primary/50 bg-black/80 px-6 py-8",
						)}
					>
						<Badge className="absolute -top-2.5 left-6">Most popular</Badge>
						<h3 className="text-lg font-medium text-white">
							Self-Hosted{" "}
							<span className="text-muted-foreground">/ Open Source</span>
						</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							Everything you need to deploy on your own infrastructure
						</p>
						<div className="mt-4">
							<span className="text-3xl font-semibold text-primary">Free</span>
							<span className="ml-2 text-sm text-muted-foreground">
								forever · open source
							</span>
						</div>
						<ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
							{selfHostedFeatures.map((f) => (
								<li key={f} className="flex gap-2">
									<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
									{f}
								</li>
							))}
						</ul>
						<div className="mt-auto pt-6">
							<Link
								href={INSTALL_DOCS_URL}
								target="_blank"
								rel="noopener noreferrer"
								className={buttonVariants({
									variant: "default",
									className: "w-full",
								})}
							>
								Get Started
							</Link>
						</div>
					</section>

					{/* Enterprise */}
					<section
						className={clsx(
							"flex flex-col rounded-3xl border-2 border-dashed border-border/50 bg-black/50 px-6 py-8",
						)}
					>
						<h3 className="text-lg font-medium text-white">Enterprise</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							For organizations that need more control and support
						</p>
						<div className="mt-4">
							<span className="text-3xl font-semibold text-primary">
								Custom
							</span>
							<span className="ml-2 text-sm text-muted-foreground">
								self-hosted · let&apos;s talk
							</span>
						</div>
						<ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
							{enterpriseFeatures.map((f) => (
								<li key={f} className="flex gap-2">
									<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
									{f}
								</li>
							))}
						</ul>
						<div className="mt-auto pt-6">
							<Button
								onClick={() => setOpenContactModal(true)}
								className="w-full"
							>
								Contact Sales
							</Button>
						</div>
					</section>

					{/* Cloud — coming soon */}
					<section
						className={clsx(
							"relative flex flex-col rounded-3xl border-2 border-dashed border-border/40 bg-black/40 px-6 py-8",
						)}
					>
						<Badge
							variant="secondary"
							className="absolute -top-2.5 left-6 border-primary/30 bg-primary/10 text-primary"
						>
							Coming soon
						</Badge>
						<h3 className="text-lg font-medium text-white">Cloud</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							Fully managed — we run Nomploy for you
						</p>
						<div className="mt-4">
							<span className="text-3xl font-semibold text-primary">Soon</span>
							<span className="ml-2 text-sm text-muted-foreground">
								managed · on our roadmap
							</span>
						</div>
						<ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
							{cloudFeatures.map((f) => (
								<li key={f} className="flex gap-2">
									<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
									{f}
								</li>
							))}
						</ul>
						<div className="mt-auto pt-6">
							<Button
								variant="outline"
								onClick={() => setOpenContactModal(true)}
								className="w-full"
							>
								Join the waitlist
							</Button>
						</div>
					</section>
				</div>

				{/* Pricing FAQ */}
				<div className="mx-auto mt-24 max-w-3xl">
					<h3 className="text-center text-2xl font-semibold text-white">
						Frequently asked questions
					</h3>
					<p className="mt-4 text-center text-sm text-muted-foreground">
						Have a different question? Reach out on our community or by email.
					</p>
					<Accordion type="single" collapsible className="mt-8 w-full">
						{pricingFaqs.map((faq, index) => (
							<AccordionItem value={`${index}`} key={index}>
								<AccordionTrigger className="text-left">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</Container>

			<ContactFormModal
				open={openContactModal}
				onOpenChange={setOpenContactModal}
				defaultInquiryType="sales"
			/>
		</section>
	);
}
