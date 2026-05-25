import React, { useState, useEffect, useCallback } from "react";
import {
	useWallets,
	useCreateExchange,
} from "@/modules/lk/api/exchange";
import type { CryptoWallet, FiatWallet } from "@/modules/lk/api/exchange";
import {
	calculateExchange,
	parseAmount,
	formatAmount,
	formatRate,
} from "../utils/exchangeCalculator";
import { ExchangeConfirmModal } from "./ExchangeConfirmModal";

interface ExchangeFormProps {
	side: "C2F" | "F2C" | "C2C";
	onSuccess?: () => void;
}

export const ExchangeForm: React.FC<ExchangeFormProps> = ({ side, onSuccess }) => {
	const { fiatWallets, cryptoWallets } = useWallets();
	const createExchange = useCreateExchange();

	const [fromId, setFromId] = useState("");
	const [toId, setToId] = useState("");
	const [amountRaw, setAmountRaw] = useState("");

	const [rate, setRate] = useState(0);
	const [fee, setFee] = useState(0);
	const [net, setNet] = useState(0);
	const [confirmOpen, setConfirmOpen] = useState(false);

	useEffect(() => {
		setFromId("");
		setToId("");
		setAmountRaw("");
	}, [side]);

	const amountDecimals = side === "F2C" ? 2 : 8;
	const resultDecimals = side === "C2F" ? 2 : 8;
	const placeholder = side === "F2C" ? "0.00" : "0.00000000";

	const fromWallet =
		side === "F2C"
			? fiatWallets.find((w) => w.id === fromId)
			: cryptoWallets.find((w) => w.id === fromId);
	const toWallet =
		side === "C2F"
			? fiatWallets.find((w) => w.id === toId)
			: cryptoWallets.find((w) => w.id === toId);

	const fromCurrency = fromWallet
		? "asset" in fromWallet
			? fromWallet.asset
			: fromWallet.currency
		: "";
	const toCurrency = toWallet
		? "asset" in toWallet
			? toWallet.asset
			: toWallet.currency
		: "";

	const parsedAmount = parseAmount(amountRaw, amountDecimals);
	const result = useCallback(() => {
		if (!fromCurrency || !toCurrency || parsedAmount <= 0) return null;
		return calculateExchange({
			from: fromCurrency,
			to: toCurrency,
			amount: parsedAmount,
			feePercent: 0.5,
			decimalPlaces: resultDecimals,
		});
	}, [fromCurrency, toCurrency, parsedAmount, resultDecimals]);

	useEffect(() => {
		const res = result();
		if (res) {
			setRate(res.rate);
			setFee(res.fee);
			setNet(res.net);
		} else {
			setRate(0);
			setFee(0);
			setNet(0);
		}
	}, [result]);

	const canSubmit =
		fromWallet &&
		toWallet &&
		parsedAmount > 0 &&
		(side !== "C2C" || fromId !== toId) &&
		(side === "C2C"
			? Number(fromWallet.balance) >= parsedAmount
			: "balance" in fromWallet && Number(fromWallet.balance) >= parsedAmount);

	const insufficientFunds =
		fromWallet &&
		parsedAmount > 0 &&
		Number(fromWallet.balance) < parsedAmount;
	const sameWalletC2C = side === "C2C" && fromId && toId && fromId === toId;
	const showWarning = canSubmit === false && (insufficientFunds || sameWalletC2C);
	const warningText =
		side === "C2C" && sameWalletC2C
			? "Недостаточно средств или выбраны одинаковые кошельки."
			: "Недостаточно средств.";

	const handleBlurAmount = () => {
		const n = parseAmount(amountRaw, amountDecimals);
		setAmountRaw(n > 0 ? formatAmount(n, amountDecimals) : "");
	};

	const handleSubmitClick = () => {
		if (!canSubmit || !fromWallet || !toWallet) return;
		setConfirmOpen(true);
	};

	const handleConfirm = async () => {
		if (!canSubmit || !fromWallet || !toWallet) return;
		const res = result();
		if (!res) return;
		await createExchange.mutateAsync({
			side,
			fromWallet: fromId,
			toWallet: toId,
			fromStr: `${formatAmount(parsedAmount, amountDecimals)} ${fromCurrency}`,
			toStr:
				side === "C2F"
					? `${res.net.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`
					: `${formatAmount(res.net, 8)} ${toCurrency}`,
			rate: res.rate,
			fee:
				side === "C2F"
					? `${res.fee.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ${toCurrency}`
					: `${res.fee} ${toCurrency}`,
			amount: parsedAmount,
			net: side === "C2F" ? res.net : undefined,
			netCrypto: side !== "C2F" ? res.net : undefined,
		});
		onSuccess?.();
	};

	const feeFormatted =
		side === "C2F"
			? `${fee.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ${toCurrency}`
			: `${fee} ${toCurrency}`;
	const netFormatted =
		side === "C2F"
			? `${net.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`
			: `${net} ${toCurrency}`;

	const fromBalanceStr = fromWallet
		? "asset" in fromWallet
			? `${fromWallet.balance} ${fromWallet.asset}`
			: `${Number(fromWallet.balance).toLocaleString("ru-RU")} ${fromWallet.currency}`
		: "—";
	const toBalanceStr = toWallet
		? "asset" in toWallet
			? `${toWallet.balance} ${toWallet.asset}`
			: `${Number(toWallet.balance).toLocaleString("ru-RU")} ${toWallet.currency}`
		: "—";

	const title =
		side === "C2C"
			? "Конвертация крипто → крипто"
			: side === "C2F"
				? "Обмен криптовалют на фиат"
				: "Обмен фиата на криптовалюту";

	return (
		<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5">
			<div className="text-lg font-semibold mb-3">{title}</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{/* From */}
				<div>
					<label className="text-sm text-white/60">
						{side === "C2F"
							? "Криптокошелёк"
							: side === "F2C"
								? "Фиатный счёт"
								: "Из кошелька"}
					</label>
					<select
						className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						value={fromId}
						onChange={(e) => setFromId(e.target.value)}
					>
						<option value="">Выберите</option>
						{side === "F2C"
							? fiatWallets.map((w) => (
									<option key={w.id} value={w.id}>
										{w.name || w.currency}
									</option>
							  ))
							: cryptoWallets.map((w) => (
									<option key={w.id} value={w.id}>
										{w.asset} • {w.network}
									</option>
							  ))}
					</select>
					<div className="text-xs text-white/50 mt-1">Доступно: {fromBalanceStr}</div>
				</div>

				{/* To */}
				<div>
					<label className="text-sm text-white/60">
						{side === "C2F"
							? "Фиатный счёт"
							: side === "F2C"
								? "Криптокошелёк"
								: "В кошелёк"}
					</label>
					<select
						className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						value={toId}
						onChange={(e) => setToId(e.target.value)}
					>
						<option value="">Выберите</option>
						{side === "C2F"
							? fiatWallets.map((w) => (
									<option key={w.id} value={w.id}>
										{w.name || w.currency}
									</option>
							  ))
							: cryptoWallets
									.filter((w) => side !== "C2C" || w.id !== fromId)
									.map((w) => (
										<option key={w.id} value={w.id}>
											{w.asset} • {w.network}
										</option>
								  ))}
					</select>
					<div className="text-xs text-white/50 mt-1">Доступно: {toBalanceStr}</div>
				</div>

				<div className="sm:col-span-2">
					<label className="text-sm text-white/60">
						Сумма{side === "F2C" ? " (в фиате)" : " (в исходной криптовалюте)"}
					</label>
					<input
						type="text"
						inputMode="decimal"
						autoComplete="off"
						spellCheck={false}
						placeholder={placeholder}
						value={amountRaw}
						onChange={(e) => setAmountRaw(e.target.value)}
						onBlur={handleBlurAmount}
						className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white"
					/>
				</div>
			</div>

			<div className="mt-3 text-sm text-white/80 space-y-1">
				<div>
					Курс:{" "}
					<span className="text-white/60">
						{rate > 0 ? formatRate(rate, fromCurrency, toCurrency) : "—"}
					</span>
				</div>
				<div>
					Комиссия (0.5%): <span className="text-white/60">{rate > 0 ? feeFormatted : "—"}</span>
				</div>
				<div>
					{side === "F2C" ? "К зачислению (крипто): " : "К зачислению: "}
					<span className="text-emerald-400">{rate > 0 ? netFormatted : "—"}</span>
				</div>
				{showWarning && (
					<div className="text-red-400">{warningText}</div>
				)}
			</div>

			<div className="mt-4">
				<button
					type="button"
					onClick={handleSubmitClick}
					disabled={!canSubmit}
					className={`cta-button px-4 py-2 rounded-xl w-full sm:w-auto ${
						canSubmit ? "" : "opacity-50 pointer-events-none"
					}`}
					style={canSubmit ? { backgroundColor: "#00eefd", color: "#000" } : undefined}
				>
					Обменять
				</button>
			</div>

			<ExchangeConfirmModal
				isOpen={confirmOpen}
				title="Подтвердите обмен"
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleConfirm}
			>
				{fromWallet && toWallet && (
					<>
						<p>
							Списать {formatAmount(parsedAmount, amountDecimals)} {fromCurrency} → Зачислить
							~{side === "C2F" ? net.toLocaleString("ru-RU", { maximumFractionDigits: 2 }) : formatAmount(net, 8)}{" "}
							{toCurrency}
						</p>
						<p className="text-white/60 text-sm mt-1">
							Курс: {formatRate(rate, fromCurrency, toCurrency)} • Комиссия: {feeFormatted}
						</p>
					</>
				)}
			</ExchangeConfirmModal>
		</div>
	);
};
