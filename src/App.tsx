import "./App.css";
import AppRoutes from "@/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "@/shared/store/AuthProvider";
import "@/assets/fonts/fonts.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		document.title = t("seo.base_title");
	}, [i18n.language, t]);

	return (
		<AuthProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
