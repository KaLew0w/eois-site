import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./PotectedRoute";
import PersonalPage from "@/modules/lk/pages/PersonalPage";
import HomePage from "@/modules/home/pages/HomePage";
import ErrorPage from "@/shared/pages/ErrorPage";
import ContactPage from "@/modules/home/pages/ContactPage";
import { useEffect, useState } from "react";
// import Loader from "@/shared/components/dataDisplay/preloader/Loader";
import DashboardPage from "@/modules/lk/pages/dashboard/DashboardPage";
import WalletsPage from "@/modules/lk/pages/wallets/WalletsPage";
import WalletDetailsPage from "@/modules/lk/pages/wallets/WalletDetailsPage";
import HistoryPage from "@/modules/lk/pages/history/HistoryPage";
import CardsPage from "@/modules/lk/pages/cards/CardsPage";
import InvestPage from "@/modules/lk/pages/invest/InvestPage";
import SettingsPage from "@/modules/lk/pages/settings/SettingsPage";
import SupportPage from "@/modules/lk/pages/support/SupportPage";
import TransfersPage from "@/modules/lk/pages/transfers/TransfersPage";
import { ExchangePage } from "@/modules/lk/pages/exchanges/ExchangePage";
import { Navigate } from "react-router-dom";
import BalancesPage from "@/modules/lk/pages/balances/BalancesPage";

export default function AppRoutes() {
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/" || location.pathname === "/lk") {
			setLoading(true);
			const timer = setTimeout(() => {
				setLoading(false);
			}, 3000);

			return () => clearTimeout(timer);
		} else {
			setLoading(false);
		}
	}, [location.pathname]);

	// if (loading) {
	// 	return <Loader />;
	// }

	return (
		<Routes>
			<Route
				path="/lk"
				element={
					<ProtectedRoute>
						<PersonalPage />
					</ProtectedRoute>
				}
			>
				{/* Вложенные маршруты внутри /lk */}
				<Route index element={<Navigate to="dashboard" replace />} />
				<Route path="dashboard" element={<DashboardPage />} />
				<Route path="wallets" element={<WalletsPage />} />
				<Route path="wallets/details" element={<WalletDetailsPage />} />
				<Route path="exchange" element={<ExchangePage />} />
				<Route path="transfers" element={<TransfersPage />} />
				<Route path="transactions" element={<HistoryPage />} />
				<Route path="cards" element={<CardsPage />} />
				<Route path="balances" element={<BalancesPage />} />
				<Route path="invest" element={<InvestPage />} />
				<Route path="settings" element={<SettingsPage />} />
				<Route path="support" element={<SupportPage />} />
			</Route>
			<Route path="/" element={<HomePage />} />
			<Route path="/contacts" element={<ContactPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}
