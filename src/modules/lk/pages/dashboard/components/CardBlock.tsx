import React from "react";
import LogoWhite from "@/assets/images/logo_white.png";
import type { CardType } from "@/shared/types/cardsType";
// import GRADIENTS from '../../../../utils/cardsStyle'

const GRADIENTS: Record<string, string> = {
	mint: "linear-gradient(135deg,#00eefd,#32ffb1)",
	whiteMint: "linear-gradient(135deg,#ffffff,#44ffb4)",
	deep: "linear-gradient(135deg,#0f172a,#334155)",
	sunset: "linear-gradient(135deg,#7b5cff,#40c6ff)",
	royal: "linear-gradient(135deg,#7c3aed,#06b6d4)",
	monoDark: "linear-gradient(135deg,#191919,#191919)",
};

interface Props {
	cards: CardType[];
	activeCardId?: string | null;
	onChangeCard: (id: string) => void;
}

export default function CardBlock({
	cards,
	activeCardId,
	onChangeCard,
}: Props) {
	const activeCard = cards.find((c) => c.id === activeCardId) ?? cards[0];

	return (
		<div className="relative">
			<div
				id="dashCard"
				className="gradient-card relative rounded-2xl p-6 min-h-[260px] overflow-hidden w-full md:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[620px] text-white shadow-xl h-[calc(100%-88px)]"
				style={{ background: GRADIENTS[activeCard?.gradient ?? "monoDark"] }}
				role="button"
				aria-label="bank-card"
				onClick={() => onChangeCard(activeCard.id)}
			>
				<img src={LogoWhite} className="h-12" alt="logo" />
				<span
					id="dcTypeBadge"
					className="absolute top-3 right-3 text-sm tracking-widest bg-black/40 px-3 py-1 rounded-md"
				>
					{activeCard?.isPhysical ? "PHYSICAL" : "VIRTUAL"}
				</span>

				<div className="absolute left-5 bottom-4">
					<div id="dcName" className="text-lg text-white/90">
						{activeCard?.currency} • {activeCard?.name}
					</div>
				</div>
				<div className="absolute right-5 bottom-14 text-right">
					<div className="text-xs tracking-widest text-white/70">Последние 4</div>
					<div id="dcLast4" className="text-4xl font-semibold">
						{String(activeCard?.pan).slice(-4)}
					</div>
				</div>
				<img
					id="dcBrand"
					src={
						activeCard?.brand?.toLowerCase().includes("visa")
							? "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
							: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/960px-Mastercard-logo.svg.png"
					}
					alt="brand"
					className="h-7 opacity-90 absolute right-5 bottom-4"
				/>

				<div className="hidden mt-6 text-xl tracking-widest" id="dcPan">
					{`•••• · •••• · •••• · ${String(activeCard?.pan).slice(-4)}`}
				</div>
				<div className="hidden mt-2 flex gap-6 text-sm">
					<div>
						VALID<br />
						<span id="dcExp">{activeCard?.exp || "••/••"}</span>
					</div>
					<div>
						CVV<br />
						<span id="dcCVV">***</span>
					</div>
				</div>

				<div
					id="copyToast"
					className="hidden absolute left-4 bottom-16 text-xs bg-black/60 px-2 py-1 rounded"
				>
					Скопировано
				</div>
			</div>

			<div className="mt-3 w-full max-w-[420px] mt-auto">
				<label className="text-sm text-white/60">Выберите карту</label>
				<select
					id="dashCardSelect"
					className="mt-1 w-full max-w-[360px] bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
					value={activeCard?.id}
					onChange={(e) => onChangeCard(e.target.value)}
				>
					{cards.map((c) => (
						<option key={c.id} value={c.id}>
							{c.currency} • {c.name} • {String(c.pan).slice(-4)}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
