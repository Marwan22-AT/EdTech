import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to EdTech",
      login_google: "Login with Google",
      explore_guest: "Explore as Guest",
      courses: "Our Courses",
      price: "Price"
    }
  },
  ar: {
    translation: {
      welcome: "مرحباً بك في EdTech",
      login_google: "الدخول بواسطة جوجل",
      explore_guest: "استكشف كضيف",
      courses: "كورساتنا",
      price: "السعر"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar", // اللغة الافتراضية
  interpolation: { escapeValue: false }
});

export default i18n;