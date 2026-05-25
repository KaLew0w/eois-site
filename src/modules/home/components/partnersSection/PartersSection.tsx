import Visa from "@/assets/images/visa.png";
import MasterCard from "@/assets/images/mastercard.png";
import Elcart from "@/assets/images/elcart.png";
import { useTranslation } from "react-i18next";

export default function PartnersSection() {
	const { t } = useTranslation();
	return (
		<section className="pt-0 md:pt-16 pb-16 md:pb-32 px-6 md:px-10">
			<div className="max-w-screen-xl mx-auto overflow-x-auto">
				<div className="flex justify-center items-center gap-8 md:gap-32 min-w-max">
					<img
						src={Visa}
						alt={t("home.partners.visa")}
						className="h-10 md:h-24 object-contain"
					/>
					<img
						src={MasterCard}
						alt={t("home.partners.mastercard")}
						className="h-10 md:h-24 object-contain"
					/>
					<img
						src={Elcart}
						alt={t("home.partners.elcart")}
						className="h-10 md:h-24 object-contain"
					/>
				</div>
			</div>
		</section>
	);
}
