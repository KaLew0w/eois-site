import React, { useState, useCallback } from "react";
import {
	FIAT_LIST,
	CRYPTO_LIST,
	calculateRate,
	parseAmount,
	formatRate,
} from "../utils/exchangeCalculator";

const CURRENCY_OPTIONS = [...CRYPTO_LIST, ...FIAT_LIST];

export const ExchangeCalculator: React.FC = () => {
	const [from, setFrom] = useState("BTC");
	const [to, setTo] = useState("RUB");
	const [amountRaw, setAmountRaw] = useState("");

	const amount = parseAmount(amountRaw, 8);
	const rate = useCallback(
		() => (from && to ? calculateRate(from, to) : 0),
		[from, to],
	);
	const r = rate();
	const result = r > 0 && amount > 0 ? amount * r : 0;

	return (
		<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5">
			<div className="text-lg font-semibold mb-3">Калькулятор обмена</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
				<select
					id="calcFrom"
					className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
					value={from}
					onChange={(e) => setFrom(e.target.value)}
				>
					{CURRENCY_OPTIONS.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
				<input
					id="calcAmt"
					type="text"
					inputMode="decimal"
					autoComplete="off"
					spellCheck={false}
					placeholder="0.0000"
					value={amountRaw}
					onChange={(e) => setAmountRaw(e.target.value)}
					className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white"
				/>
				<select
					id="calcTo"
					className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
					value={to}
					onChange={(e) => setTo(e.target.value)}
				>
					{CURRENCY_OPTIONS.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</select>
			</div>
			<div className="mt-3 text-sm text-white/80 space-y-1">
				<div>
					Курс:{" "}
					<span className="text-white/60">
						{r > 0 && from && to ? formatRate(r, from, to) : "—"}
					</span>
				</div>
				<div>
					≈{" "}
					<span className="text-emerald-400">
						{result > 0 && to
							? `${result.toLocaleString("ru-RU", { maximumFractionDigits: 8 })} ${to}`
							: "—"}
					</span>
				</div>
			</div>
			<p className="text-xs text-white/50 mt-2">
				Расчёт ознакомительный. Точный курс и комиссия — в форме.
			</p>
		</div>
	);
};
