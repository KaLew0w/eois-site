import { useState } from "react";
import { useCreateTransfer } from "@/modules/lk/hooks/useTransfer";
import { useTransferStore } from "@/shared/store/useTransferStore";

export default function TransferP2P() {
	const { openConfirm } = useTransferStore();
	const mutation = useCreateTransfer();

	const [receiver, setReceiver] = useState("");
	const [amount, setAmount] = useState("");
	const [comment, setComment] = useState("");

	const handleTransfer = () => {
		if (!receiver || !amount) return alert("Укажите все данные");
		mutation.mutate({ type: "p2p", receiver, amount, comment });
		openConfirm();
	};

	return (
		// <div className="space-y-4">
		// 	<input
		// 		type="text"
		// 		value={receiver}
		// 		onChange={(e) => setReceiver(e.target.value)}
		// 		placeholder="Телефон или ID получателя"
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	/>

		// 	<input
		// 		type="number"
		// 		value={amount}
		// 		onChange={(e) => setAmount(e.target.value)}
		// 		placeholder="Сумма перевода"
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	/>

		// 	<input
		// 		type="text"
		// 		value={comment}
		// 		onChange={(e) => setComment(e.target.value)}
		// 		placeholder="Комментарий (необязательно)"
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	/>

		// 	<button
		// 		onClick={handleTransfer}
		// 		className="bg-[#00eefd] text-black font-semibold py-2 px-4 rounded hover:bg-[#00eefd]/80"
		// 	>
		// 		Отправить
		// 	</button>
		// </div>

		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4">
				<h2 className="font-semibold mb-3">Перевод другому пользователю</h2>
				<div className="grid sm:grid-cols-2 gap-3">
					<div>
						<label className="text-sm text-white/60">Счёт списания</label>
						<select
							id="p2pFrom"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						></select>
						<div id="p2pAvail" className="text-xs text-white/50 mt-1">
							Доступно —
						</div>
					</div>
					<div>
						<label className="text-sm text-white/60">
							Кому (телефон, e-mail или ID)
						</label>
						<input
							id="p2pPeer"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="+996..."
						/>
					</div>
					<div>
						<label className="text-sm text-white/60">Сумма</label>
						<input
							id="p2pAmt"
							type="text"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="0.00"
						/>
					</div>
				</div>
				<div className="mt-4">
					<button
						id="btnP2P"
						className="cta-button px-4 py-2 rounded-xl opacity-50 pointer-events-none"
					>
						Отправить
					</button>
				</div>
			</div>
			<aside className="bg-white/5 border border-white/10 rounded-2xl p-4">
				<div className="text-sm text-white/70">
					Внутренние P2P-переводы проходят мгновенно.
				</div>
			</aside>
		</div>
	);
}
