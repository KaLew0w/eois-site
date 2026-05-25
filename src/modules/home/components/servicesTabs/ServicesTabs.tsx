import './serviceTabsStyle.css'

interface Tab {
	label: string;
	content: React.ReactNode;
}

type ServicesTabsProps = {
	id?: string;
	tabs: Tab[];
	activeIndex: number;
	setActiveIndex: (index: number) => void;
};

export default function ServicesSection({ id, tabs, activeIndex, setActiveIndex }: ServicesTabsProps) {
	return (
		<section id={id}
			className="tabs-section"
			style={{ maxWidth: "1280px", margin: "auto" }}
		>
			<div className="tabs-header">
				{tabs.map((tab, idx) => (
					<button
						key={idx}
						className={`tab-button ${activeIndex === idx ? "active" : ""}`}
						onClick={() => setActiveIndex(idx)}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="tabs-content">{tabs[activeIndex].content}</div>
		</section>
	);
}
