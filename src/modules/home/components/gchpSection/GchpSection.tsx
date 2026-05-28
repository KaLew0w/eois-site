import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

type GchpBenefit = {
	title: string;
	desc: string;
};

export default function GchpSection() {
	const { t } = useTranslation();

	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const titleAnimatedRef = useRef(false);
	const titleTweenRef = useRef<gsap.core.Tween | null>(null);

	const benefits = t("home.gchp.benefits", {
		returnObjects: true,
	}) as GchpBenefit[];

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
			id="gchp"
			className="relative overflow-hidden bg-[#191919] text-white px-6 md:px-10 py-20 md:py-28"
		>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute left-[-180px] top-[220px] h-[520px] w-[520px] rounded-full bg-[#00eefd]/10 blur-[130px]" />
			</div>

			<div className="relative z-10 max-w-screen-xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 mb-12 md:mb-16 items-start">
					<div>
						<h2
							ref={titleRef}
							className="text-white md:text-5xl text-3xl font-light text-center md:text-left"
						>
							{t("home.gchp.title_prefix")}
							<br />
							<span className="contact-text-gradient inline-block">
								{t("home.gchp.title_highlight")}
							</span>
						</h2>
					</div>

					<div className="flex items-start lg:pt-3">
						<p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
							{t("home.gchp.subtitle")}
						</p>
					</div>
				</div>

				<div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] mb-6 md:mb-8">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(50,255,177,0.16),transparent_38%)]" />

					<div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
						<div className="p-7 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
							<div className="flex items-center justify-between mb-10">
								<span className="text-white/35 text-xs uppercase tracking-[0.22em]">
									{t("home.gchp.state.label")}
								</span>

								<span className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-black flex items-center justify-center text-sm">
									01
								</span>
							</div>

							<h3 className="text-3xl md:text-4xl font-light tracking-[-0.04em] mb-5">
								{t("home.gchp.state.title")}
							</h3>

							<p className="text-white/60 text-base md:text-lg leading-relaxed">
								{t("home.gchp.state.desc")}
							</p>
						</div>

						<div className="p-7 md:p-10 lg:p-12">
							<div className="flex items-center justify-between mb-10">
								<span className="text-white/35 text-xs uppercase tracking-[0.22em]">
									{t("home.gchp.private.label")}
								</span>

								<span className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-black flex items-center justify-center text-sm">
									02
								</span>
							</div>

							<h3 className="text-3xl md:text-4xl font-light tracking-[-0.04em] mb-5">
								{t("home.gchp.private.title")}
							</h3>

							<p className="text-white/60 text-base md:text-lg leading-relaxed">
								{t("home.gchp.private.desc")}
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
					{benefits.map((item, index) => (
						<div
							key={index}
							className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 md:p-7 transition-all duration-300 hover:border-[#32ffb1]/50 hover:bg-white/[0.06]"
						>
							<div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_85%_15%,rgba(50,255,177,0.18),transparent_38%)]" />

							<div className="relative z-10 h-full flex flex-col justify-between">
								<div>
									<div className="mb-10 flex items-center justify-between">
										<span className="text-white/35 text-xs uppercase tracking-[0.2em]">
											модель
										</span>

										<span className="text-white/25 text-sm">
											{String(index + 1).padStart(2, "0")}
										</span>
									</div>

									<h3 className="text-2xl font-light leading-tight tracking-[-0.03em] mb-4">
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