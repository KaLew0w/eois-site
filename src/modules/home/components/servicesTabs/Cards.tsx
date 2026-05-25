import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CardProps {
	img: string;
	title: string;
	desc: string;
	label: string;
}

interface CardsProps {
	cards: CardProps[];
}

export function Cards({ cards }: CardsProps) {
	useEffect(() => {
		// Регистрируем плагин ScrollTrigger
		gsap.registerPlugin(ScrollTrigger);

		// Функция для инициализации анимации карточек
		const initCardStackAnimation = () => {
			document.querySelectorAll(".card").forEach((card) => {
				const section = card.closest("section");
				if (!section) return;

				const cards = Array.from(section.querySelectorAll(".card"));
				const index = cards.indexOf(card);

				if (index < cards.length - 1) {
					// Для всех карточек кроме последней - уменьшаем когда следующая карточка приближается
					const nextCard = cards[index + 1];
					gsap.to(card, {
						scrollTrigger: {
							trigger: nextCard,
							start: "top center+=100",
							end: "top top",
							scrub: true,
							markers: false,
						},
						scale: 0.9,
						overwrite: true,
					});
				} else if (index === cards.length - 1 && index > 0) {
					// Для последней карточки - уменьшаем предыдущую когда она сама достигает центра
					const prevCard = cards[index - 1];
					gsap.to(prevCard, {
						scrollTrigger: {
							trigger: card,
							start: "top center+=100",
							end: "top top",
							scrub: true,
							markers: false,
						},
						scale: 0.9,
						overwrite: true,
					});
				}
			});
		};

		// Инициализируем анимацию после рендера
		const timer = setTimeout(() => {
			initCardStackAnimation();
		}, 100);

		// Очистка при размонтировании
		return () => {
			clearTimeout(timer);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [cards]);

	return (
		<section className="relative text-white pt-40 px-0">
			{/* Десктопная версия */}
			<div className="relative max-w-screen-xl mx-auto z-10 hidden md:block pb-10">
				{cards.map((card, idx) => (
					<div
						key={idx}
						className="card bg-[#262626] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row sticky top-60 mb-10"
						style={{ zIndex: idx + 1 }}
					>
						<div className="p-8 flex flex-col justify-between w-full md:w-1/2">
							<span className="inline-block text-sm text-black bg-white rounded-full px-4 py-1 mb-6 w-max">
								{card.label}
							</span>
							<div>
								<h3 className="text-3xl md:text-5xl font-light mb-4">
									{card.title}
								</h3>
								<div className="w-28 h-0.5 bg-white/80 mb-4"></div>
								<p className="text-white/80 text-base leading-relaxed">
									<strong className="text-white font-light">{card.desc}</strong>
								</p>
							</div>
						</div>
						<div className="w-full md:w-1/2 h-[280px] md:h-auto">
							<img
								alt={card.title}
								className="w-full h-full object-cover"
								src={card.img}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Мобильная версия */}
			<div className="md:hidden px-0">
				{cards.map((card, idx) => (
					<MobileCard key={idx} {...card} />
				))}
			</div>
		</section>
	);
}

// Мобильная карточка с аккордеоном
function MobileCard({ img, title, desc, label }: CardProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className="mobile-card rounded-3xl bg-[#262626] text-white overflow-hidden mb-6">
			<div className="relative overflow-hidden rounded-t-3xl">
				<img
					src={img}
					alt={title}
					className="w-full h-48 object-cover rounded-3xl"
				/>
			</div>
			<div
				className="p-6 mobile-card-content cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					setOpen((prev) => !prev);
				}}
			>
				<span className="inline-block text-sm text-black bg-white rounded-full px-4 py-1 mb-4">
					{label}
				</span>
				<div className="flex items-center justify-between">
					<h3 className="text-2xl font-light">{title}</h3>
					<div className="toggle-description flex shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#32FFB1] to-[#00F0D4] items-center justify-center">
						<span className="plus-icon text-black text-xl leading-none select-none">
							{open ? "–" : "+"}
						</span>
					</div>
				</div>
				<div
					className={`mobile-description text-sm text-white/80 leading-relaxed mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
						open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<strong className="text-white font-light block mb-1">
						{desc.split(".")[0]}.
					</strong>
					{desc.split(".").slice(1).join(".")}
				</div>
			</div>
		</div>
	);
}
