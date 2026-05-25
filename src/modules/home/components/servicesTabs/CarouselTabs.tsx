import { useEffect, useRef } from "react";
import Image3 from "@/assets/images/image3.png";
import Image3mob from "@/assets/images/image3-mob.png";
import Image4 from "@/assets/images/image4.png";
import Image4mob from "@/assets/images/image4-mob.png";
import Image5 from "@/assets/images/image5.png";
import Image5mob from "@/assets/images/image5-mob.png";
import "./carouselTabsStyle.css";
import LongRightArrow from "@/assets/images/long-right-arrow.png";
import { useTranslation } from "react-i18next";

interface SlideItem {
	title: string;
	desc: string;
	title2?: string | null;
	desc2?: string | null;
}

interface CarouselProps {
	items: SlideItem[];
}

const images = [
	{ desktop: Image3, mobile: Image3mob },
	{ desktop: Image4, mobile: Image4mob },
	{ desktop: Image5, mobile: Image5mob },
];

export default function CarouselTabs({ items }: CarouselProps) {
	const { t } = useTranslation();
	const scrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;

		const handleMouseDown = (e: MouseEvent) => {
			isDown = true;
			scrollContainer.classList.add("scrolling");
			scrollContainer.style.userSelect = "none"; //  запрет выделения текста
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
			const walk = (x - startX) * 1.5; //  multiplier для отзывчивости
			scrollContainer.scrollLeft = scrollLeft - walk;
		};

		scrollContainer.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp); //  слушаем глобально
		window.addEventListener("mousemove", handleMouseMove); //  глобальный drag

		return () => {
			scrollContainer.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className="carousel-wrapper">
			{/* <!-- Заголовок и стрелка --> */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl md:text-4xl font-light">
					{t("home.services.title_slides")}
				</h2>
				<div className="hidden md:flex items-center gap-2 text-white font-normal pr-4">
					<span>{t("home.features.scroll_hint")}</span>
					<img
						alt="→"
						className="h-14 w-auto"
						draggable="false"
						src={LongRightArrow}
					/>
				</div>
			</div>

			<section className="bg-[#191919] text-white relative">
				<div className="max-w-screen-xl mx-auto relative">
					{/* Fade справа */}
					<div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 z-10 fade-right hidden md:block"></div>

					{/* Карусель */}
					<div
						ref={scrollRef}
						className="carousel-container scroll-hidden flex gap-8 overflow-x-auto cursor-grab"
					>
						{items.map((slide, index) => (
							<div
								key={index}
								className="min-w-full md:min-w-[700px] shrink-0 flex flex-col md:flex-row gap-6"
							>
								{/* Картинка */}
								<div className="w-full max-w-[360px] md:w-[300px] order-2 md:order-1">
									<img
										src={images[index % images.length].mobile}
										alt="..."
										className="block md:hidden w-full max-h-[200px] object-cover rounded-2xl"
									/>
									<img
										src={images[index % images.length].desktop}
										alt="..."
										className="hidden md:block w-full h-[420px] object-cover rounded-2xl"
									/>
								</div>

								{/* Тексты */}
								<div className="flex flex-col gap-4 w-[360px] min-h-[420px] md:h-[420px] order-1 md:order-2">
									{/* Первая карточка */}
									<div className="border border-white/20 rounded-2xl p-4 md:p-5 flex flex-col justify-between flex-1">
										<div>
											<h3 className="text-base md:text-lg font-semibold mb-2">
												{slide.title}
											</h3>
											<p className="text-white/80 text-sm">{slide.desc}</p>
										</div>
										<div className="flex justify-end mt-4">
											<div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-r from-[#32FFB1] to-[#00F0D4] flex items-center justify-center text-black text-sm">
												⟶
											</div>
										</div>
									</div>

									{/* Вторая карточка (если есть) */}
									{slide.title2 && slide.desc2 && (
										<div className="border border-white/20 rounded-2xl p-4 md:p-5 flex flex-col justify-between flex-1">
											<div>
												<h3 className="text-base md:text-lg font-semibold mb-2">
													{slide.title2}
												</h3>
												<p className="text-white/80 text-sm">{slide.desc2}</p>
											</div>
											<div className="flex justify-end mt-4">
												<div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-r from-[#32FFB1] to-[#00F0D4] flex items-center justify-center text-black text-sm">
													⟶
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						))}

						{/* Заглушка справа */}
						<div className="hidden md:block min-w-[20px] h-full md:h-[420px] bg-white opacity-50 rounded-full shrink-0"></div>
					</div>

					{/* Стрелка снизу (мобилка) */}
					<div className="mt-8 md:hidden flex items-center gap-2 text-white font-normal">
						<span>{t("home.features.scroll_hint")}</span>
						<img
							alt="→"
							className="h-8 w-auto"
							draggable="false"
							src={LongRightArrow}
						/>
					</div>
				</div>

				{/* <!-- Фоновый градиент --> */}
				<div className="hidden md:block absolute top-[530px] left-[420px] w-[50%] h-[700px] bg-gradient-to-br from-[#00F0D4]/20 to-transparent rounded-full blur-3xl z-0 pointer-events-none"></div>
			</section>
		</div>
	);
}
