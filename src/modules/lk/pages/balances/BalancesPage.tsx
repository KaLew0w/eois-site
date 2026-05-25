import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";

interface FiatAccount {
	id: string;
	name: string;
	currency: string;
	balance: number;
}

interface CryptoWallet {
	asset: string;
	symbol?: string;
	network?: string;
	balance: number;
	usdValue?: number;
	address?: string;
}

function fmt(value: number, currency: string) {
	return value.toLocaleString("ru-RU", {
		style: "currency",
		currency,
		maximumFractionDigits: 2,
	});
}

export default function BalancesPage() {
	const [fiat, setFiat] = useState<FiatAccount[]>([]);
	const [crypto, setCrypto] = useState<CryptoWallet[]>([]);
	const [fiatUSDT, setFiatUSDT] = useState(0);
	const [cryptoUSDT, setCryptoUSDT] = useState(0);
	const [loading, setLoading] = useState(true);

	const currencies = ["USD", "RUB", "KGS"];

	// вспомогательная функция пересчёта крипты
	const toUSD = (amount: number, asset: string): number => {
		const found = crypto.find((w) => w.asset === asset);
		return found ? amount * ((found.usdValue ?? 0) / (found.balance || 1)) : 0;
	};

	useEffect(() => {
		async function loadBalances() {
			try {
				// 🏦 Фиатные счета (пример)
				const fiatData: FiatAccount[] = [
					{ id: "1", name: "Основной", currency: "USD", balance: 1200 },
					{ id: "2", name: "Рублёвый", currency: "RUB", balance: 85000 },
					{ id: "3", name: "Кыргызский", currency: "KGS", balance: 55000 },
				];

				// 💰 Крипта
				const cryptoData: Omit<CryptoWallet, "usdValue">[] = [
					{ asset: "bitcoin", network: "BTC", balance: 0.0145 },
					{ asset: "tether", network: "USDT (TRC20)", balance: 250 },
					{ asset: "ethereum", network: "ETH", balance: 0.07 },
				];

				// ⚡ Курсы крипты в USD
				const ids = cryptoData.map((c) => c.asset).join(",");
				const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
				const res = await fetch(url);
				const prices = await res.json();

				// 💵 Расчёт стоимости крипты
				const cryptoWithUsd: CryptoWallet[] = cryptoData.map((c) => ({
					...c,
					usdValue: c.balance * (prices[c.asset]?.usd || 0),
				}));

				const fiatTotal = fiatData.reduce(
					(sum, acc) =>
						sum + (acc.currency === "USD" ? acc.balance : acc.balance / 90),
					0,
				);

				const cryptoTotal = cryptoWithUsd.reduce(
					(sum, w) => sum + (w.usdValue ?? 0),
					0,
				);

				setFiat(fiatData);
				setCrypto(cryptoWithUsd);
				setFiatUSDT(fiatTotal);
				setCryptoUSDT(cryptoTotal);
			} catch (err) {
				console.error(err);
				message.error("Не удалось загрузить данные о балансах 😢");
			} finally {
				setLoading(false);
			}
		}

		loadBalances();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-full p-10">
				<Spin size="large" tip="Загрузка данных..." />
			</div>
		);
	}

	const totalUSDT = fiatUSDT + cryptoUSDT;

	return (
		<div className="text-white space-y-6">
			<h1 className="text-2xl font-semibold mb-4">Балансы</h1>

			{/* Итого */}
			<div className="grid md:grid-cols-3 gap-4 mb-6">
				<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss">
					<div className="text-white/60 text-sm">Итого в USD</div>
					<div className="text-2xl font-semibold mt-2">
						{fmt(totalUSDT, "USD")}
					</div>
					<div className="text-xs text-white/50 mt-1">
						Fiat: {fmt(fiatUSDT, "USD")} • Crypto: {fmt(cryptoUSDT, "USD")}
					</div>
				</div>

				{currencies.map((c) => {
					const total = fiat
						.filter((w) => w.currency === c)
						.reduce((sum, w) => sum + Number(w.balance || 0), 0);
					return (
						<div
							key={c}
							className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss"
						>
							<div className="text-white/60 text-sm">Баланс {c}</div>
							<div className="text-2xl font-semibold mt-2">{fmt(total, c)}</div>
						</div>
					);
				})}
			</div>

			{/* Фиатные счета */}
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss overflow-x-auto">
				<div className="text-sm text-white/60 mb-2">Фиатные счета</div>
				<table className="min-w-full text-sm">
					<thead className="text-white/60">
						<tr className="text-left">
							<th className="py-2 pr-4">Название</th>
							<th className="py-2 pr-4">Валюта</th>
							<th className="py-2 pr-4">Баланс</th>
							<th className="py-2 pr-4">ID</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/5">
						{fiat.length ? (
							fiat.map((w) => (
								<tr key={w.id}>
									<td className="py-2 pr-4">{w.name || "-"}</td>
									<td className="py-2 pr-4">{w.currency || "-"}</td>
									<td className="py-2 pr-4">
										{fmt(w.balance || 0, w.currency)}
									</td>
									<td className="py-2 pr-4 text-white/60">{w.id || "-"}</td>
								</tr>
							))
						) : (
							<tr>
								<td className="py-3 text-white/60" colSpan={4}>
									Нет счетов
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Криптовалютные кошельки */}
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss overflow-x-auto">
				<div className="text-sm text-white/60 mb-2">
					Криптовалютные кошельки
				</div>
				<table className="min-w-full text-sm">
					<thead className="text-white/60">
						<tr className="text-left">
							<th className="py-2 pr-4">Актив</th>
							<th className="py-2 pr-4">Сеть</th>
							<th className="py-2 pr-4">Баланс</th>
							<th className="py-2 pr-4">Эквивалент, $</th>
							<th className="py-2 pr-4">Адрес</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/5">
						{crypto.length ? (
							crypto.map((w, i) => (
								<tr key={i}>
									<td className="py-2 pr-4">{w.asset || w.symbol}</td>
									<td className="py-2 pr-4">{w.network || "-"}</td>
									<td className="py-2 pr-4">
										{Number(w.balance || 0).toLocaleString("ru-RU", {
											maximumFractionDigits: 8,
										})}
									</td>
									<td className="py-2 pr-4">
										$
										{Number(w.usdValue ?? 0).toLocaleString("ru-RU", {
											maximumFractionDigits: 2,
										})}
									</td>
									<td className="py-2 pr-4 break-all text-white/60">
										{w.address || "—"}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td className="py-3 text-white/60" colSpan={5}>
									Нет крипто-кошельков
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
