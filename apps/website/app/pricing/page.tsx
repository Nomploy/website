import { Pricing } from "@/components/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nomploy Pricing — Free & Open Source",
	description:
		"Nomploy is free and open source to self-host, with no limits on servers or deployments. Enterprise support with SSO, RBAC and SLA when you need it.",
};

export default function PricingPage() {
	return (
		<div className="relative w-full">
			<Pricing />
		</div>
	);
}
