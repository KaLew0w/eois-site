import { useState } from "react";
import { useCreateTransfer } from "@/modules/lk/hooks/useTransfer";
import { useTransferStore } from "@/shared/store/useTransferStore";
import { useFiatAccounts } from "@/modules/lk/hooks/useAccounts";

export default function TransferOwn() {
	const { data: wallets, isLoading } = useFiatAccounts();
	const { openConfirm } = useTransferStore();
	const mutation = useCreateTransfer();

	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [amount, setAmount] = useState("");

	const handleTransfer = () => {
		mutation.mutate({ from, to, amount });
		openConfirm();
	};

	if (isLoading) return <div>Загрузка счетов...</div>;

	return (
		// <div classNameName="space-y-4">
		// 	<select
		// 		value={from}
		// 		onChange={(e) => setFrom(e.target.value)}
		// 		classNameName="bg-[#2a2a2a] p-2 rounded w-full"
		// 	>
		// 		<option value="">Откуда</option>
		// 		{wallets?.map((w: any) => (
		// 			<option key={w.id} value={w.id}>
		// 				{w.name} ({w.balance} {w.currency})
		// 			</option>
		// 		))}
		// 	</select>

		// 	<select
		// 		value={to}
		// 		onChange={(e) => setTo(e.target.value)}
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	>
		// 		<option value="">Куда</option>
		// 		{wallets?.map((w: any) => (
		// 			<option key={w.id} value={w.id}>
		// 				{w.name} ({w.currency})
		// 			</option>
		// 		))}
		// 	</select>

		// 	<input
		// 		type="number"
		// 		value={amount}
		// 		onChange={(e) => setAmount(e.target.value)}
		// 		placeholder="Сумма"
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	/>

		// 	<button
		// 		onClick={handleTransfer}
		// 		className="bg-[#00eefd] text-black font-semibold py-2 px-4 rounded hover:bg-[#00eefd]/80"
		// 	>
		// 		Перевести
		// 	</button>
		// </div>

		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4">
				<h2 className="font-semibold mb-3">Перевод между своими счетами</h2>
				<div className="grid sm:grid-cols-2 gap-3">
					<div>
						<label className="text-sm text-white/60">Счёт списания</label>
						<select
							id="ownFrom"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						>
							<option value="rub-main">RUB • Основной</option>
							<option value="kgs-1">KGS • Счёт 1</option>
							<option value="usd-1">USD • Savings</option>
							<option value="btc-1">BTC • BTC</option>
							<option value="usdt-trc20-1">USDT • TRC20</option>
							<option value="eth-1">ETH • ERC20</option>
						</select>
						<div id="ownAvail" className="text-xs text-white/50 mt-1">
							Доступно — 620&nbsp;000 RUB
						</div>
					</div>
					<div>
						<label className="text-sm text-white/60">Счёт зачисления</label>
						<select
							id="ownTo"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						>
							<option value="">Выберите…</option>
							<option value="kgs-1">KGS • Счёт 1</option>
							<option value="usd-1">USD • Savings</option>
						</select>
					</div>
					<div>
						<label className="text-sm text-white/60">Сумма</label>
						<input
							id="ownAmt"
							type="text"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="0.00"
						/>
						<div
							id="ownWarn"
							className="text-xs text-red-400 mt-1 hidden"
						></div>
					</div>
					<div>
						<label className="text-sm text-white/60">Курс / Комиссия</label>
						<div className="mt-1 p-2 bg-black/30 rounded-lg border border-white/10 text-sm">
							<div>
								Курс: <span id="ownRate">—</span>
							</div>
							<div>
								Комиссия: <span id="ownFee">0</span>
							</div>
							<div>
								К зачислению:{" "}
								<span id="ownNet" data-net="0">
									0
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<button
						id="btnOwnSend"
						className="cta-button px-4 py-2 rounded-xl opacity-50 pointer-events-none"
					>
						Перевести
					</button>
				</div>
			</div>
			<aside className="bg-white/5 border border-white/10 rounded-2xl p-4">
				<h3 className="font-medium mb-2">Подсказки</h3>
				<ul className="text-sm text-white/70 space-y-1">
					<li>• Фиат↔фиат конвертируется по текущему курсу (комиссия 0.3%).</li>
					<li>• Крипто↔фиат делайте в «Обмен валют».</li>
					<li>
						• Крипто-перевод возможен только между одинаковыми активами/сетями.
					</li>
				</ul>
			</aside>
		</div>
	);
}
