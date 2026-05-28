import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

type DocumentItem = {
	label: string;
	title: string;
	desc: string;
	status: string;
	action: string;
	href: string;
};

export default function DocumentsSection() {
	const { t } = useTranslation();
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const titleAnimatedRef = useRef(false);
	const titleTweenRef = useRef<gsap.core.Tween | null>(null);

	const items = t("home.documents.items", {
		returnObjects: true,
	}) as DocumentItem[];

	useEffect(() => {
		const title = titleRef.current;
		if (!title) return;

		gsap.set(title, {
			rotateX: 90,
			scale: 0.7,
			autoAlpha: 0,
			transformPerspective: 1000,
			transformOrigin: "50% 50%",
		});

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting && !titleAnimatedRef.current) {
					titleAnimatedRef.current = true;

					titleTweenRef.current = gsap.to(title, {
						rotateX: 0,
						scale: 1,
						autoAlpha: 1,
						duration: 1.2,
						ease: "power3.out",
						clearProps: "transform,visibility",
					});

					observer.disconnect();
				}
			},
			{
				root: null,
				threshold: 0.2,
				rootMargin: "0px 0px -20% 0px",
			},
		);

		observer.observe(title);

		return () => {
			observer.disconnect();
			titleTweenRef.current?.kill();
		};
	}, []);

	return (
		<section
			id="documents"
			className="relative overflow-hidden bg-[#191919] text-white px-6 md:px-10 py-20 md:py-28"
		>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute left-1/2 top-[280px] h-[560px] w-[720px] -translate-x-1/2 rounded-full bg-[#32ffb1]/10 blur-[140px]" />
				<div className="absolute right-[-180px] bottom-[-160px] h-[480px] w-[480px] rounded-full bg-[#00eefd]/8 blur-[130px]" />
			</div>

			<div className="relative z-10 max-w-screen-xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 mb-12 md:mb-16 items-start">
					<div>
						<h2
							ref={titleRef}
							className="text-white md:text-5xl text-3xl font-light text-center md:text-left"
						>
							{t("home.documents.title_prefix")}
							<br />
							<span className="contact-text-gradient inline-block">
								{t("home.documents.title_highlight")}
							</span>
						</h2>
					</div>

					<div className="flex items-start lg:pt-3">
						<p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
							{t("home.documents.subtitle")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 md:gap-6">
					{items.map((item, index) => (
						<a
							key={index}
							href={item.href || "#"}
							className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 md:p-7 transition-all duration-300 hover:border-[#32ffb1]/50 hover:bg-white/[0.06] ${
								index === 0 ? "lg:row-span-2 min-h-[420px]" : "min-h-[210px]"
							}`}
						>
							<div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_85%_15%,rgba(50,255,177,0.18),transparent_38%)]" />

							<div className="relative z-10 h-full flex flex-col justify-between">
								<div>
									<div className="mb-10 flex items-center justify-between gap-4">
										<span className="text-white/35 text-xs uppercase tracking-[0.2em]">
											{item.label}
										</span>

										<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-sm font-medium text-black">
											{String(index + 1).padStart(2, "0")}
										</span>
									</div>

									<h3
										className={`font-light leading-tight tracking-[-0.04em] mb-5 ${
											index === 0
												? "text-3xl md:text-5xl"
												: "text-2xl md:text-[28px]"
										}`}
									>
										{item.title}
									</h3>

									<p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">
										{item.desc}
									</p>
								</div>

								<div className="mt-10 flex items-center justify-between gap-4">
									<span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-white/45 text-xs uppercase tracking-[0.16em]">
										{item.status}
									</span>

									<span className="flex items-center gap-3 text-white/70 text-sm transition-colors duration-300 group-hover:text-[#32ffb1]">
										{item.action}
										<span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-black">
											→
										</span>
									</span>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}