import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import PaySectionCard from "./components/PaySectionCard";
import SettingsSectionCard from "./components/SettingsSectionCard";
import HistorySectionCard from "./components/HistorySectionCard";
import LogoWhite from "@/assets/images/logo_white.png";
import {
	useCards,
	useRevealCardDetails,
	useFreezeCard,
	useUnfreezeCard,
} from "@/modules/lk/hooks/useCards";
import { GRADIENTS } from "@/shared/utils/cardsStyle";
import type { CardDetails } from "@/modules/lk/services/cardsService";
import "./stylesCardPage.css";

export default function CardsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentTab = searchParams.get("tab") || "payCard";
	const [selectedCardId, setSelectedCardId] = useState<string>("");
	const [revealedDetails, setRevealedDetails] = useState<{
		pan: string;
		exp: string;
		cvv: string;
	} | null>(null);
	const [isRevealed, setIsRevealed] = useState(false);
	const [panShownOnCard, setPanShownOnCard] = useState(false);
	const [cvvShownOnCard, setCvvShownOnCard] = useState(false);

	const { data: cards = [], isLoading } = useCards();
	const revealMutation = useRevealCardDetails();
	const freezeMutation = useFreezeCard();
	const unfreezeMutation = useUnfreezeCard();

	const tabs = [
		{ id: "payCard", label: "Оплата" },
		{ id: "historyCard", label: "История" },
		{ id: "settingsCard", label: "Настройки" },
	];

	// Синхронизация выбора карты с URL и списком
	useEffect(() => {
		const cardFromUrl = searchParams.get("card");
		if (cards.length === 0) return;
		if (cardFromUrl && cards.some((c) => c.id === cardFromUrl)) {
			setSelectedCardId(cardFromUrl);
		} else if (!selectedCardId || !cards.some((c) => c.id === selectedCardId)) {
			setSelectedCardId(cards[0].id);
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				next.set("card", cards[0].id);
				return next;
			});
		}
	}, [cards, searchParams]);

	const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

	// Сохранение активной вкладки в URL при смене карты
	const handleCardChange = (cardId: string) => {
		setSelectedCardId(cardId);
		setRevealedDetails(null);
		setIsRevealed(false);
		setPanShownOnCard(false);
		setCvvShownOnCard(false);
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.set("card", cardId);
			return next;
		});
	};

	const handleTabChange = (tab: string) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.set("tab", tab);
			if (selectedCardId) next.set("card", selectedCardId);
			return next;
		});
	};


	const handleRevealDetails = async (): Promise<{
		pan: string;
		exp: string;
		cvv: string;
	} | null> => {
		if (!selectedCard) return null;

		if (isRevealed) {
			setRevealedDetails(null);
			setIsRevealed(false);
			setPanShownOnCard(false);
			setCvvShownOnCard(false);
			return null;
		}

		try {
			const details = await revealMutation.mutateAsync(selectedCard.id);
			setRevealedDetails(details);
			setIsRevealed(true);
			setTimeout(() => {
				setRevealedDetails(null);
				setIsRevealed(false);
				setPanShownOnCard(false);
				setCvvShownOnCard(false);
			}, 10000);
			return details;
		} catch (error) {
			console.error("Failed to reveal card details:", error);
			return null;
		}
	};

	const maskPan = (pan: string) =>
		pan && pan.length >= 8
			? `${pan.slice(0, 4)} · ${pan.slice(4, 6)}•• · •••• · ${pan.slice(-4)}`
			: `•••• · •••• · •••• · ${(pan || "").replace(/\D/g, "").slice(-4) || "••••"}`;

	const handleShowPanOnCard = async () => {
		if (panShownOnCard) {
			setPanShownOnCard(false);
			return;
		}
		const details = revealedDetails || (await handleRevealDetails());
		if (details) {
			setPanShownOnCard(true);
			try {
				await navigator.clipboard.writeText(details.pan.replace(/\s/g, ""));
			} catch {}
		}
	};

	const handleShowCvvOnCard = async () => {
		if (cvvShownOnCard) {
			setCvvShownOnCard(false);
			return;
		}
		const details = revealedDetails || (await handleRevealDetails());
		if (details) setCvvShownOnCard(true);
	};

	const formatPanForRequisites = (pan: string, revealed: boolean): string => {
		if (revealed && revealedDetails) {
			return revealedDetails.pan.replace(/(.{4})/g, "$1 ").trim();
		}
		const parts = pan.match(/.{1,4}/g) || [];
		if (parts.length >= 4) {
			return `${parts[0]} · ${parts[1].slice(0, 2)}•• · •••• · ${parts[3]}`;
		}
		return `•••• · •••• · •••• · ${pan.slice(-4)}`;
	};

	const getCardBackground = (card: CardDetails | undefined) => {
		if (!card) {
			return "radial-gradient(120% 120% at 0% 0%, #00eefd 0%, rgba(0,238,253,.25) 35%, rgba(18,18,18,0) 60%), linear-gradient(135deg,#0f1115,#1f2937)";
		}
		const gradient = GRADIENTS[card.gradient || "mint"] || GRADIENTS.mint;
		return `radial-gradient(120% 120% at 0% 0%, rgba(0,238,253,0.3) 0%, rgba(0,238,253,.15) 35%, rgba(18,18,18,0) 60%), ${gradient}`;
	};

	const getBrandLogo = (brand: string | undefined) => {
		if (!brand) return "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
		return brand.toLowerCase().includes("visa")
			? "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
			: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/960px-Mastercard-logo.svg.png";
	};

	const formatMoney = (value: string | number | undefined, currency: string) => {
		const n = Number(value ?? 0);
		const opts: Intl.NumberFormatOptions = {
			minimumFractionDigits: currency === "USD" ? 2 : 0,
			maximumFractionDigits: 2,
		};
		return `${n.toLocaleString("ru-RU", opts)} ${currency}`;
	};

	const handleToggleFreeze = async () => {
		if (!selectedCard) return;
		const isPending = freezeMutation.isPending || unfreezeMutation.isPending;
		if (isPending) return;
		if (selectedCard.active) {
			await freezeMutation.mutateAsync(selectedCard.id);
		} else {
			await unfreezeMutation.mutateAsync(selectedCard.id);
		}
	};

	const [copyFeedback, setCopyFeedback] = useState<"pan" | "exp" | "cvv" | null>(null);

	const copyToClipboard = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			return false;
		}
	}, []);

	const handleCopy = useCallback(
		async (field: "pan" | "exp" | "cvv") => {
			let text = "";
			if (field === "pan") {
				text =
					isRevealed && revealedDetails
						? revealedDetails.pan.replace(/\s/g, "")
						: (selectedCard?.pan || "").replace(/\D/g, "").slice(-4);
			} else if (field === "exp" && isRevealed && revealedDetails) {
				text = revealedDetails.exp;
			} else if (field === "cvv" && isRevealed && revealedDetails) {
				text = revealedDetails.cvv;
			}
			if (!text) return;
			const ok = await copyToClipboard(text);
			if (ok) {
				setCopyFeedback(field);
				setTimeout(() => setCopyFeedback(null), 1500);
			}
		},
		[copyToClipboard, isRevealed, revealedDetails, selectedCard?.pan]
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-white/60">Загрузка карт...</div>
			</div>
		);
	}

	if (!selectedCard) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-white/60">Нет доступных карт</div>
			</div>
		);
	}

	return (
		<div className="min-w-0">
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold">Карты и платежи</h1>
				<a
					href="#"
					id="btnIssueCard"
					className="cta-button px-4 py-2 rounded-xl shrink-0"
				>
					Выпустить карту
				</a>
			</div>
			<section className="grid xl:grid-cols-3 gap-6">
				<div className="min-w-0 xl:col-span-2 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss">
					<div className="grid md:grid-cols-2 gap-4">
						<div className="min-w-0">
							<label className="text-sm text-white/60">Выберите карту</label>
							<select
								id="cardSelect"
								value={selectedCardId}
								onChange={(e) => handleCardChange(e.target.value)}
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
							>
								{cards.map((card) => (
									<option key={card.id} value={card.id}>
										{card.currency} • {card.name} • {card.pan.slice(-4)}
									</option>
								))}
							</select>
							<div className="mt-4">
								<div
									className="relative rounded-2xl p-5 min-h-[180px] w-full overflow-hidden"
									style={{ background: getCardBackground(selectedCard) }}
								>
									<div className="absolute inset-0 opacity-15 bg-[radial-gradient(80%_60%_at_90%_20%,white,transparent)]" />
									<img src={LogoWhite} className="h-6" alt="logo" />
									{!selectedCard.isPhysical && (
										<span className="absolute top-3 right-3 text-[10px] tracking-widest bg-black/40 px-2 py-1 rounded-md text-white/90">
											VIRTUAL
										</span>
									)}
									<div className="mt-6 text-xl tracking-widest text-white/90" id="panText">
										{panShownOnCard && revealedDetails
											? revealedDetails.pan.replace(/(.{4})/g, "$1 ").trim()
											: maskPan(selectedCard.pan)}
									</div>
									<div className="mt-2 flex gap-6 text-sm text-white/80">
										<div>
											VALID
											<br />
											<span id="expText">
												{isRevealed && revealedDetails
													? revealedDetails.exp
													: selectedCard.exp || "••/••"}
											</span>
										</div>
										<div>
											CVV
											<br />
											<span id="cvvText">
												{cvvShownOnCard && revealedDetails
													? revealedDetails.cvv
													: "***"}
											</span>
										</div>
									</div>
									<div className="mt-6 flex items-center justify-between text-sm text-white/90">
										<div>{selectedCard.name}</div>
										<img
											src={getBrandLogo(selectedCard.brand)}
											className="h-5 opacity-90"
											alt={selectedCard.brand}
										/>
									</div>
									<div className="absolute bottom-4 right-20 md:right-24 flex gap-2">
										<button
											type="button"
											id="btnShowPan"
											onClick={handleShowPanOnCard}
											disabled={revealMutation.isPending}
											className="text-xs bg-black/30 hover:bg-black/40 px-2 py-1 rounded text-white/90 disabled:opacity-50"
										>
											{panShownOnCard ? "Скрыть номер" : "Показать номер"}
										</button>
										<button
											type="button"
											id="btnShowCVV"
											onClick={handleShowCvvOnCard}
											disabled={revealMutation.isPending}
											className="text-xs bg-black/30 hover:bg-black/40 px-2 py-1 rounded text-white/90 disabled:opacity-50"
										>
											{cvvShownOnCard ? "Скрыть CVV" : "Показать CVV"}
										</button>
									</div>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
									<div className="bg-white/5 border border-white/10 p-3 rounded-xl min-w-0">
										<div className="text-sm text-white/60">Баланс</div>
										<div className="font-medium truncate">
											{formatMoney(selectedCard.balance, selectedCard.currency)}
										</div>
									</div>
									<div className="bg-white/5 border border-white/10 p-3 rounded-xl min-w-0">
										<div className="text-sm text-white/60">Статус</div>
										<div className="font-medium" id="cardStatus">
											{selectedCard.active ? "Активна" : "Заморожена"}
										</div>
									</div>
									<div className="flex items-center justify-end">
										<button
											type="button"
											id="btnToggleFreeze"
											onClick={handleToggleFreeze}
											disabled={freezeMutation.isPending || unfreezeMutation.isPending}
											className="cta-button w-full sm:w-auto px-4 py-2 rounded-xl disabled:opacity-50"
										>
											{selectedCard.active ? "Заморозить" : "Активировать"}
										</button>
									</div>
								</div>
								{/* <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
									<div className="flex items-center justify-between mb-2">
										<h3 className="text-lg font-semibold">Реквизиты</h3>
										<button
											type="button"
											id="reqRevealBtn"
											onClick={handleRevealDetails}
											disabled={revealMutation.isPending}
											className="text-[#00eefd] text-sm hover:text-[#00d4e6] disabled:opacity-50"
										>
											{isRevealed ? "Скрыть" : "Показать"}
										</button>
									</div>
									<div className="space-y-3">
										<div>
											<div className="flex items-center justify-between text-xs text-white/60">
												<span>Номер карты</span>
												<button
													type="button"
													id="reqCopyPan"
													onClick={() => handleCopy("pan")}
													className="hover:text-white transition-colors disabled:opacity-50"
												>
													{copyFeedback === "pan" ? "Скопировано" : "Копировать"}
												</button>
											</div>
											<div
												id="reqPanField"
												className="mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 tracking-widest"
											>
												{isRevealed && revealedDetails
													? formatPanForRequisites(revealedDetails.pan, true)
													: formatPanForRequisites(selectedCard.pan, false)}
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div>
												<div className="flex items-center justify-between text-xs text-white/60">
													<span>VALID</span>
													<button
														type="button"
														id="reqCopyExp"
														onClick={() => handleCopy("exp")}
														disabled={!isRevealed || !revealedDetails}
														className="hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
													>
														{copyFeedback === "exp" ? "Скопировано" : "Копировать"}
													</button>
												</div>
												<div
													id="reqExpField"
													className="mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
												>
													{isRevealed && revealedDetails
														? revealedDetails.exp
														: "••/••"}
												</div>
											</div>
											<div>
												<div className="flex items-center justify-between text-xs text-white/60">
													<span>CVV</span>
													<button
														type="button"
														id="reqCopyCvv"
														onClick={() => handleCopy("cvv")}
														disabled={!isRevealed || !revealedDetails}
														className="hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
													>
														{copyFeedback === "cvv" ? "Скопировано" : "Копировать"}
													</button>
												</div>
												<div
													id="reqCvvField"
													className="mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
												>
													{isRevealed && revealedDetails
														? revealedDetails.cvv
														: "•••"}
												</div>
											</div>
										</div>
										{isRevealed && (
											<div className="text-xs text-white/40">
												Данные автоматически скрываются через 10 сек.
											</div>
										)}
									</div>
								</div> */}
							</div>
						</div>
						<div className="min-w-0">
							<div className="mb-4">
								<div className="border-b border-white/10 mb-4 flex flex-wrap items-center gap-2">
									{tabs.map((t) => (
										<button
											key={t.id}
											type="button"
											onClick={() => handleTabChange(t.id)}
											className={`tabbtn px-3 py-2 rounded-xl cursor-pointer ${
												currentTab === t.id ? "bg-white/10 text-white" : ""
											}`}
										>
											{t.label}
										</button>
									))}
								</div>
							</div>
							{currentTab === "payCard" && (
								<PaySectionCard card={selectedCard} />
							)}
							{currentTab === "settingsCard" && (
								<SettingsSectionCard card={selectedCard} />
							)}
							{currentTab === "historyCard" && (
								<HistorySectionCard card={selectedCard} />
							)}
						</div>
					</div>
				</div>
				<div className="min-w-0 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss">
					<div className="text-sm text-white/60">Подсказки</div>
					<ul className="mt-2 space-y-2 text-sm text-white/80 list-disc pl-5">
						<li>
							Номер и CVV скрыты — показывайте их только при необходимости.
						</li>
						<li>
							Если видите подозрительные операции — заморозьте карту и
							обратитесь в поддержку.
						</li>
						<li>
							Перевыпуск физической карты доступен в разделе «Настройки».
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
}
