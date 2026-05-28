import { useTranslation } from "react-i18next";

type PartnerItem = {
	label: string;
	title: string;
	desc: string;
};

export default function PartnersSection() {
	const { t } = useTranslation();

	const items = t("home.partners.items", {
		returnObjects: true,
	}) as PartnerItem[];

	return (
		<section className="pt-0 md:pt-16 pb-16 md:pb-32 px-6 md:px-10">
			<div className="max-w-screen-xl mx-auto">
				<div className="mb-10 md:mb-14">
					<p className="contact-text-gradient text-sm md:text-base uppercase tracking-[0.18em] mb-4 inline-block">
  						{t("home.partners.label")}
					</p>

					<h2 className="text-white text-3xl md:text-5xl font-light leading-tight mb-4">
						{t("home.partners.title")}
					</h2>

					<p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
						{t("home.partners.subtitle")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
					{items.map((item, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-7 md:px-8 md:py-9 min-h-[220px] transition-all duration-300 hover:border-[#32ffb1]/50 hover:bg-white/[0.06]"
						>
							<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_80%_20%,rgba(50,255,177,0.18),transparent_35%)]" />

							<div className="relative z-10 h-full flex flex-col justify-between">
								<div>
									<p className="text-white/35 text-xs uppercase tracking-[0.22em] mb-8">
										{item.label}
									</p>

									<div className="text-white/80 text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.06em] uppercase leading-none">
										{item.title}
									</div>
								</div>

								<p className="text-white/55 text-sm md:text-base leading-relaxed mt-8 max-w-[90%]">
									{item.desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}