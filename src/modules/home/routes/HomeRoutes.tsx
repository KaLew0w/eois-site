import { Route, Routes } from "react-router-dom";
import HomePage from "@/modules/home/pages/HomePage";
import ContactPage from "@/modules/home/pages/ContactPage";

export default function HomeRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/contacts" element={<ContactPage />} />
		</Routes>
	);
}

