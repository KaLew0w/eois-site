import { useSearchParams, useNavigate } from "react-router-dom";
import { useFiatAccounts, useCryptoAccounts } from "@/modules/lk/hooks/useAccounts";
import { useTransferHistory } from "@/modules/lk/hooks/useTransfer";
import { useEffect, useState } from "react";
import type { HistoryDataType } from "@/shared/types/historyDataType";

export default function WalletDetails() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const type = searchParams.get("type") || "fiat";
	const walletId = searchParams.get("id") || "";

	const { data: fiatAccounts = [] } = useFiatAccounts();
	const { data: cryptoAccounts = [] } = useCryptoAccounts();
	const { data: allTransactions = [] } = useTransferHistory();

	const [wallet, setWallet] = useState<any>(null);
	const [recentTransactions, setRecentTransactions] = useState<HistoryDataType[]>([]);

	useEffect(() => {
		if (type === "fiat" && walletId) {
			// Для фиатных счетов ID имеет формат "currency-name" (например, "rub-основной")
			const [currency, ...nameParts] = walletId.split("-");
			const name = nameParts.join("-");
			const found = fiatAccounts.find(
				(acc: any) =>
					acc.currency?.toLowerCase() === currency?.toLowerCase() &&
					acc.name?.toLowerCase().replace(/\s+/g, "-") === name?.toLowerCase()
			);
			setWallet(found);
		} else if (type === "crypto" && walletId) {
			// Для крипто кошельков ID - это числовой ID
			const found = cryptoAccounts.find(
				(acc: any) => acc.id?.toString() === walletId
			);
			setWallet(found);
		}
	}, [type, walletId, fiatAccounts, cryptoAccounts]);

	useEffect(() => {
		if (wallet) {
			// Фильтруем транзакции по валюте кошелька
			const filtered = allTransactions
				.filter((tx: HistoryDataType) => {
					if (type === "fiat") {
						return tx.currency === wallet.currency;
					} else {
						return tx.currency === wallet.currency || tx.currency === wallet.asset;
					}
				})
				.slice(0, 5) // Берем последние 5 транзакций
				.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime());
			setRecentTransactions(filtered);
		}
	}, [wallet, allTransactions, type]);

	if (!wallet) {
		return (
			<div className="p-4 sm:p-6 space-y-6">
				<div className="text-white/60">Загрузка данных кошелька...</div>
			</div>
		);
	}

	const walletName =
		type === "fiat"
			? `${wallet.currency} • ${wallet.name}`
			: wallet.asset || wallet.currency;
	const walletBalance = wallet.balance || "0";
	const isActive = wallet.active !== false && wallet.status !== "inactive";
	const statusText = isActive ? "Активен" : "Неактивен";

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			// Можно добавить уведомление об успешном копировании
		} catch (err) {
			console.error("Ошибка копирования:", err);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString("ru-RU", {
			dateStyle: "short",
			timeStyle: "short",
		});
	};

	const formatAmount = (amount: number, currency: string) => {
		const sign = amount >= 0 ? "+ " : "− ";
		return `${sign}${Math.abs(amount).toLocaleString("ru-RU")} ${currency}`;
	};

	const getStatusClass = (status: string) => {
		if (status === "done") {
			return "bg-emerald-500/20 text-emerald-400";
		} else if (status === "pending") {
			return "bg-yellow-500/20 text-yellow-400";
		}
		return "bg-white/10 text-white/60";
	};

	const walletParam = type === "fiat" ? walletId : wallet.id;

	return (
		<div className="p-4 sm:p-6 space-y-6">
			<header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
				<div className="min-w-0">
					<button
						onClick={() => navigate("/lk/wallets")}
						className="text-white/60 hover:text-white"
					>
						← Назад
					</button>
					<h1 className="text-2xl font-semibold mt-1 truncate">{walletName}</h1>
				</div>
				<div className="wallets-details-buttons flex flex-col xs:flex-row sm:flex-row flex-wrap gap-2 sm:justify-end w-full sm:w-auto">
					<button
						onClick={() => navigate(`/lk/transactions?wallet=${walletParam}`)}
						className="cta-button px-4 py-2 rounded-xl w-full sm:w-auto text-center"
					>
						История
					</button>
					<button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 w-full sm:w-auto text-center mt-2 sm:mt-0">
						Переименовать
					</button>
					<button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 w-full sm:w-auto text-center">
						{isActive ? "Деактивировать" : "Активировать"}
					</button>
					<button className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 w-full sm:w-auto text-center">
						Удалить
					</button>
				</div>
			</header>
			<div className="grid gap-4 lg:grid-cols-3">
				<div className="lg:col-span-2 space-y-4">
					<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5">
						<div className="text-white/60 text-sm">Баланс</div>
						<div className="text-2xl sm:text-3xl font-semibold mt-1">
							{walletBalance}
						</div>
						<div className="text-white/60 text-xs mt-1">
							Статус:{" "}
							<span
								className={
									isActive ? "text-emerald-400" : "text-red-400"
								}
							>
								{statusText}
							</span>
						</div>
					</div>
					<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
							<div className="text-lg font-semibold">Последние операции</div>
							<a
								href={`#/transactions?wallet=${walletParam}`}
								className="text-[#00eefd] hover:underline"
							>
								Посмотреть все
							</a>
						</div>
						{recentTransactions.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="w-full text-xs sm:text-sm">
									<thead className="text-white/60">
										<tr className="text-left">
											<th className="py-2 pr-4 whitespace-nowrap">Дата</th>
											<th className="py-2 pr-4">Описание</th>
											<th className="py-2 pr-4 whitespace-nowrap hidden sm:table-cell">
												Категория
											</th>
											<th className="py-2 pr-4 whitespace-nowrap">Сумма</th>
											<th className="py-2 pr-4 whitespace-nowrap hidden sm:table-cell">
												Статус
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-white/5">
										{recentTransactions.map((tx) => (
											<tr key={tx.id}>
												<td className="py-2 pr-4 whitespace-nowrap">
													{formatDate(tx.dt)}
												</td>
												<td className="py-2 pr-4">{tx.descr}</td>
												<td className="py-2 pr-4 hidden sm:table-cell">
													{tx.category}
												</td>
												<td
													className={`py-2 pr-4 whitespace-nowrap ${
														tx.amount >= 0 ? "text-emerald-400" : ""
													}`}
												>
													{formatAmount(tx.amount, tx.currency)}
												</td>
												<td className="py-2 pr-4 hidden sm:table-cell">
													<span
														className={`px-2 py-1 text-xs rounded ${getStatusClass(
															tx.status
														)}`}
													>
														{tx.status === "done"
															? "Выполнено"
															: tx.status === "pending"
															? "В обработке"
															: tx.status}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className="text-white/60 text-sm mt-2">
								Операций пока нет.
							</div>
						)}
					</div>
				</div>
				<div>
					<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5">
						<div className="text-lg font-semibold mb-3">Реквизиты</div>
						{type === "fiat" ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
								<div>
									<div className="text-white/60">IBAN</div>
									<div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 break-all">
										{wallet.iban}
									</div>
									<button
										onClick={() => handleCopy(wallet.iban)}
										className="text-[#00eefd] hover:underline mt-1 inline-block"
									>
										Копировать
									</button>
								</div>
								<div>
									<div className="text-white/60">Номер счёта</div>
									<div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 break-all">
										{wallet.account}
									</div>
									<button
										onClick={() => handleCopy(wallet.account)}
										className="text-[#00eefd] hover:underline mt-1 inline-block"
									>
										Копировать
									</button>
								</div>
							</div>
						) : (
							<div className="text-sm">
								<div className="text-white/60 mb-1">Адрес депозита</div>
								<div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 break-all">
									{wallet.depositAddress || "Не указан"}
								</div>
								{wallet.depositAddress && (
									<button
										onClick={() => handleCopy(wallet.depositAddress)}
										className="text-[#00eefd] hover:underline mt-1 inline-block"
									>
										Скопировать адрес
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
