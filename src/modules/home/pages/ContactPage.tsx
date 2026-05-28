import { Col, Row } from "antd";
import ContactForm from "@/modules/home/components/contactSection/ContactForm";
import FooterTheOne from "@/modules/home/components/footer/FooterTheOne";
import HeaderHomePage from "@/modules/home/components/header/HeaderHomePage";
import { useTranslation } from "react-i18next";
import CustomCursor from "@/modules/home/components/customCursor/CustomCursor";
import { useEffect, useState } from "react";

export default function ContactPage() {
	const { t, i18n } = useTranslation();
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		document.title = t("seo.contacts_title");
	}, [i18n.language, t]);

	return (
		<>
			<CustomCursor />
			<HeaderHomePage
				scrollToSection={() => {
					const section = document.getElementById("contactForm");
					if (section) {
						section.scrollIntoView({ behavior: "smooth" });
					}
				}}
			/>
			<section>
				{/* <section
					style={{
						color: "white",
						textAlign: "center",
						padding: "8rem 2.5rem 0",
					}}
					className="text-center px-6 md:px-10 pt-32"
				>

				</section> */}
				{/* Контакты */}
				<section
					style={{
						backgroundColor: "#181818",
						backgroundImage: "radial-gradient(circle at 82% 95%, rgba(0, 240, 212, 0.15), transparent 30%)",
						paddingTop: "6rem",
						paddingBottom: "2rem",
						paddingLeft: "1.5rem",
						paddingRight: "1.5rem",
					}}
				>
					<div style={{
						color: "white",
						textAlign: "center",
						padding: "1rem 0 0",
					}}
					className="text-center px-6 md:px-10 pt-32">
						<h2 className="text-3xl md:text-5xl font-light leading-snug">
							{t("home.contactForm.contact_title1")}
							<br />
							<span className="text-gradient">
								{t("home.contactForm.contact_title2")}
							</span>
						</h2>
						<p
							style={{
								color: "rgba(255, 255, 255, 0.8)", // text-white/80
								fontSize: "1.125rem", // text-lg
								marginTop: "1rem", // mt-4
								maxWidth: "42rem", // max-w-2xl ≈ 672px
								marginLeft: "auto",
								marginRight: "auto", // mx-auto
							}}
						>
							{t("home.contactForm.contact_desc")}
						</p>
					</div>
					<div style={{ maxWidth: "1280px", margin: "0 auto", padding: "6rem 0 0" }}>
						<Row gutter={[32, 32]} justify="space-between" align="top">
							<Col xs={24} md={12}>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "1.5rem",
										color: "white",
									}}
								>
									<div>
										<h2 className="text-2xl font-light mb-2">
											{t("home.contactForm.contact_phones")}
										</h2>
										<p className="text-white/80 text-base">
											+996 (222) 38-22-23
										</p>
									</div>
									<div>
										<h2 className="text-2xl font-light mb-2">
											{t("home.contactForm.contact_email")}
										</h2>
										<p className="text-white/80 text-base">info@eois.kg</p>
									</div>
									<div>
										<h2 className="text-2xl font-light mb-2">
											{t("home.contactForm.contact_address")}
										</h2>
										<p className="text-white/80 text-base">
											{t("home.contactForm.contact_address_text")}
										</p>
									</div>
								</div>
							</Col>

							<Col xs={24} md={12}>
								<ContactForm />
							</Col>
						</Row>
					</div>
				</section>

				{/* <!-- Карта Google --> */}
				<section className="w-full">
					<iframe
						src="https://www.google.com/maps?q=42.864673,74.600841&z=16&output=embed"
						width="100%"
						height="500"
						style={{ border: "0" }}
						// allowfullscreen
						loading="lazy"
					// referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</section>
				<FooterTheOne scrollToSection={scrollToSection} />
			</section>
		</>
	);
}