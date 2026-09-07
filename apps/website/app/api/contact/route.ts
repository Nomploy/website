import { notifySlack } from "@/lib/slack";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const FREE_EMAIL_DOMAINS: Set<string> = new Set(require("free-email-domains"));

interface ContactFormData {
	inquiryType: "support" | "sales";
	teamSize?: string;
	serverCount?: string;
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	message: string;
}

export async function POST(request: NextRequest) {
	try {
		const body: ContactFormData = await request.json();

		// Validate required fields
		if (
			!body.inquiryType ||
			!body.firstName ||
			!body.lastName ||
			!body.email ||
			!body.company ||
			!body.message
		) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 },
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(body.email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			);
		}

		// Reject free email providers for sales inquiries
		if (body.inquiryType === "sales") {
			const domain = body.email.split("@")[1]?.toLowerCase();
			if (domain && FREE_EMAIL_DOMAINS.has(domain)) {
				return NextResponse.json(
					{ error: "Please use your work email address to contact sales" },
					{ status: 400 },
				);
			}
		}

		// Notify the team on Slack (sales and support go to the same channel)
		const slackSuccess = await notifySlack(body);
		if (!slackSuccess) {
			console.error(
				`Failed to deliver ${body.inquiryType} inquiry to Slack`,
			);
			return NextResponse.json(
				{
					error:
						"Unable to submit your message right now. Please try again later.",
				},
				{ status: 502 },
			);
		}

		console.log(`Sent ${body.inquiryType} inquiry to Slack`);
		return NextResponse.json(
			{ message: "Contact form submitted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error processing contact form:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
