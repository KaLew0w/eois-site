import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

type SecurityItem = {
	label: string;
	title: string;
	desc: string;
};

type SecurityPoint = {
	title: string;
	desc: string;
};

export default function SecuritySection() {
	const { t } = useTranslation();

	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const titleAnimatedRef = useRef(false);
	const titleTweenRef = useRef<gsap.core.Tween | null>(null);

	const items = t("home.security.items", {
		returnObjects: true,
	}) as SecurityItem[];

	const points = t("home.security.main.points", {
		returnObjects: true,
	}) as SecurityPoint[];

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
			id="security"
			className="relative overflow-hidden bg-[#191919] text-white px-6 md:px-10 py-20 md:py-28"
		>


			<div className="relative z-10 max-w-screen-xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 mb-12 md:mb-16 items-start">
					<div>
						<h2
							ref={titleRef}
							className="text-white md:text-5xl text-3xl font-light text-center md:text-left"
						>
							{t("home.security.title_prefix")}
							<br />
							<span className="contact-text-gradient inline-block">
								{t("home.security.title_highlight")}
							</span>
						</h2>
					</div>

					<div className="flex items-start lg:pt-3">
						<p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
							{t("home.security.subtitle")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 md:gap-6 items-stretch">
					{/* Большая левая карточка */}
					<div className="relative overflow-hidden rounded-[32px] bg-[#ECECEC] text-[#1A1A1A] p-7 md:p-9 min-h-[560px] lg:h-full border border-white/30 shadow-[0_14px_45px_rgba(0,0,0,0.18)]">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_95%_95%,rgba(50,255,177,0.42),transparent_28%)]" />

						<div className="relative z-10 h-full flex flex-col justify-between">
							<div>
								<div className="mb-14 flex items-center justify-between gap-4">
									<span className="text-black/35 text-xs uppercase tracking-[0.24em]">
										{t("home.security.main.label")}
									</span>

									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-sm font-medium text-black">
										01
									</span>
								</div>

								<h3 className="text-[34px] md:text-[42px] font-light tracking-[-0.05em] leading-[1.08] mb-6">
									{t("home.security.main.title")}
								</h3>

								<p className="text-black/65 text-base md:text-lg leading-relaxed max-w-xl">
									{t("home.security.main.desc")}
								</p>
							</div>

							<div className="mt-12 space-y-4">
								{points.map((point, index) => (
									<div
										key={index}
										className="rounded-2xl border border-black/5 bg-white/65 px-4 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
									>
										<p className="text-black text-base font-medium mb-1">
											{point.title}
										</p>
										<p className="text-black/55 text-sm leading-relaxed">
											{point.desc}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Правая сетка */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
						{items.map((item, index) => {
							const number = String(index + 2).padStart(2, "0");
							const isLast = index === items.length - 1;

							return (
								<div
									key={index}
									className={`group relative overflow-hidden rounded-[28px] bg-[#ECECEC] text-[#1A1A1A] p-6 md:p-7 border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] ${isLast ? "md:col-span-2 min-h-[190px]" : "min-h-[230px]"
										}`}
								>
									<div className="absolute inset-0 bg-[radial-gradient(circle_at_95%_92%,rgba(50,255,177,0.38),transparent_26%)]" />

									<div className="relative z-10 h-full flex flex-col justify-between">
										<div>
											<div className="mb-10 flex items-start justify-between gap-4">
												<span className="text-black/35 text-xs uppercase tracking-[0.22em]">
													{item.label}
												</span>

												<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00eefd] to-[#32ffb1] text-sm font-medium text-black">
													{number}
												</span>
											</div>

											<h3 className="text-[28px] md:text-[32px] font-light leading-[1.08] tracking-[-0.045em] mb-5">
												{item.title}
											</h3>

											<p
												className={`text-black/65 text-sm md:text-base leading-relaxed ${isLast ? "max-w-3xl" : ""
													}`}
											>
												{item.desc}
											</p>
										</div>

										<div className="mt-8 h-px w-full bg-gradient-to-r from-[#00eefd]/0 via-[#32ffb1]/55 to-[#00eefd]/0 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}