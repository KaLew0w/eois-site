import WalletDetails from "./components/WalletDetails";

export default function WalletDetailsPage() {
	return (
		<div className="space-y-6">
			<header className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Детали кошелька</h1>
			</header>
			<WalletDetails />
		</div>
	);
}
