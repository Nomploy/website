import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import {
	Github,
	Globe,
	Heart,
	LayoutGrid,
	LogIn,
	MessagesSquare,
	Rss,
	UserPlus,
} from "lucide-react";

export function NavLinks() {
	const links = [
		{
			text: "Login",
			url: "https://app.nomploy.com/",
			icon: LogIn,
		},
		{
			text: "Sign Up",
			url: "https://app.nomploy.com/register",
			icon: UserPlus,
		},
		{
			text: "Website",
			url: "https://nomploy.com",
			icon: Globe,
		},
		{
			text: "Templates",
			url: "https://nomploy.com/templates",
			icon: LayoutGrid,
		},
		{
			text: "Discussions",
			url: "https://github.com/nomploy/nomploy/discussions",
			icon: MessagesSquare,
		},
		{
			text: "Support",
			url: "https://opencollective.com/nomploy",
			icon: Heart,
		},
		{
			text: "Github",
			url: "https://github.com/nomploy/nomploy",
			icon: Github,
		},
		{
			text: "Blog",
			url: "https://nomploy.com/blog",
			icon: Rss,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md p-2 hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
					aria-label="Quick links menu"
				>
					<Menu className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				{links.map((link, index) => {
					const IconComponent = link.icon;
					const showSeparator = index === 3;

					return (
						<div key={link.text}>
							<DropdownMenuItem asChild>
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 cursor-pointer"
								>
									<IconComponent className="size-4 text-fd-muted-foreground" />
									<span>{link.text}</span>
								</a>
							</DropdownMenuItem>
							{showSeparator && <DropdownMenuSeparator />}
						</div>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
