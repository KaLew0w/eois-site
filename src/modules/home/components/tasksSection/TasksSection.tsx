import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TaskItem = {
	title: string;
	desc: string;
	tag: string;
};

export default function TasksSection() {
	const { t } = useTranslation();

	const titleRef = useRef<HTMLHeadingElement | null>(null);

	const items = t("home.tasks.items", {
		returnObjects: true,
	}) as TaskItem[];

	useEffect(() => {
		if (!titleRef.current) return;

		gsap.fromTo(
			titleRef.current,
			{
				rotateX: 90,
				scale: 0.7,
				opacity: 0,
				transformPerspective: 1000,
			},
			{
				rotateX: 0,
				scale: 1,
				opacity: 1,
				duration: 1.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			},
		);
	}, []);

	return (
		<section
			id="tasks"
			className="relative overflow-hidden bg-[#191919] text-white px-6 md:px-10 py-20 md:py-28"
		>
			{/* Background glow */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute left-1/2 top-[260px] h-[520px] w-[620px] -translate-x-1/2 rounded-full bg-[#32ffb1]/10 blur-[130px]" />

				<div className="absolute right-[-160px] top-[520px] h-[420px] w-[420px] rounded-full bg-[#00eefd]/8 blur-[120px]" />
			</div>

			<div className="relative z-10 max-w-screen-xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 mb-12 md:mb-16">
					<div>
						<h2
							ref={titleRef}
							className="text-white md:text-5xl text-3xl font-light mb-6 md:mb-12 text-center md:text-left"
						>
							{t("home.tasks.title_prefix")}
							<br />
							<span className="contact-text-gradient inline-block">
								{t("home.tasks.title_highlight")}
							</span>
						</h2>
					</div>

					<div className="flex items-start lg:pt-3">
						<p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
							{t("home.tasks.subtitle")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
					{items.map((item, index) => (
						<div
							key={index}
							className="group relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 md:p-7 transition-all duration-300 hover:border-[#32ffb1]/50 hover:bg-white/[0.06]"
						>
							<div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_85%_15%,rgba(50,255,177,0.18),transparent_38%)]" />

							<div className="relative z-10 flex h-full flex-col justify-between">
								<div>
									<div className="mb-10 flex items-center justify-between gap-4">
										<span className="text-white/35 text-xs uppercase tracking-[0.2em]">
											{item.tag}
										</span>

										<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-sm font-medium text-black">
											{String(index + 1).padStart(2, "0")}
										</span>
									</div>

									<h3 className="text-2xl md:text-[28px] font-light leading-tight tracking-[-0.03em] mb-4">
										{item.title}
									</h3>

									<p className="text-white/60 text-sm md:text-base leading-relaxed">
										{item.desc}
									</p>
								</div>

								<div className="mt-8 h-px w-full bg-gradient-to-r from-[#00eefd]/0 via-[#32ffb1]/45 to-[#00eefd]/0 opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}