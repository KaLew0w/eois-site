import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Russia from "@/assets/images/russia.png";
import Usa from "@/assets/images/usa.png";
import "./langBtnStyle.css";
import { useTranslation } from "react-i18next";

export default function ButtonLang() {
	const [open, setOpen] = useState(false);
	const { i18n } = useTranslation();

	const changeLanguage = (lng: "ru" | "en") => {
		i18n.changeLanguage(lng);
	};

	const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setOpen((prev) => !prev);
	};

	const closeMenu = () => setOpen(false);

	// данные по языкам (можно расширять, если добавятся новые)
	const languages = {
		ru: { label: "RU", flag: Russia },
		en: { label: "EN", flag: Usa },
	};

	const currentLang = i18n.language as "ru" | "en";

	return (
		<div className="language-switcher" onClick={closeMenu}>
			<button onClick={toggleMenu} className="lang-button">
				<img
					src={languages[currentLang].flag}
					className="lang-flag"
					alt={languages[currentLang].label}
				/>
				{languages[currentLang].label}
				<span className={`arrow-lang ${open ? "open" : ""}`}>
					<DownOutlined />
				</span>
			</button>

			<ul
				className={`lang-menu ${open ? "open" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				{Object.entries(languages).map(([lng, { label, flag }]) =>
					lng !== currentLang ? (
						<li key={lng}>
							<button
								onClick={() => (
									changeLanguage(lng as "ru" | "en"), closeMenu()
								)}
								className="lang-item"
							>
								<img src={flag} className="lang-flag" alt={label} /> {label}
							</button>
						</li>
					) : null,
				)}
			</ul>
		</div>
	);
}
