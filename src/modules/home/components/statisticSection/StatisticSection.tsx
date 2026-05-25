import { Row, Col, Typography, Statistic } from "antd";
import CountUp from "react-countup";
import "./statisticStyle.css";
import type { StatisticProps } from "antd";
import { useInView } from "react-intersection-observer";
import Title from "antd/es/typography/Title";
import TimelineSections from "../timeline/TimelineSections";
import Earth from "@/assets/images/earth.png";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const formatter: StatisticProps["formatter"] = (value) => (
	<CountUp
		end={value as number}
		separator="."
		decimals={Number.isInteger(value) ? 0 : 1} // ← количество знаков после запятой
		decimal="." // ← символ разделителя (по умолчанию ".")
	/>
);

const { Paragraph } = Typography;
gsap.registerPlugin(ScrollTrigger);

export default function StatisticSection() {
	const { t } = useTranslation();
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const titleRef2 = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		if (titleRef.current) {
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
		}

		if (titleRef2.current) {
			gsap.fromTo(
				titleRef2.current,
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
						trigger: titleRef2.current, // ← тут должно быть titleRef2
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);
		}
	}, []);

	const items = [
		{
			value: 150,
			suffix: "+",
			description: t("home.statistics.items.0.desc"),
		},
		{
			value: t("home.statistics.country"),
			suffix: "",
			description: t("home.statistics.items.1.desc"),
		},
		{
			value: 10,
			suffix: "",
			description: t("home.statistics.items.2.desc"),
		},
		{
			value: 99.8,
			suffix: "%",
			description: t("home.statistics.items.3.desc"),
		},
		{
			value: 100,
			suffix: "%",
			description: t("home.statistics.items.4.desc"),
		},
	];

	const itemsCard = [
		{
			title: t("home.statistics.cards.0.title"),
			desc: t("home.statistics.cards.0.desc"),
		},
		{
			title: t("home.statistics.cards.1.title"),
			desc: t("home.statistics.cards.1.desc"),
		},
		{
			title: t("home.statistics.cards.2.title"),
			desc: t("home.statistics.cards.2.desc"),
		},
		{
			title: t("home.statistics.cards.3.title"),
			desc: t("home.statistics.cards.3.desc"),
		},
		{
			title: t("home.statistics.cards.4.title"),
			desc: t("home.statistics.cards.4.desc"),
		},
		{
			title: t("home.statistics.cards.5.title"),
			desc: t("home.statistics.cards.5.desc"),
		},
	];

	const { ref, inView } = useInView({
		triggerOnce: false, // анимация запускается
		threshold: 0.2, // сработает, когда 20% блока видно
	});

	return (
		<section className="financial-section">
			<div className="container">
				<img src={Earth} alt="earth" className="earth-image" />
				<div>
					<h2
						ref={titleRef}
						className="statistic-title text-3xl md:text-5xl font-light leading-snug mb-16"
					>
						{t("home.statistics.title_prefix")}{" "}
						<span className="text-[#00F0D4]">
							{t("home.statistics.title_highlight")}
							<br />
							{t("home.statistics.title_highlight2")}
						</span>
					</h2>

					<div style={{ paddingBottom: "6rem" }} ref={ref}>
						<Row
							justify="space-between"
							style={{ textAlign: "start", color: "white" }}
						>
							{items.map((item, index) => (
								<Col
								className={`item-statistic ${index === 0 ? "first" : ""}`}
									key={index}
									xs={24} // ≤576px → 2 колонки
									sm={12} // ≥576px → 2 колонки
									md={4} // ≥768px → ~5 колонок (4/24 ширины = 1/6, близко к 5 колонкам)
								>
									{typeof item.value === "string" ? (
										<Title
											style={{
												fontSize: "1.875rem",
												marginBottom: "0.25rem",
												color: "#00F0D4",
												lineHeight: "2.25rem",
												fontWeight: "500",
											}}
										>
											{item.value}
										</Title>
									) : (
										<Statistic
											formatter={formatter}
											value={inView ? item.value : 0}
											suffix={item.suffix}
											valueStyle={{
												color: "#00F0D4",
												fontSize: "1.875rem",
												fontWeight: 500,
												lineHeight: "2.25rem",
												// fontWeight: "500"
											}}
										/>
									)}
									<Paragraph
										style={{ fontSize: "1.25rem", margin: 0, color: "white" }}
									>
										{item.description}
									</Paragraph>
								</Col>
							))}
						</Row>
					</div>

					{/* Второй заголовок */}
					<div className="relative z-10 pt-16">
						<h2
							ref={titleRef2}
							className="statistic-title text-3xl md:text-5xl font-light leading-snug mb-16"
						>
							{t("home.statistics.title_secondary_prefix")} <br />
							<span className="text-[#00F0D4]">
								{t("home.statistics.title_secondary_highlight")}
							</span>
						</h2>
					</div>

					{/* Карточки */}
					<div className="cards-grid">
						{itemsCard.map((item, index) => (
							<div key={index} className="card-financial">
								<h3>{item.title}</h3>
								<p>{item.desc}</p>
							</div>
						))}
					</div>
					<TimelineSections />
				</div>
			</div>
		</section>
	);
}
