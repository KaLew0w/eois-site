import ContactForm from "./ContactForm";
import './contactSectionStyle.css'
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";


export default function ContactSection() {
    const { ref, inView } = useInView({
        triggerOnce: false, // анимация запускается 
        threshold: 0.2,    // сработает, когда 20% блока видно
    });
    const { t } = useTranslation();

    return (
        <section className="contact-wrapper" id="contact">
            <div ref={ref}
                className={`contact-section ${inView ? "visible" : ""}`}>
                <div className="contact-container">
                    <div className="contact-text">
                        <h2 style={{
                            color: "white"
                        }} className="text-white font-light mt-0">
                            {t('home.contact.title')} <span className="contact-text-gradient">{t('home.contact.title_highlight')}</span>
                        </h2>
                        <p className="contact-subtitle">
                            {t('home.contact.subtitle')}
                        </p>
                    </div>
                    <ContactForm />
                </div>
            </div>
            <div className="contact-glow"></div>
        </section>
    )
}