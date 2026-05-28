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

const formatter: StatisticProps["formatter"] = (value) => {
	const numericValue = typeof value === "number" ? value : Number(value);

	return (
		<CountUp
			end={numericValue}
			separator="."
			decimals={Number.isInteger(numericValue) ? 0 : 1}
			decimal="."
		/>
	);
};

const { Paragraph } = Typography;

gsap.registerPlugin(ScrollTrigger);

export default function StatisticSection() {
	const { t } = useTranslation();

	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const titleRef2 = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
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
							trigger: titleRef2.current,
							start: "top 80%",
							toggleActions: "play none none none",
						},
					},
				);
			}
		});

		return () => ctx.revert();
	}, []);

	const items = [
		{
			value: 1,
			suffix: "",
			description: t("home.statistics.items.0.desc"),
		},
		{
			value: 6,
			suffix: "",
			description: t("home.statistics.items.1.desc"),
		},
		{
			value: 5,
			suffix: "",
			description: t("home.statistics.items.2.desc"),
		},
		{
			value: "API",
			suffix: "",
			description: t("home.statistics.items.3.desc"),
		},
		{
			value: "ГЧП",
			suffix: "",
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
		triggerOnce: false,
		threshold: 0.2,
	});

	return (
		<section className="financial-section" id="capabilities">
			<div className="container">
				<img src={Earth} alt="EOIS digital infrastructure" className="earth-image" />

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
									xs={24}
									sm={12}
									md={4}
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
											}}
										/>
									)}

									<Paragraph
										style={{
											fontSize: "1.25rem",
											margin: 0,
											color: "white",
										}}
									>
										{item.description}
									</Paragraph>
								</Col>
							))}
						</Row>
					</div>

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