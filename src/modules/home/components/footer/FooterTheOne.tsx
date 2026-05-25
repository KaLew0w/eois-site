import { useLocation, useNavigate } from 'react-router-dom';
import './footerStyle.css'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

type FooterHomePageProps = {
    scrollToSection: (id: string, tabIndex?: number) => void;
};

export default function FooterTheOne({
    scrollToSection,
}: FooterHomePageProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
        <footer className="bg-[#1a1a1a] text-white text-sm px-6 py-12">
            <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-12">
                {/* <!-- Блок меню без обводки --> */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gradient">{t('home.footer.menu_title')}</h3>
                    <ul className="space-y-3 text-white">
                        <li>
                            <a href="/" className="text-white hover:text-[#00F0D4]">{t("home.header.nav_home")}</a>
                        </li>
                        <li>
                            <a className="hover:text-[#00F0D4]" onClick={() => handleNavClick("services", 0)} >{t('home.footer.menu.individuals')}</a>
                        </li>
                        <li>
                            <a className="hover:text-[#00F0D4]" onClick={() => handleNavClick("services", 1)}>{t('home.footer.menu.business')}</a>
                        </li>
                        <li>
                            <a className="hover:text-[#00F0D4]" onClick={() => navigate('/contacts')}>{t('home.footer.menu.contacts')}</a>
                        </li>
                        <li>
                            <a href="licenses/CartFly_licenses.pdf" target="_blank" className="hover:text-[#00F0D4]">
                                {t('home.footer.menu.licenses')}
                            </a>
                        </li>
                        <li>
                            <a href="licenses/Договор публичной оферты.pdf" target="_blank" className="hover:text-[#00F0D4]">
                                {t('home.footer.menu.public_offer')}
                            </a>
                        </li>
                        <li>
                            <a href="licenses/Политика конфиденциальности.pdf" target="_blank" className="hover:text-[#00F0D4]">
                                {t('home.footer.menu.privacy_policy')}
                            </a>
                        </li>
                        <li>
                            <a href="licenses/Согласие на обработку персональных данных.pdf" target="_blank" className="hover:text-[#00F0D4]">
                                {t('home.footer.menu.personal_data_consent')}
                            </a>
                        </li>
                    </ul>
                </div>
                {/* <!-- Юридическая информация --> */}
                <div className="md:col-span-2 space-y-4 text-white/60">
                    <p>
                        {t('home.footer.legal.company_full')}
                    </p>
                    <p style={{ marginTop: "16px" }}>
                        {t('home.footer.legal.license_payment')}
                    </p>
                    {/* <p style={{ marginTop: "16px" }}>
                        {t('home.footer.legal.license_operator')}
                    </p> */}
                    <p style={{ marginTop: "16px" }}>
                        {t('home.footer.legal.compliance')}
                    </p>
                    <p style={{ marginTop: "16px" }}>
                        {t('home.footer.legal.address')}
                    </p>
                    <p className="text-white/60 pt-4 border-t border-white/10 mt-6"
                    >
                        {t('home.footer.legal.copyright')}
                    </p>
                </div>
            </div>
        </footer >
    )
}