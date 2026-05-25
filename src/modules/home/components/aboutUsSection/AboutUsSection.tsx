import OpenAccountButton from "@/shared/components/dataEntry/openAccountButton/OpenAccountButton";
import LogoMobile from "@/assets/images/logo-mobile.png";
import LogoBlur from "@/assets/images/logo-blur.png";
import "./aboutUsSectionStyle.css";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
    const { t } = useTranslation();
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        if (!titleRef.current) return;

        gsap.fromTo(
            titleRef.current,
            {
                rotateX: 90,
                scale: 0.7,
                opacity: 0,
                transformPerspective: 1000,
            },
            {
                rotateX: 0,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            },
        );
    }, []);

    return (
        <section className="relative pt-20 md:pt-24 px-6 md:px-10 pb-20 min-h-[500px] md:min-h-[700px] lg:min-h-[700px] overflow-x-clip bg-danger">
            <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 relative">
                {/* <!-- Левая часть --> */}
                <div className="hero-left fade-slide-left lg:w-auto z-10">
                    <div className="max-w-xl">
                        <h1
                            ref={titleRef}
                            className="text-white text-[38px] sm:text-4xl md:text-6xl font-light"
                        >
                            <span className="gradient-title">
                                {t("home.hero.title_prefix")}
                            </span>
                            <br />
                            <span className="whitespace-normal">
                                {t("home.hero.title_line")}
                            </span>{" "}
                            {t("home.hero.title_suffix")}
                        </h1>
                        <p className="text-xl text-white/80 mt-8">
                            <strong>{t("home.hero.subtitle_strong")}</strong>
                            {t("home.hero.subtitle")}
                        </p>
                        <OpenAccountButton />
                    </div>
                </div>

                {/* <!-- Правая часть --> */}
                <div className="relative w-full lg:w-auto flex justify-center items-end lg:items-center mt-16 md:mt-0">
                    {/* <!-- Мобильное изображение --> */}
                    <img
                        src={LogoMobile}
                        alt="TheOne mobile visual"
                        className="block md:hidden absolute right-0 bottom-[-380px] w-[110%] max-w-none object-contain -mr-[24px]"
                    />

                    {/* <!-- Десктопное изображение --> */}
                    <img
                        src={LogoBlur}
                        alt="TheOne desktop visual"
                        className="hidden md:block w-[500px] object-contain scale-125 transition-transform duration-500"
                    />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </section>
    );
}
