import React, { useState } from "react";
import { useExchanges, useWallets } from "@/modules/lk/api/exchange";
import type { CryptoWallet, FiatWallet } from "@/modules/lk/api/exchange";
import { exportExchangesCSV } from "../utils/exportCSV";

function walletDisplayName(
	w: CryptoWallet | FiatWallet | undefined,
): string {
	if (!w) return "";
	if ("name" in w && w.name) return w.name;
	if ("asset" in w) return `${w.asset} • ${w.network}`;
	return "currency" in w ? w.currency : "";
}

export const ExchangeHistory: React.FC = () => {
	const [wallet, setWallet] = useState("any");
	const { fiatWallets, cryptoWallets } = useWallets();
	const { data: rows } = useExchanges(wallet);
	const allWallets = [...fiatWallets, ...cryptoWallets];

	const handleExportCSV = () => {
		exportExchangesCSV(rows ?? [], "exchanges");
	};

	return (
		<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
				<div className="text-lg font-semibold">История обменов</div>
				<div className="flex gap-2">
					<select
						className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						value={wallet}
						onChange={(e) => setWallet(e.target.value)}
					>
						<option value="any">Любой</option>
						{allWallets.map((w) => (
							<option key={w.id} value={w.id}>
								{walletDisplayName(w as CryptoWallet | FiatWallet) || w.id}
							</option>
						))}
					</select>
					<button
						type="button"
						onClick={handleExportCSV}
						className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm"
					>
						Экспорт CSV
					</button>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-xs sm:text-sm">
					<thead className="text-white/60">
						<tr className="text-left">
							<th className="py-2 pr-4 whitespace-nowrap">Дата</th>
							<th className="py-2 pr-4">Из</th>
							<th className="py-2 pr-4">В</th>
							<th className="py-2 pr-4 whitespace-nowrap">Курс</th>
							<th className="py-2 pr-4 whitespace-nowrap">Комиссия</th>
							<th className="py-2 pr-4 whitespace-nowrap">Статус</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/5">
						{rows && rows.length > 0 ? (
							rows.map((r) => {
								const fromW = allWallets.find((w) => w.id === r.fromWallet);
								const toW = allWallets.find((w) => w.id === r.toWallet);
								const fromName = walletDisplayName(fromW as CryptoWallet | FiatWallet | undefined);
								const toName = walletDisplayName(toW as CryptoWallet | FiatWallet | undefined);
								return (
									<tr key={r.id}>
										<td className="py-2 pr-4 whitespace-nowrap">{r.dt}</td>
										<td className="py-2 pr-4">
											{r.fromStr}
											{fromName && (
												<div className="text-white/50 text-[11px]">{fromName}</div>
											)}
										</td>
										<td className="py-2 pr-4">
											{r.toStr}
											{toName && (
												<div className="text-white/50 text-[11px]">{toName}</div>
											)}
										</td>
										<td className="py-2 pr-4 whitespace-nowrap">
											{Number(r.rate).toLocaleString("ru-RU", {
												maximumFractionDigits: 8,
											})}
										</td>
										<td className="py-2 pr-4 whitespace-nowrap">{r.fee}</td>
										<td className="py-2 pr-4 whitespace-nowrap">
											<span className="px-2 py-1 text-[10px] sm:text-xs rounded bg-white/10">
												{r.status || "done"}
											</span>
										</td>
									</tr>
								);
							})
						) : null}
					</tbody>
				</table>
			</div>
			{(!rows || rows.length === 0) && (
				<div className="text-white/60 text-sm mt-2">Пока пусто.</div>
			)}
		</div>
	);
};
