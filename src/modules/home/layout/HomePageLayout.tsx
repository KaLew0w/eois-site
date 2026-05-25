import { Layout } from "antd";
import HeaderHomePage from "@/modules/home/components/header/HeaderHomePage";
import ContentHomePage from "@/modules/home/components/ContentHomePage";
import FooterTheOne from "@/modules/home/components/footer/FooterTheOne";
import { useState } from "react";

export default function HomePageLayout() {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const scrollToSection = (id: string, tabIndex?: number) => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
		if (tabIndex !== undefined) {
			setActiveTabIndex(tabIndex);
		}
	};

	return (
		<Layout style={{ background: "#191919" }}>
			<HeaderHomePage scrollToSection={scrollToSection} />
			<ContentHomePage
				activeTabIndex={activeTabIndex}
				setActiveTabIndex={setActiveTabIndex}
			/>
			<FooterTheOne scrollToSection={scrollToSection}/>
		</Layout>
	);
}