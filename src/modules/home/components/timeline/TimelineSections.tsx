import "./timelineStyle.css";
import { useTranslation } from "react-i18next";
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function TimelineSections() {
	const { t } = useTranslation();

	const timelineItems = t("home.timeline.items", {
		returnObjects: true,
	}) as any[];

	const containerRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const titleAnimatedRef = useRef(false);
	const titleTweenRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		const root = containerRef.current;
		if (!root) return;

		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.8,
		};

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

		root.querySelectorAll(".timeline-step").forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	useLayoutEffect(() => {
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
						clearProps: "transform",
					});

					observer.disconnect();
				}
			},
			{
				root: null,
				threshold: 0.25,
				rootMargin: "0px 0px -25% 0px",
			},
		);

		observer.observe(title);

		return () => {
			observer.disconnect();
			titleTweenRef.current?.kill();
		};
	}, []);

	return (
		<div ref={containerRef} className="timeline-container">
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