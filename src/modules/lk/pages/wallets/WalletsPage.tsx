import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFiatAccounts, useCryptoAccounts } from "@/modules/lk/hooks/useAccounts";
import ModalCreateCryptoWallet from "./components/ModalCreateCryptoWallet";
import ModalCreateFiatAccount from "./components/ModalCreateFiatAccount";
import "./style.css";

export default function WalletsPage() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<"fiat" | "crypto">("fiat");
	const [isModalOpenFiat, setIsModalOpenFiat] = useState(false);
	const [isModalOpenCrypto, setIsModalOpenCrypto] = useState(false);
	const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

	const openModalFiat = () => setIsModalOpenFiat(true);
	const closeModalFiat = () => setIsModalOpenFiat(false);
	const openModalCrypto = () => setIsModalOpenCrypto(true);
	const closeModalCrypto = () => setIsModalOpenCrypto(false);

	const toggleMenu = (menuId: string) => {
		setOpenMenus((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(menuId)) {
				newSet.delete(menuId);
			} else {
				newSet.add(menuId);
			}
			return newSet;
		});
	};

	const closeMenu = (menuId: string) => {
		setOpenMenus((prev) => {
			const newSet = new Set(prev);
			newSet.delete(menuId);
			return newSet;
		});
	};

	const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

	const handleCopy = useCallback(async (text: string, feedbackKey: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopyFeedback(feedbackKey);
			setTimeout(() => setCopyFeedback(null), 1500);
		} catch {
			// clipboard API не поддерживается или отклонён
		}
	}, []);

	// Закрытие всех меню при клике вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".kebab-btn") && !target.closest(".kebab-menu")) {
				setOpenMenus(new Set());
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// 🔹 Фиат загружается только если выбрана вкладка "fiat"
	const fiatQuery = useFiatAccounts({
		enabled: activeTab === "fiat",
	});

	// 🔹 Крипта — только если выбрана вкладка "crypto"
	const cryptoQuery = useCryptoAccounts({
		enabled: activeTab === "crypto",
	});

	// 🔹 Выбираем актуальные данные
	const isLoading =
		activeTab === "fiat" ? fiatQuery.isLoading : cryptoQuery.isLoading;
	const data = activeTab === "fiat" ? fiatQuery.data : cryptoQuery.data;

	return (
		<div className="space-y-6">
			<header className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Кошельки</h1>
				<div className="flex gap-2">
					<button
						type="button"
						id="btnBackup"
						className="cta-button rounded-xl flex items-center justify-center
           bg-transparent border border-[#58e5f7]/70 hover:border-[#58e5f7]
           text-[#58e5f7] hover:text-[#58e5f7]
           w-10 h-10 px-0 py-0
           sm:w-auto sm:h-auto sm:px-4 sm:py-2 cursor-pointer"
						aria-label="Резервное копирование"
						title="Резервное копирование"
					>
						<span className="hidden sm:inline">Резервное копирование</span>

						<span className="sm:hidden" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="20" height="20" fill="none">
								<path
									d="M12 3v10"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
								/>
								<path
									d="M8.5 10.5 12 13.9l3.5-3.4"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5 15.5c0 2 1.6 3.5 3.6 3.5h6.8c2 0 3.6-1.5 3.6-3.5v-1.2"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
								/>
							</svg>
						</span>
					</button>
				</div>
			</header>

			{/* Переключатель вкладок */}
			<div className="mb-4 flex items-center gap-2 text-sm">
				<button
					type="button"
					onClick={() => setActiveTab("fiat")}
					className={`tab-btn cursor-pointer px-3 py-2 rounded-xl border border-white/10 ${
						activeTab === "fiat" ? "bg-white/10" : "bg-white/5"
					}`}
				>
					Фиатные счета
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("crypto")}
					className={`tab-btn cursor-pointer px-3 py-2 rounded-xl border border-white/10 ${
						activeTab === "crypto" ? "bg-white/10" : "bg-white/5"
					}`}
				>
					Криптовалютные кошельки
				</button>
			</div>

			{isLoading ? (
				<div className="text-white animate-pulse">Загрузка...</div>
			) : activeTab === "fiat" ? (
				<section className="space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-semibold">Фиатные счета</h2>
						<div className="flex gap-2">
							<button
								id="btnCreateFiat"
								className="cta-button rounded-xl flex items-center justify-center
           w-10 h-10 px-0 py-0
           sm:w-auto sm:h-auto sm:px-4 sm:py-2"
								onClick={openModalFiat}
								aria-label="Создать фиатный счёт"
								title="Создать фиатный счёт"
							>
								<span className="hidden sm:inline">Создать фиатный счёт</span>
								{/* Mobile: SVG plus */}
								<span className="sm:hidden" aria-hidden="true">
									<svg viewBox="0 0 24 24" width="20" height="20" fill="none">
										<path
											d="M12 5v14M5 12h14"
											stroke="currentColor"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							</button>
						</div>
					</div>
					<div id="fiatList" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
						{data?.map((acc: any) => {
							const currency = acc.currency?.toLowerCase() || "";
							const name = acc.name?.toLowerCase().replace(/\s+/g, "-") || "main";
							const accountId = `${currency}-${name}`;
							const menuId = `fiat-menu-${accountId}`;
							const isMenuOpen = openMenus.has(menuId);
							
							return (
								<div
									key={acc.iban}
									className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss"
								>
									<div className="flex items-start justify-between">
										<div>
											<div className="text-sm text-white/60">
												{acc.currency}
												<span className="mx-2 text-white/25">●</span>
												<span
													className={`text-xs ${
														acc.active ? "text-emerald-400" : "text-red-400"
													}`}
												>
													{acc.active ? "Активен" : "Неактивен"}
												</span>
											</div>
											<div className="font-semibold mt-1">
												{acc.currency} • {acc.name}
											</div>
										</div>
										<div className="relative flex flex-col items-end">
											{/* Kebab menu button */}
											<button
												type="button"
												className="kebab-btn p-1.5 -mr-1 text-white/55 hover:text-white/85 transition"
												onClick={() => toggleMenu(menuId)}
												aria-haspopup="menu"
												aria-expanded={isMenuOpen}
												title="Действия"
											>
												<svg
													viewBox="0 0 24 24"
													width="18"
													height="18"
													fill="none"
													aria-hidden="true"
												>
													<circle
														cx="12"
														cy="6"
														r="1.6"
														fill="currentColor"
													></circle>
													<circle
														cx="12"
														cy="12"
														r="1.6"
														fill="currentColor"
													></circle>
													<circle
														cx="12"
														cy="18"
														r="1.6"
														fill="currentColor"
													></circle>
												</svg>
											</button>

											{/* Kebab menu */}
											<div
												id={menuId}
												className={`kebab-menu absolute right-0 top-full mt-2 w-56 bg-[#121212] border border-white/10 rounded-xl p-2 shadow-lg z-30 ${
													isMenuOpen ? "" : "hidden"
												}`}
												role="menu"
											>
												<button
													type="button"
													id={`fiat-details-${accountId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => {
														closeMenu(menuId);
														navigate(`/lk/wallets/details?type=fiat&id=${accountId}`);
													}}
												>
													Подробнее
												</button>
												<button
													type="button"
													id={`fiat-history-${accountId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => {
														closeMenu(menuId);
														navigate("/lk/transactions");
													}}
												>
													История
												</button>
												<button
													type="button"
													id={`fiat-rename-${accountId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => closeMenu(menuId)}
												>
													Переименовать
												</button>
												<button
													type="button"
													id={`fiat-toggle-${accountId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => closeMenu(menuId)}
												>
													Деактивировать
												</button>

												<div className="my-2 border-t border-white/10"></div>

												<button
													type="button"
													id={`fiat-delete-${accountId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/10"
													onClick={() => closeMenu(menuId)}
												>
													Удалить
												</button>
											</div>
										</div>
									</div>

									<div className="mt-3 text-xl font-semibold">{acc.balance}</div>

									<div className="mt-3 grid grid-cols-2 gap-2 text-xs">
										<div>
											<div className="text-white/50">IBAN</div>
											<div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 break-all">
												{acc.iban}
											</div>
											<button
												type="button"
												id={`fiat-copy-iban-${accountId}`}
												className="text-[#00eefd] hover:underline mt-1 inline-block"
												onClick={() => handleCopy(acc.iban || "", `fiat-iban-${accountId}`)}
											>
												{copyFeedback === `fiat-iban-${accountId}` ? "Скопировано" : "Копировать"}
											</button>
										</div>
										<div>
											<div className="text-white/50">Счёт</div>
											<div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 break-all">
												{acc.account}
											</div>
											<button
												type="button"
												id={`fiat-copy-acc-${accountId}`}
												className="text-[#00eefd] hover:underline mt-1 inline-block"
												onClick={() => handleCopy(acc.account || "", `fiat-acc-${accountId}`)}
											>
												{copyFeedback === `fiat-acc-${accountId}` ? "Скопировано" : "Копировать"}
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			) : (
				<section className="space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-semibold">Криптовалютные кошельки</h2>
						<div className="flex gap-2">
							<button
								onClick={openModalCrypto}
								id="btnCreateCrypto"
								className="cta-button rounded-xl flex items-center justify-center
           w-10 h-10 px-0 py-0
           sm:w-auto sm:h-auto sm:px-4 sm:py-2"
								aria-label="Создать криптовалютный кошелёк"
								title="Создать криптовалютный кошелёк"
							>
								<span className="hidden sm:inline">Создать крипто‑кошелёк</span>
								{/* Mobile: SVG plus */}
								<span className="sm:hidden" aria-hidden="true">
									<svg viewBox="0 0 24 24" width="20" height="20" fill="none">
										<path
											d="M12 5v14M5 12h14"
											stroke="currentColor"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							</button>
						</div>
					</div>

					<div id="cryptoList" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
						{data?.map((wallet: any) => {
							const walletId = wallet.id?.toString().toLowerCase() || "1";
							const menuId = `crypto-menu-${walletId}`;
							const isMenuOpen = openMenus.has(menuId);
							
							return (
								<div
									key={wallet.id}
									className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss"
								>
									<div className="flex items-start justify-between">
										<div>
											<div className="text-sm text-white/60">
												{wallet.network}
												<span className="mx-2 text-white/25">●</span>
												<span
													className={`text-xs ${
														wallet.active ? "text-emerald-400" : "text-red-400"
													}`}
												>
													{wallet.active ? "Активен" : "Неактивен"}
												</span>
											</div>
											<div className="font-semibold mt-1">{wallet.asset}</div>
										</div>
										<div className="relative flex flex-col items-end">
											{/* Kebab menu button */}
											<button
												type="button"
												className="kebab-btn p-1.5 -mr-1 text-white/55 hover:text-white/85 transition"
												onClick={() => toggleMenu(menuId)}
												aria-haspopup="menu"
												aria-expanded={isMenuOpen}
												title="Действия"
											>
												<svg
													viewBox="0 0 24 24"
													width="18"
													height="18"
													fill="none"
													aria-hidden="true"
												>
													<circle
														cx="12"
														cy="6"
														r="1.6"
														fill="currentColor"
													></circle>
													<circle
														cx="12"
														cy="12"
														r="1.6"
														fill="currentColor"
													></circle>
													<circle
														cx="12"
														cy="18"
														r="1.6"
														fill="currentColor"
													></circle>
												</svg>
											</button>

											{/* Kebab menu */}
											<div
												id={menuId}
												className={`kebab-menu absolute right-0 top-full mt-2 w-56 bg-[#121212] border border-white/10 rounded-xl p-2 shadow-lg z-30 ${
													isMenuOpen ? "" : "hidden"
												}`}
												role="menu"
											>
												<button
													type="button"
													id={`crypto-details-${walletId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => {
														closeMenu(menuId);
														navigate(`/lk/wallets/details?type=crypto&id=${wallet.id}`);
													}}
												>
													Подробнее
												</button>
												<button
													type="button"
													id={`crypto-history-${walletId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => {
														closeMenu(menuId);
														navigate("/lk/transactions");
													}}
												>
													История
												</button>
												<button
													type="button"
													id={`crypto-rename-${walletId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => closeMenu(menuId)}
												>
													Переименовать
												</button>
												<button
													type="button"
													id={`crypto-toggle-${walletId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
													onClick={() => closeMenu(menuId)}
												>
													Деактивировать
												</button>

												<div className="my-2 border-t border-white/10"></div>

												<button
													type="button"
													id={`crypto-delete-${walletId}`}
													className="menu-item w-full text-left px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/10"
													onClick={() => closeMenu(menuId)}
												>
													Удалить
												</button>
											</div>
										</div>
									</div>

									<div className="mt-3 text-xl font-semibold">
										{wallet.balance}
									</div>

									<div className="mt-3 text-xs">
										<div className="text-white/50 mb-1">Адрес депозита</div>
										<div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 break-all">
											{wallet.depositAddress}
										</div>
										<button
											type="button"
											id={`crypto-copy-${walletId}`}
											className="text-[#00eefd] hover:underline mt-1 inline-block"
											onClick={() => handleCopy(wallet.depositAddress || "", `crypto-${walletId}`)}
										>
											{copyFeedback === `crypto-${walletId}` ? "Скопировано" : "Скопировать адрес"}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			)}
			<ModalCreateFiatAccount
				isOpen={isModalOpenFiat}
				onClose={closeModalFiat}
			/>
			<ModalCreateCryptoWallet
				isOpen={isModalOpenCrypto}
				onClose={closeModalCrypto}
			/>
		</div>
	);
}
