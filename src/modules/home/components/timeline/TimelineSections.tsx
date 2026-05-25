import "./timelineStyle.css";
import { useTranslation } from "react-i18next";
import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSections() {
	const { t } = useTranslation();
	const timelineItems = t("home.timeline.items", {
		returnObjects: true,
	}) as any[];

	useEffect(() => {
		const options = { root: null, rootMargin: "0px", threshold: 0.8 };
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry, index) => {
				const dot = entry.target.querySelector("[data-dot]");
				if (!dot) return;

				if (entry.isIntersecting) {
					setTimeout(() => {
						dot.classList.add("active");
					}, index * 150);
				} else {
					dot.classList.remove("active");
				}
			});
		}, options);

		document.querySelectorAll(".timeline-step").forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

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
		<div className="timeline-container">
			<div className="timeline-header">
				<h2 ref={titleRef} className="timeline-title">
					{t("home.timeline.title_prefix")} <br />
					<span>
						{t("home.timeline.title_highlight")
							.split("\n")
							.map((line, idx) => (
								<Fragment key={idx}>
									{line}
									{idx === 0 ? <br /> : null}
								</Fragment>
							))}
					</span>
				</h2>
			</div>

			<div className="timeline-items">
				<div className="timeline-line"></div>
				<div className="timeline-list">
					{timelineItems.map((item: any, i: number) => (
						<div className="timeline-step" key={i}>
							<div className="timeline-dot" data-dot></div>
							<div className="timeline-card">
								<div className="timeline-year">
									{item.year}{" "}
									<span className="timeline-month">{item.month}</span>
								</div>
								<p>{item.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
