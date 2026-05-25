import CtaButton from "@/shared/components/dataEntry/ctaButton/CtaButton";
import ButtonLang from "@/shared/components/dataEntry/ButtonLang";
import Logo from "@/assets/images/logo_white.png";
import "././header.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type HeaderHomePageProps = {
	scrollToSection: (id: string, tabIndex?: number) => void;
};

export default function HeaderHomePage({
	scrollToSection,
}: HeaderHomePageProps) {
	const [menuOpen, setMenuOpen] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();

	const location = useLocation();

	useEffect(() => {
		if (location.state?.scrollTo) {
			const { id, tabIndex } = location.state.scrollTo;
			scrollToSection(id, tabIndex);
		}
	}, [location]);

	const handleNavClick = (id: string, tabIndex?: number) => {
		if (location.pathname === "/") {
			// Уже на главной → просто скроллим
			scrollToSection(id, tabIndex);
		} else {
			// На другой странице → возвращаемся на главную
			navigate("/", {
				state: { scrollTo: { id, tabIndex } },
			});
		}
	};

	return (
		<>
			<header className="fixed top-0 left-0 w-full px-6 md:px-10 py-4 z-20 backdrop-blur-md bg-black/0">
				<div className="max-w-screen-xl mx-auto flex justify-between items-center">
					<div className="flex items-center gap-2">
						<a href="/">
							<img alt="CardFly Logo" className="h-10" src={Logo} />
						</a>
					</div>

					<nav className="hidden md:flex gap-14 text-sm text-white">
						<a className="text-[#00F0D4]" href="/">
							{t("home.header.nav_home")}
						</a>
						<a
							className="hover:text-[#00F0D4]"
							onClick={() => handleNavClick("services", 0)}
						>
							{t("home.header.nav_for_individuals")}
						</a>
						<a
							className="hover:text-[#00F0D4]"
							onClick={() => handleNavClick("services", 1)}
						>
							{t("home.header.nav_for_business")}
						</a>
						<a
							className="hover:text-[#00F0D4]"
							onClick={() => navigate("/contacts")}
						>
							{t("home.header.nav_contacts")}
						</a>
					</nav>

					<div className="flex items-center gap-4">
						<div className="header-buttons">
							<ButtonLang />
							<CtaButton text={t("home.header.cta_apply")} />
							<CtaButton text={t("home.header.cta_login")} />
						</div>

						{/* <!-- Бургер для мобилки --> */}
						<div className="burger">
							<ButtonLang />
							<button
								className="burger-btn"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								{menuOpen ? (
									t("home.header.burger_close")
								) : (
									<svg
										className="w-6 h-6 text-black"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											d="M4 6h16M4 12h16M4 18h16"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>

				<div
					className={`md:hidden h-screen flex-col items-center justify-center gap-8 px-6 transition-all duration-300 ${
						menuOpen ? "flex" : "hidden"
					}`}
					id="mobileMenu"
					onClick={() => setMenuOpen(false)}
				>
					<nav
						onClick={(e) => e.stopPropagation()}
						className="nav-mobile flex flex-col gap-6 text-white text-xl items-center"
					>
						<a
							className="text-[#00F0D4] transition"
							href="/"
							onClick={() => {
								setMenuOpen(false);
							}}
						>
							{t("home.header.nav_home")}
						</a>
						<a
							className="hover:text-[#00F0D4] transition"
							onClick={() => {
								setMenuOpen(false);
								handleNavClick("services", 0);
							}}
						>
							{t("home.header.nav_for_individuals")}
						</a>
						<a
							className="hover:text-[#00F0D4] transition"
							onClick={() => {
								setMenuOpen(false);
								handleNavClick("services", 1);
							}}
						>
							{t("home.header.nav_for_business")}
						</a>
						<a
							className="hover:text-[#00F0D4] transition"
							onClick={() => {
								setMenuOpen(false);
								navigate("/contacts");
							}}
						>
							{t("home.header.nav_contacts")}
						</a>
					</nav>
					<CtaButton text={t("home.header.cta_login")} />
					<CtaButton text={t("home.header.cta_apply")} />
				</div>
			</header>
		</>
	);
}
