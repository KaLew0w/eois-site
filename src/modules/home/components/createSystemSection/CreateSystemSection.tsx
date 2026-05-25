import Landing from "@/assets/features/Landing.png";
import LongRightArrow from "@/assets/images/long-right-arrow.png";
import Shield from "@/assets/features/shield.png";
import Bitcoin from "@/assets/features/Bitcoin.png";
import { useEffect, useRef } from "react";
import "./createSystemSectionStyle.css";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CreateSystemSection() {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const { t } = useTranslation();
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

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;

		const handleMouseDown = (e: MouseEvent) => {
			isDown = true;
			scrollContainer.classList.add("scrolling");
			scrollContainer.style.userSelect = "none"; // 🚀 запрет выделения текста
			startX = e.pageX;
			scrollLeft = scrollContainer.scrollLeft;
		};

		const handleMouseUp = () => {
			isDown = false;
			scrollContainer.classList.remove("scrolling");
			scrollContainer.style.userSelect = ""; // вернуть выделение
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX;
			const walk = (x - startX) * 1.5; // 🚀 multiplier для отзывчивости
			scrollContainer.scrollLeft = scrollLeft - walk;
		};

		scrollContainer.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp); // 🚀 слушаем глобально
		window.addEventListener("mousemove", handleMouseMove); // 🚀 глобальный drag

		return () => {
			scrollContainer.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<section className="features-section px-6 md:px-10 py-24">
			<div className="max-w-screen-xl mx-auto relative">
				{/* <!-- Заголовок --> */}
				<h2
					ref={titleRef}
					className="text-white md:text-5xl text-3xl font-light mb-6 md:mb-12 text-center md:text-left"
				>
					{t("home.features.title")}
					<span className="text-[#00F0D4]">
						{t("home.features.title_highlight")}
						<br className="hidden md:block" />
						{t("home.features.title_highlight2")}
					</span>
				</h2>

				{/* <!-- Мобильный подзаголовок (раньше был в первой карточке) --> */}
				<p className="text-sm text-white/80 text-center md:hidden mb-6">
					{t("home.features.intro")}
				</p>

				{/* <!-- Горизонтальный скролл --> */}
				<div className="relative">
					{/* <!-- Fade эффект (только десктоп) --> */}
					<div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 z-10 fade-right hidden md:block"></div>

					{/* <!-- Содержимое скролла --> */}
					<div
						ref={scrollRef}
						className="scroll-container scroll-hidden overflow-x-auto h-fit cursor-grab relative z-0 pr-6"
					>
						<div className="flex gap-6 items-stretch w-max">
							{/* <!-- Инфо-карточка (только десктоп) --> */}
							<div className="bg-[#191919] text-white min-w-[400px] max-w-[400px] p-4 pl-0 rounded-2xl flex-col justify-between hidden md:flex">
								<p className="text-sm md:text-base leading-relaxed">
									{t("home.features.intro")}
								</p>
								<div className="flex items-center gap-2 text-white font-normal pr-4 mt-4">
									<span>{t("home.features.scroll_hint")}</span>
									<img
										alt="→"
										className="h-8 w-auto"
										draggable="false"
										src={LongRightArrow}
									/>
								</div>
							</div>

							{/* <!-- Карточка 1 --> */}
							<div className="min-w-[420px] max-w-[420px] p-6 rounded-2xl relative overflow-visible bg-white bg-[radial-gradient(circle_at_100%_100%,#32FFB1_0%,#ffffff_25%)]">
								<div className="relative z-10 w-1/2">
									<h3 className="text-black font-light text-2xl mb-2">
										{t("home.features.license_title")}
									</h3>
									<p className="text-black text-sm leading-relaxed">
										{t("home.features.license_desc")}
									</p>
								</div>
								<div className="absolute bottom-0 right-[10px] z-0">
									<img
										alt="Shield"
										className="w-44 h-44 object-contain select-none pointer-events-none"
										src={Shield}
									/>
								</div>
							</div>

							{/* <!-- Карточка 2 --> */}
							<div className="min-w-[420px] max-w-[420px] p-6 rounded-2xl relative overflow-visible bg-white bg-[radial-gradient(circle_at_100%_100%,#32FFB1_0%,#ffffff_25%)]">
								<div className="relative z-10 w-1/2">
									<h3 className="text-black font-light text-2xl mb-2">
										{t("home.features.multicurrency_title")}
									</h3>
									<p className="text-black text-sm leading-relaxed">
										{t("home.features.multicurrency_desc")}
									</p>
								</div>
								<div className="absolute bottom-0 right-[10px] z-0">
									<img
										alt="Bitcoin"
										className="w-44 h-44 object-contain select-none pointer-events-none"
										src={Bitcoin}
									/>
								</div>
							</div>

							{/* <!-- Карточка 3 --> */}
							<div className="min-w-[420px] max-w-[420px] p-6 rounded-2xl relative overflow-visible bg-white bg-[radial-gradient(circle_at_100%_100%,#32FFB1_0%,#ffffff_25%)]">
								<div className="relative z-10 w-1/2">
									<h3 className="text-black font-light text-2xl mb-2">
										{t("home.features.unified_title")}
									</h3>
									<p className="text-black text-sm leading-relaxed">
										{t("home.features.unified_desc")}
									</p>
								</div>
								<div className="absolute bottom-0 right-[10px] z-0">
									<img
										alt="Landing"
										className="w-44 h-44 object-contain select-none pointer-events-none"
										src={Landing}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- Стрелка под карточками (мобильная) --> */}
				<div className="flex items-center gap-2 text-white font-normal mt-6 md:hidden">
					<span>{t("home.features.scroll_hint")}</span>
					<img
						alt="→"
						className="h-8 w-auto"
						draggable="false"
						src={LongRightArrow}
					/>
				</div>
			</div>
		</section>
	);
}
