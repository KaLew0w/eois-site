import type { CardDetails } from "@/modules/lk/services/cardsService";

interface PaySectionCardProps {
	card?: CardDetails;
}

export default function PaySectionCard({ card }: PaySectionCardProps) {
    return (
        <div id="tabPay" className="">
        <form id="payForm" className="space-y-3">
            <div>
                <label className="text-sm text-white/60">Получатель</label>
                <input
                    id="payTo"
                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
                    placeholder="Счёт/телефон/e-mail"
                />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                    <label className="text-sm text-white/60">Сумма</label>
                    <input
                        id="payAmt"
                        type="number"
                        min="0"
                        step="0.01"
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
                        placeholder="0.00"
                    />
                </div>
                <div>
                    <label className="text-sm text-white/60">Валюта</label>
                    <select
                        id="payCur"
                        defaultValue={card?.currency || "RUB"}
                        className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
                    >
                        <option>RUB</option>
                        <option>USD</option>
                        <option>KGS</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="text-sm text-white/60">
                    Комментарий (необязательно)
                </label>
                <input
                    id="payMemo"
                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
                    placeholder="За услуги..."
                />
            </div>
            <a
                href="#"
                id="btnPay"
                className="cta-button block text-center py-2.5 rounded-xl w-full"
            >
                Оплатить
            </a>
            <p id="payMsg" className="text-xs text-white/60 hidden">
                Отправка…
            </p>
        </form>
        <div className="text-xs text-white/50 mt-2">
            • Номер карты можно показать и скопировать — кнопка под картой.
        </div>
    </div>
    )
}