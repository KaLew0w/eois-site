import { useState, useEffect, useCallback } from "react";
import type { CardType } from "@/shared/types/cardsType";

interface Props {
	activeCard?: CardType | null;
}

const formatPan = (pan: string) => {
	const digits = pan.replace(/\D/g, "");
	return digits.replace(/(.{4})/g, "$1 ").trim();
};

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
};

export default function RequisitesBlock({ activeCard }: Props) {
	const [isRevealed, setIsRevealed] = useState(false);
	const [copyFeedback, setCopyFeedback] = useState<"pan" | "exp" | "cvv" | null>(null);

	useEffect(() => {
		if (!isRevealed) return;
		const timer = setTimeout(() => setIsRevealed(false), 10000);
		return () => clearTimeout(timer);
	}, [isRevealed]);

	const handleCopy = useCallback(
		async (field: "pan" | "exp" | "cvv") => {
			if (!activeCard) return;
			let text = "";
			if (field === "pan") text = activeCard.pan.replace(/\s/g, "");
			else if (field === "exp") text = activeCard.exp || "";
			else if (field === "cvv") text = activeCard.cvv || "";
			const ok = await copyToClipboard(text);
			if (ok) {
				setCopyFeedback(field);
				setTimeout(() => setCopyFeedback(null), 1500);
			}
		},
		[activeCard]
	);

	if (!activeCard)
		return (
			<div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-full">
				<p>Нет активых карт</p>
			</div>
		);

	const pan = activeCard.pan.replace(/\D/g, "");
	const panDisplay = isRevealed
		? formatPan(activeCard.pan)
		: `•••• · •••• · •••• · ${pan.slice(-4)}`;
	const cvvDisplay = isRevealed && activeCard.cvv ? activeCard.cvv : "•••";

	return (
		<div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-full">
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-lg font-semibold">Реквизиты</h3>
				<button
					id="reqRevealBtn"
					type="button"
					className="text-[#43ecfd] text-sm hover:opacity-80 transition-opacity"
					onClick={() => setIsRevealed((v) => !v)}
				>
					{isRevealed ? "Скрыть" : "Показать"}
				</button>
			</div>
			<div className="space-y-3 h-full min-h-full flex flex-col">
				<div>
					<div className="flex items-center justify-between text-xs text-white/60">
						<span>Номер карты</span>
						<button
							id="reqCopyPan"
							type="button"
							className="hover:text-white transition-colors disabled:opacity-50"
							onClick={() => handleCopy("pan")}
						>
							{copyFeedback === "pan" ? "Скопировано" : "Копировать"}
						</button>
					</div>
					<div
						id="reqPanField"
						className="mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 tracking-widest font-mono"
					>
						{panDisplay}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div>
						<div className="flex items-center justify-between text-xs text-white/60">
							<span>Срок действия</span>
							<button
								id="reqCopyExp"
								type="button"
								className="hover:text-white transition-colors disabled:opacity-50"
								onClick={() => handleCopy("exp")}
							>
								{copyFeedback === "exp" ? "Скопировано" : "Копировать"}
							</button>
						</div>
						<div
							id="reqExpField"
							className="mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 tracking-widest"
						>
							{activeCard.exp || "••/••"}
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between text-xs text-white/60">
							<span>CVV</span>
							<button
								id="reqCopyCvv"
								type="button"
								className="hover:text-white transition-colors disabled:opacity-50"
								onClick={() => handleCopy("cvv")}
							>
								{copyFeedback === "cvv" ? "Скопировано" : "Копировать"}
							</button>
						</div>
						<div
							id="reqCvvField"
							className="mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 tracking-widest"
						>
							{cvvDisplay}
						</div>
					</div>
				</div>
				<p className="mt-3 text-xs text-white/50">
					Данные автоматически скрываются через 10 сек.
				</p>
			</div>
		</div>
	);
}
