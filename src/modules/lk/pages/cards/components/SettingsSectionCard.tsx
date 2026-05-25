import { useState, useEffect } from "react";
import type { CardDetails } from "@/modules/lk/services/cardsService";
import {
	useRenameCard,
	useUpdateCardLimits,
	useUpdateCardSecurity,
	useUpdateCardGradient,
	useDeleteCard,
} from "@/modules/lk/hooks/useCards";
import { GRADIENTS } from "@/shared/utils/cardsStyle";
import LogoWhite from "@/assets/images/logo_white.png";

interface SettingsSectionCardProps {
	card?: CardDetails;
}

function OfficeOrderModal({
	onClose,
	onConfirm,
}: {
	onClose: () => void;
	onConfirm?: () => void | Promise<void>;
}) {
	const [city, setCity] = useState("bishkek");
	const [officeId, setOfficeId] = useState("of-1");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!city || !officeId || !date || !time || !name.trim() || !phone.trim()) {
			return;
		}
		setLoading(true);
		try {
			await onConfirm?.();
			onClose();
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
			<div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 w-[92%] max-w-lg">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-semibold">Получить карту в офисе</h3>
					<button type="button" onClick={onClose} className="h-9 w-9 rounded-xl hover:bg-white/10 text-white/80">✕</button>
				</div>
				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<label className="text-sm text-white/60">Город</label>
						<select
							value={city}
							onChange={(e) => setCity(e.target.value)}
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900"
						>
							<option value="bishkek">Бишкек</option>
							<option value="almaty">Алматы</option>
							<option value="moscow">Москва</option>
						</select>
					</div>
					<div>
						<label className="text-sm text-white/60">Офис</label>
						<select
							value={officeId}
							onChange={(e) => setOfficeId(e.target.value)}
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900"
						>
							<option value="of-1">Офис на пр. Победы, 10</option>
							<option value="of-2">Офис на ул. Центральная, 3</option>
						</select>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>
							<label className="text-sm text-white/60">Дата</label>
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white"
							/>
						</div>
						<div>
							<label className="text-sm text-white/60">Время</label>
							<input
								type="time"
								value={time}
								onChange={(e) => setTime(e.target.value)}
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white"
							/>
						</div>
					</div>
					<div>
						<label className="text-sm text-white/60">ФИО</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="ФИО"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder:text-white/40"
						/>
					</div>
					<div>
						<label className="text-sm text-white/60">Телефон</label>
						<input
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="Телефон"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder:text-white/40"
						/>
					</div>
					<div className="mt-4 flex justify-end gap-2">
						<button type="button" onClick={onClose} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10">Отмена</button>
						<button type="submit" disabled={loading} className="px-3 py-2 rounded-lg bg-[#00eefd] text-black font-medium disabled:opacity-50">
							{loading ? "…" : "Оформить"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function DeliveryOrderModal({
	onClose,
	onConfirm,
}: {
	onClose: () => void;
	onConfirm?: () => void | Promise<void>;
}) {
	const [name, setName] = useState("");
	const [addr, setAddr] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !addr.trim() || !phone.trim()) return;
		setLoading(true);
		try {
			await onConfirm?.();
			onClose();
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
			<div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 w-[92%] max-w-lg">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-semibold">Доставка физической карты</h3>
					<button type="button" onClick={onClose} className="h-9 w-9 rounded-xl hover:bg-white/10 text-white/80">✕</button>
				</div>
				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="ФИО получателя"
							className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder:text-white/40"
						/>
					</div>
					<div>
						<input
							value={addr}
							onChange={(e) => setAddr(e.target.value)}
							placeholder="Адрес доставки"
							className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder:text-white/40"
						/>
					</div>
					<div>
						<input
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="Телефон"
							className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder:text-white/40"
						/>
					</div>
					<div className="mt-4 flex justify-end gap-2">
						<button type="button" onClick={onClose} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10">Отмена</button>
						<button type="submit" disabled={loading} className="px-3 py-2 rounded-lg bg-[#00eefd] text-black font-medium disabled:opacity-50">
							{loading ? "…" : "Оформить"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function ConfirmModal({
	title,
	children,
	confirmLabel = "Ок",
	cancelLabel = "Отмена",
	onConfirm,
	onClose,
}: {
	title: string;
	children: React.ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void | Promise<void>;
	onClose: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const handleConfirm = async () => {
		setLoading(true);
		try {
			await onConfirm();
			onClose();
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
			<div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 w-[92%] max-w-lg">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-semibold">{title}</h3>
					<button
						type="button"
						onClick={onClose}
						className="h-9 w-9 rounded-xl hover:bg-white/10 text-white/80"
					>
						✕
					</button>
				</div>
				<div className="text-sm text-white/80">{children}</div>
				<div className="mt-4 flex justify-end gap-2">
					<button
						type="button"
						onClick={onClose}
						className="px-3 py-2 rounded-lg bg-white/10 border border-white/10"
					>
						{cancelLabel}
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={loading}
						className="px-3 py-2 rounded-lg bg-[#00eefd] text-black font-medium disabled:opacity-50"
					>
						{loading ? "…" : confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}

export default function SettingsSectionCard({ card }: SettingsSectionCardProps) {
	const [cardName, setCardName] = useState(card?.name || "");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showOfficeModal, setShowOfficeModal] = useState(false);
	const [showDeliveryModal, setShowDeliveryModal] = useState(false);
	const [limits, setLimits] = useState({
		day: card?.limits?.day || 0,
		week: card?.limits?.week || 0,
		month: card?.limits?.month || 0,
	});
	const [security, setSecurity] = useState({
		online: card?.security?.online ?? true,
		atm: card?.security?.atm ?? true,
		foreign: card?.security?.foreign ?? true,
		contactless: card?.security?.contactless ?? true,
		require3DS: card?.security?.require3DS ?? true,
	});
	const [selectedGradient, setSelectedGradient] = useState(
		card?.gradient || "mint",
	);

	const renameMutation = useRenameCard();
	const updateLimitsMutation = useUpdateCardLimits();
	const updateSecurityMutation = useUpdateCardSecurity();
	const updateGradientMutation = useUpdateCardGradient();
	const deleteMutation = useDeleteCard();

	// Синхронизация состояния с пропсами карты
	useEffect(() => {
		if (card) {
			setCardName(card.name || "");
			setLimits({
				day: card.limits?.day || 0,
				week: card.limits?.week || 0,
				month: card.limits?.month || 0,
			});
			setSecurity({
				online: card.security?.online ?? true,
				atm: card.security?.atm ?? true,
				foreign: card.security?.foreign ?? true,
				contactless: card.security?.contactless ?? true,
				require3DS: card.security?.require3DS ?? true,
			});
			setSelectedGradient(card.gradient || "mint");
		}
	}, [card]);

	const handleRename = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!card) return;
		await renameMutation.mutateAsync({ id: card.id, name: cardName });
	};

	const handleUpdateLimits = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!card) return;
		await updateLimitsMutation.mutateAsync({ id: card.id, limits });
	};

	const handleUpdateSecurity = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!card) return;
		await updateSecurityMutation.mutateAsync({ id: card.id, security });
	};

	const handleUpdateGradient = async (newGradient: string) => {
		if (!card) return;
		setSelectedGradient(newGradient);
		await updateGradientMutation.mutateAsync({
			id: card.id,
			gradient: newGradient,
		});
	};

	const handleDeleteConfirm = async () => {
		if (!card) return;
		await deleteMutation.mutateAsync(card.id);
	};

	const getBrandLogo = (brand: string | undefined) => {
		if (!brand) return "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
		return brand.toLowerCase().includes("visa")
			? "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
			: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/960px-Mastercard-logo.svg.png";
	};
    return (
        <div id="tabSet" className="">
            <div className="grid md:grid-cols-1 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-white/60 mb-1">Переименовать</div>
                    <form onSubmit={handleRename} className="flex gap-2 flex-wrap">
                        <input
                            id="newName"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 "
                        />
                        <button
                            type="submit"
                            id="btnRename"
                            disabled={renameMutation.isPending}
                            className="cta-button px-4 py-2 rounded-xl disabled:opacity-50"
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-white/60 mb-1">Лимиты</div>
                    <form onSubmit={handleUpdateLimits}>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                                <div className="text-white/50">День</div>
                                <input
                                    id="limDay"
                                    type="number"
                                    value={limits.day}
                                    onChange={(e) =>
                                        setLimits({ ...limits, day: Number(e.target.value) })
                                    }
                                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2 px-2"
                                />
                            </div>
                            <div>
                                <div className="text-white/50">Неделя</div>
                                <input
                                    id="limWeek"
                                    type="number"
                                    value={limits.week}
                                    onChange={(e) =>
                                        setLimits({ ...limits, week: Number(e.target.value) })
                                    }
                                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2 px-2"
                                />
                            </div>
                            <div>
                                <div className="text-white/50">Месяц</div>
                                <input
                                    id="limMonth"
                                    type="number"
                                    value={limits.month}
                                    onChange={(e) =>
                                        setLimits({ ...limits, month: Number(e.target.value) })
                                    }
                                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2 px-2"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            id="btnSaveLimits"
                            disabled={updateLimitsMutation.isPending}
                            className="cta-button inline-block mt-3 px-4 py-2 rounded-xl disabled:opacity-50"
                        >
                            Обновить лимиты
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <form onSubmit={handleUpdateSecurity}>
                        <div className="text-sm text-white/60 mb-2">Безопасность</div>
                        <label className="flex items-center gap-2 mb-2 text-sm">
                            <input
                                id="secOnline"
                                type="checkbox"
                                checked={security.online}
                                onChange={(e) =>
                                    setSecurity({ ...security, online: e.target.checked })
                                }
                            />{" "}
                            Онлайн покупки
                        </label>
                        <label className="flex items-center gap-2 mb-2 text-sm">
                            <input
                                id="secAtm"
                                type="checkbox"
                                checked={security.atm}
                                onChange={(e) =>
                                    setSecurity({ ...security, atm: e.target.checked })
                                }
                            />{" "}
                            Снятие наличных (ATM)
                        </label>
                        <label className="flex items-center gap-2 mb-2 text-sm">
                            <input
                                id="secForeign"
                                type="checkbox"
                                checked={security.foreign}
                                onChange={(e) =>
                                    setSecurity({ ...security, foreign: e.target.checked })
                                }
                            />{" "}
                            Зарубежные операции
                        </label>
                        <label className="flex items-center gap-2 mb-2 text-sm">
                            <input
                                id="secContactless"
                                type="checkbox"
                                checked={security.contactless}
                                onChange={(e) =>
                                    setSecurity({ ...security, contactless: e.target.checked })
                                }
                            />{" "}
                            Бесконтактные
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                id="sec3ds"
                                type="checkbox"
                                checked={security.require3DS}
                                onChange={(e) =>
                                    setSecurity({ ...security, require3DS: e.target.checked })
                                }
                            />{" "}
                            3-D Secure
                        </label>
                        <button
                            type="submit"
                            id="btnSaveSecurity"
                            disabled={updateSecurityMutation.isPending}
                            className="cta-button inline-block mt-3 px-4 py-2 rounded-xl disabled:opacity-50"
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-white/60 mb-1">Тема карты</div>
                    <select
                        id="appearance"
                        value={selectedGradient}
                        onChange={(e) => handleUpdateGradient(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
                    >
                        <option value="mint">mint</option>
                        <option value="whiteMint">whiteMint</option>
                        <option value="deep">deep</option>
                        <option value="sunset">sunset</option>
                        <option value="royal">royal</option>
                        <option value="monoDark">monoDark</option>
                    </select>
                    <div className="mt-3">
                        <div
                            className="relative rounded-2xl p-5 min-h-[160px] overflow-hidden"
                            style={{
                                background:
                                    GRADIENTS[selectedGradient] || GRADIENTS.mint,
                            }}
                        >
                            <img
                                src={LogoWhite}
                                className="h-6"
                                alt="logo"
                            />
                            <span className="absolute top-3 right-3 text-[10px] tracking-widest bg-black/40 px-2 py-1 rounded-md">
                                {card?.isPhysical ? "PHYSICAL" : "VIRTUAL"}
                            </span>
                            <div className="mt-6 text-xl tracking-widest">
                                {card?.pan
                                    ? `•••• · •••• · •••• · ${card.pan.slice(-4)}`
                                    : "•••• · •••• · •••• · ••••"}
                            </div>
                            <div className="mt-2 flex gap-6 text-sm">
                                <div>
                                    VALID<br />
                                    <span>{card?.exp || "••/••"}</span>
                                </div>
                                <div>
                                    CVV<br />
                                    <span>***</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between text-sm">
                                <div>{card?.name || ""}</div>
                                <img
                                    src={getBrandLogo(card?.brand)}
                                    className="h-5 opacity-90"
                                    alt={card?.brand || ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
                <div className="text-sm text-white/60 mb-1">Кошельки</div>
                <div className="payment-buttons flex flex-wrap items-center gap-3">
                    <a
                        href="#"
                        id="btnAddGooglePay"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-black hover:bg-white/90"
                    >
                        <span className="inline-block w-10 h-4 bg-white text-black text-[10px] leading-4 text-center rounded">
                            G Pay
                        </span>
                        <span className="text-sm">
                            {card?.walletTokens?.google ? "Подключено" : "Добавить в Google Pay"}
                        </span>
                    </a>
                    <a
                        href="#"
                        id="btnAddApplePay"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-black hover:bg-white/90"
                    >
                        <span className="inline-block w-14 h-4 bg-white text-black text-[10px] leading-4 text-center rounded">
                            Apple Pay
                        </span>
                        <span className="text-sm">
                            {card?.walletTokens?.apple ? "Подключено" : "Добавить в Apple Pay"}
                        </span>
                    </a>
                </div>

                {!card?.isPhysical && (
                    <div className="mt-4 grid sm:grid-cols-2 gap-2">
                        <button
                            type="button"
                            id="btnOrderPhysicalDelivery"
                            onClick={() => setShowDeliveryModal(true)}
                            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-center hover:bg-white/15 transition-colors"
                        >
                            Доставка курьером
                        </button>
                        <button
                            type="button"
                            id="btnOrderPhysicalOffice"
                            onClick={() => setShowOfficeModal(true)}
                            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-center hover:bg-white/15 transition-colors"
                        >
                            Получить в офисе
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Полезно знать</div>
                <ul className="text-sm text-white/80 space-y-2 list-disc pl-5">
                    <li>Потеряли карту — нажмите «Заморозить». Разморозить можно в один клик.</li>
                    <li>Номер карты можно показать и он сразу копируется — удобно для оплаты онлайн.</li>
                    <li>Для Apple/Google Pay используйте кнопки выше — карта будет в телефоне.</li>
                    <li>Оформить физическую карту можно с доставкой или забрать в офисе.</li>
                </ul>
            </div>

            <div className="mt-4 flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60">Удаление карты</div>
                <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    id="btnDeleteCard"
                    disabled={deleteMutation.isPending}
                    className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white disabled:opacity-50"
                >
                    Удалить
                </button>
            </div>

            {showDeleteModal && (
                <ConfirmModal
                    title="Удалить карту?"
                    confirmLabel="Удалить"
                    cancelLabel="Отмена"
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setShowDeleteModal(false)}
               	>
                    <p className="text-white/70">
                        Действие необратимо. История операций останется в выписке.
                    </p>
                </ConfirmModal>
            )}

            {showOfficeModal && (
                <OfficeOrderModal
                    onClose={() => setShowOfficeModal(false)}
                    onConfirm={async () => {
                        setShowOfficeModal(false);
                        // В реальном приложении — вызов API заказа карты в офисе
                    }}
                />
            )}

            {showDeliveryModal && (
                <DeliveryOrderModal
                    onClose={() => setShowDeliveryModal(false)}
                    onConfirm={async () => {
                        setShowDeliveryModal(false);
                        // В реальном приложении — вызов API доставки
                    }}
                />
            )}
        </div>
    )
}