import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/PotectedRoute";
import PersonalPage from "@/modules/lk/pages/PersonalPage";
import DashboardPage from "@/modules/lk/pages/dashboard/DashboardPage";
import WalletsPage from "@/modules/lk/pages/wallets/WalletsPage";
import HistoryPage from "@/modules/lk/pages/history/HistoryPage";
import CardsPage from "@/modules/lk/pages/cards/CardsPage";
import InvestPage from "@/modules/lk/pages/invest/InvestPage";
import SettingsPage from "@/modules/lk/pages/settings/SettingsPage";
import SupportPage from "@/modules/lk/pages/support/SupportPage";
import TransfersPage from "@/modules/lk/pages/transfers/TransfersPage";
import { ExchangePage } from "@/modules/lk/pages/exchanges/ExchangePage";
import BalancesPage from "@/modules/lk/pages/balances/BalancesPage";

export default function LkRoutes() {
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
				<Route path="exchange" element={<ExchangePage />} />
				<Route path="transfers" element={<TransfersPage />} />
				<Route path="transactions" element={<HistoryPage />} />
				<Route path="cards" element={<CardsPage />} />
				<Route path="balances" element={<BalancesPage />} />
				<Route path="invest" element={<InvestPage />} />
				<Route path="settings" element={<SettingsPage />} />
				<Route path="support" element={<SupportPage />} />
			</Route>
		</Routes>
	);
}

