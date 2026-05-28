import Rectangle from "@/assets/cards-logo/rectangle.png";
import LogoWhite from "@/assets/images/logo_white.png";
import "./flipCard.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SystemInfoSection() {
	const { t } = useTranslation();

	const cardsData = t("home.system.cards", { returnObjects: true }) as any[];

	const titleRef = useRef<HTMLHeadingElement | null>(null);

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
		<section className="system-section">
			<div className="system-bg"></div>

			<div className="system-container">
				<div className="system-header">
					<h2 ref={titleRef} className="system-title">
						{t("home.system.title")}
					</h2>

					<div className="system-subtitle">
						<p
							dangerouslySetInnerHTML={{
								__html: t("home.system.subtitle_html") as unknown as string,
							}}
						/>
					</div>
				</div>

				<div className="system-cards-grid">
					{cardsData.map((card, index) => (
						<div className="system-card-wrapper" key={index}>
							<div className="system-card">
								<div className="system-card-face system-card-front">
									<div className="system-card-header system-card-header-eois">
										<img src={LogoWhite} alt="ЕОИС" className="system-card-logo" />
										<div className="system-card-step">
											{String(index + 1).padStart(2, "0")}
										</div>
									</div>

									<div className="system-card-body">
										<div>
											<p className="system-card-kicker">этап работы системы</p>
											<p className="system-card-title">{card.title}</p>

											{card.desc && (
												<p className="system-card-desc">{card.desc}</p>
											)}

											<div className="system-front-items">
												{card.items.slice(0, 2).map((item: string, i: number) => (
													<p key={i} className="system-front-item">
														<img
															src={Rectangle}
															alt="•"
															className="system-bullet"
														/>
														<span>{item}</span>
													</p>
												))}
											</div>
										</div>

										<div className="system-card-footer">
											<span className="system-card-more">Подробнее</span>
											<div className="system-arrow">⟶</div>
										</div>
									</div>
								</div>

								<div className="system-card-face system-card-back">
									<div className="system-card-header system-card-header-eois">
										<img src={LogoWhite} alt="ЕОИС" className="system-card-logo" />
										<div className="system-card-step">
											{String(index + 1).padStart(2, "0")}
										</div>
									</div>

									<div className="system-card-body">
										<div className="system-items">
											{card.items.map((item: string, i: number) => (
												<p key={i} className="system-item">
													<img
														src={Rectangle}
														alt="•"
														className="system-bullet"
													/>
													<span>{item}</span>
												</p>
											))}
										</div>

										<div className="system-card-footer">
											<span className="system-card-more">Назад</span>
											<div className="system-arrow">⟶</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}