import { Content } from "antd/es/layout/layout";
import "@/App.css";
import "./contents.css";
import ServicesTabs from "./servicesTabs/ServicesTabs";
import Marquee from "./marquee/Marquee";
import StatisticSection from "./statisticSection/StatisticSection";
import SystemInfoSection from "./systemSection/SystemInfoSection";
import AboutUsSection from "./aboutUsSection/AboutUsSection";
import CreateSystemSection from "./createSystemSection/CreateSystemSection";
import ContactSection from "./contactSection/ContactSection";
import PartnersSection from "./partnersSection/PartersSection";
import CarouselTabs from "./servicesTabs/CarouselTabs";
import TasksSection from "./tasksSection/TasksSection";
import GchpSection from "./gchpSection/GchpSection";
import SecuritySection from "./securitySection/SecuritySection";
import DocumentsSection from "./documentsSection/DocumentsSection";
import FAQSection from "./faqSection/FAQSection";
import { Cards } from "./servicesTabs/Cards";
import Image6 from "@/assets/images/image6.png";
import Image7 from "@/assets/images/image7.png";
import Image8 from "@/assets/images/image8.png";
import Image9 from "@/assets/images/image9.png";
import Image12 from "@/assets/images/image12.png";
import Image13 from "@/assets/images/image13.png";
import Image14 from "@/assets/images/image14.png";
import Image15 from "@/assets/images/image15.png";
import Image16 from "@/assets/images/image16.png";
import Image17 from "@/assets/images/image17.png";
import { useTranslation } from "react-i18next";

type ContentHomePageProps = {
	activeTabIndex: number;
	setActiveTabIndex: (index: number) => void;
};

export default function ContentHomePage({
	activeTabIndex,
	setActiveTabIndex,
}: ContentHomePageProps) {
	const { t } = useTranslation();

	const slidesIndividuals = t("home.services.individuals.slides", {
		returnObjects: true,
	}) as {
		title: string;
		desc: string;
		title2?: string | null;
		desc2?: string | null;
	}[];

	const slidesBusiness = t("home.services.business.slides", {
		returnObjects: true,
	}) as {
		title: string;
		desc: string;
		title2?: string | null;
		desc2?: string | null;
	}[];

	const individualCardImages = [Image6, Image7, Image8, Image9];
	const businessCardImages = [
		Image12,
		Image13,
		Image14,
		Image15,
		Image16,
		Image17,
	];

	const localizedIndividualsCards = (
		t("home.services.individuals.cards", { returnObjects: true }) as any[]
	).map((card, index) => ({
		...card,
		img: individualCardImages[index],
		imgMob: individualCardImages[index],
	}));
	const localizedBusinessCards = (
		t("home.services.business.cards", { returnObjects: true }) as any[]
	).map((card, index) => ({
		...card,
		img: businessCardImages[index],
	}));

	return (
		<Content>
			<AboutUsSection />
			<CreateSystemSection />
			<TasksSection />
			<ServicesTabs
				id="services"
				tabs={[
					{
						label: t("home.services.tab_individuals"),
						content: (
							<>
								<CarouselTabs items={slidesIndividuals} />
								<Cards cards={localizedIndividualsCards} />
							</>
						),
					},
					{
						label: t("home.services.tab_business"),
						content: (
							<>
								<CarouselTabs items={slidesBusiness} />
								<Cards cards={localizedBusinessCards} />
							</>
						),
					},
				]}
				activeIndex={activeTabIndex}
				setActiveIndex={setActiveTabIndex}
			/>
			<Marquee />
			<StatisticSection />
			<GchpSection />
			<SecuritySection />
			<DocumentsSection />
			<SystemInfoSection />
			<FAQSection />
			<ContactSection />
			<PartnersSection />
		</Content>
	);
}
