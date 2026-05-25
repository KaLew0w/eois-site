import React, { useState, useEffect } from "react";
import { ExchangeForm } from "./components/ExchangeForm";
import { ExchangeHistory } from "./components/ExchangeHistory";
import { ExchangeCalculator } from "./components/ExchangeCalculator";

const EXCHANGE_TAB_KEY = "exchangeTab";

export const ExchangePage: React.FC = () => {
	const [side, setSide] = useState<"C2F" | "F2C" | "C2C">("C2F");
	const [toastMsg, setToastMsg] = useState<string | null>(null);

	useEffect(() => {
		const saved = localStorage.getItem(EXCHANGE_TAB_KEY);
		if (saved === "C2F" || saved === "F2C" || saved === "C2C") {
			setSide(saved);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(EXCHANGE_TAB_KEY, side);
	}, [side]);

	useEffect(() => {
		if (!toastMsg) return;
		const t = setTimeout(() => setToastMsg(null), 1800);
		return () => clearTimeout(t);
	}, [toastMsg]);

	return (
		<div className="p-4 space-y-6">
			<header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
				<h1 className="text-2xl font-semibold">Обмен валют</h1>
				<div className="inline-flex bg-white/5 border border-white/10 rounded-xl overflow-hidden">
					<button
						onClick={() => setSide("C2F")}
						className={`px-3 sm:px-4 py-2 cursor-pointer ${
							side === "C2F" ? "bg-[#00eefd] text-black" : "text-white/80"
						}`}
					>
						Крипто → Фиат
					</button>
					<button
						onClick={() => setSide("F2C")}
						className={`px-3 sm:px-4 py-2 cursor-pointer ${
							side === "F2C" ? "bg-[#00eefd] text-black" : "text-white/80"
						}`}
					>
						Фиат → Крипто
					</button>
					<button
						onClick={() => setSide("C2C")}
						className={`px-3 sm:px-4 py-2 cursor-pointer ${
							side === "C2C" ? "bg-[#00eefd] text-black" : "text-white/80"
						}`}
					>
						Конвертация
					</button>
				</div>
			</header>

			<section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2 space-y-4">
					<ExchangeForm side={side} onSuccess={() => setToastMsg("Обмен выполнен")} />
					<ExchangeHistory />
				</div>
				<div>
					<ExchangeCalculator />
				</div>
			</section>

			{toastMsg && (
				<div
					className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm z-50"
					role="status"
				>
					{toastMsg}
				</div>
			)}
		</div>
	);
};
