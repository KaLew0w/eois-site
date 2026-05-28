import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FAQItem = {
	tag: string;
	question: string;
	answer: string;
};

export default function FAQSection() {
	const { t } = useTranslation();
	const [openIndex, setOpenIndex] = useState<number | null>(0);
	const titleRef = useRef<HTMLHeadingElement | null>(null);

	const items = t("home.faq.items", {
		returnObjects: true,
	}) as FAQItem[];

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
			id="faq"
			className="relative overflow-hidden bg-[#191919] text-white px-6 md:px-10 py-20 md:py-28"
		>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute left-1/2 top-[320px] h-[560px] w-[720px] -translate-x-1/2 rounded-full bg-[#32ffb1]/10 blur-[140px]" />
				<div className="absolute right-[-180px] bottom-[-160px] h-[480px] w-[480px] rounded-full bg-[#00eefd]/8 blur-[130px]" />
			</div>

			<div className="relative z-10 max-w-screen-xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 mb-12 md:mb-16 items-start">
					<div>
						<h2
	ref={titleRef}
	className="text-white md:text-5xl text-3xl font-light mb-6 md:mb-12 text-center md:text-left"
>
							{t("home.faq.title_prefix")}
							<br />
							<span className="contact-text-gradient inline-block">
								{t("home.faq.title_highlight")}
							</span>
						</h2>
					</div>

					<div className="flex items-start lg:pt-3">
						<p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
							{t("home.faq.subtitle")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-5 md:gap-6">
					<div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-7 md:p-9 min-h-[420px]">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(50,255,177,0.18),transparent_38%)]" />

						<div className="relative z-10 h-full flex flex-col justify-between">
							<div>
								<span className="text-white/35 text-xs uppercase tracking-[0.22em]">
									{t("home.faq.info.label")}
								</span>

								<h3 className="text-3xl md:text-4xl font-light tracking-[-0.04em] leading-tight mt-10 mb-5">
									{t("home.faq.info.title")}
								</h3>

								<p className="text-white/60 text-base md:text-lg leading-relaxed">
									{t("home.faq.info.desc")}
								</p>
							</div>

							<div className="mt-12 grid grid-cols-1 gap-3">
								{(t("home.faq.info.points", {
									returnObjects: true,
								}) as string[]).map((point, index) => (
									<div
										key={index}
										className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/65 text-sm"
									>
										{point}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="space-y-3">
						{items.map((item, index) => {
							const isOpen = openIndex === index;

							return (
								<div
									key={index}
									className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
										isOpen
											? "border-[#32ffb1]/45 bg-white/[0.06]"
											: "border-white/10 bg-white/[0.035] hover:border-white/20"
									}`}
								>
									<button
										type="button"
										aria-expanded={isOpen}
										onClick={() => setOpenIndex(isOpen ? null : index)}
										className="w-full text-left px-6 md:px-7 py-5 md:py-6"
									>
										<div className="flex items-start justify-between gap-5">
											<div>
												<div className="mb-4 flex items-center gap-3">
													<span className="text-white/35 text-xs uppercase tracking-[0.2em]">
														{item.tag}
													</span>

													<span className="text-white/20 text-xs">
														{String(index + 1).padStart(2, "0")}
													</span>
												</div>

												<h3 className="text-xl md:text-2xl font-light leading-tight tracking-[-0.03em]">
													{item.question}
												</h3>
											</div>

											<span
												className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black transition-transform duration-300 bg-gradient-to-r from-[#00eefd] to-[#32ffb1] ${
													isOpen ? "rotate-45" : ""
												}`}
											>
												+
											</span>
										</div>
									</button>

									{isOpen && (
										<div className="px-6 md:px-7 pb-6 md:pb-7">
											<div className="h-px w-full bg-gradient-to-r from-[#00eefd]/0 via-[#32ffb1]/45 to-[#00eefd]/0 opacity-50 mb-5" />

											<p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">
												{item.answer}
											</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}