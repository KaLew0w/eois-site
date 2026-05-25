import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from '@/locales/ru.json'; 
import en from '@/locales/en.json';


i18n.use(initReactI18next).init({
    resources:{
        ru: {translation: ru},
        en: {translation: en},
    },
    lng: "ru",          // язык по умолчанию
    fallbackLng: "en",  // если ключа нет в текущем языке → берём из en
    interpolation: {
      escapeValue: false // React сам экранирует HTML
    }
});

export default i18n;