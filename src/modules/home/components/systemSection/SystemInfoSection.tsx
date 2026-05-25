import TheOne from "@/assets/cards-logo/theone.png";
import Ofex from "@/assets/cards-logo/ofex.png";
import Rectangle from "@/assets/cards-logo/rectangle.png";
import "./flipCard.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SystemInfoSection() {
	const { t } = useTranslation();
	// Убираем среднюю карточку (CardFly), оставляем TheOne + Ofex
	const cardsLogos = [TheOne, Ofex];
	const cardsData = (
		t("home.system.cards", { returnObjects: true }) as any[]
	)
		.filter((_, index) => index !== 1)
		.map((card, index) => ({
			...card,
			logo: cardsLogos[index],
		}));

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
				{/* Заголовок */}
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

				{/* Карточки */}
				<div className="system-cards-grid">
					{cardsData.map((card, index) => (
						<div className="system-card-wrapper" key={index}>
							<div className="system-card">
								{/* Front */}
								<div className="system-card-face system-card-front">
									<div className="system-card-header">
										<img
											src={card.logo}
											alt="logo"
											className={
												card.logo === TheOne
													? "system-logo large"
													: "system-logo"
											}
										/>
									</div>
									<div className="system-card-body">
										<p className="system-card-title">{card.title}</p>
										<div className="system-arrow">⟶</div>
									</div>
								</div>

								{/* Back */}
								<div className="system-card-face system-card-back">
									<div className="system-card-header">
										<img
											src={card.logo}
											alt="logo"
											className={
												card.logo === TheOne
													? "system-logo large"
													: "system-logo"
											}
										/>
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
													<span> {item}</span>
												</p>
											))}
										</div>
										<div className="system-arrow">⟶</div>
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