export function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			className="h-10 w-10"
			{...props}
		>
			<title>Nomploy</title>
			<defs>
				<linearGradient
					id="nomploy-logo-gradient"
					x1="40"
					y1="24"
					x2="472"
					y2="488"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#2DD4BF" />
					<stop offset="0.55" stopColor="#14B8A6" />
					<stop offset="1" stopColor="#0EA5E9" />
				</linearGradient>
			</defs>
			<rect width="512" height="512" rx="116" fill="url(#nomploy-logo-gradient)" />
			<path
				fill="#ffffff"
				d="M140 140 H196 V372 H140 Z M316 140 H372 V372 H316 Z M140 140 H240 L372 372 H272 Z"
			/>
		</svg>
	);
}
