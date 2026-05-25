import type React from "react";
import { useAuth } from "@/modules/lk/hooks/useAuth";
import "./cta-button.css";
import { useTranslation } from "react-i18next";

type CustomButtonProps = {
	text: string;
};

const CtaButton: React.FC<CustomButtonProps> = ({ text }) => {
	const { login } = useAuth();
	const { t } = useTranslation();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (text === t("home.header.cta_login")) {
			e.preventDefault();
			login();
		}
	};

	return (
		<a
			className="cta-button-header"
			type="submit"
			href={text === t("home.header.cta_apply") ? "#contact" : "#"}
			onClick={handleClick}
		>
			{text}
		</a>
	);
};

export default CtaButton;
