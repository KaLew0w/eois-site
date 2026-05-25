import { useTranslation } from "react-i18next";
import RightArrow from "@/assets/images/right-arrow.png";
import "./custom-cta-button.css";

export default function OpenAccountButton() {
	const { t, i18n } = useTranslation();

	const buttonClass =
		i18n.language === "en" ? "custom-cta-button-home-en" : "custom-cta-button-home";

	return (
		<a className={buttonClass} href="#contact">
			<span>{t("home.hero.open_account")}</span>
			<img alt="Arrow" src={RightArrow} />
		</a>
	);
}
