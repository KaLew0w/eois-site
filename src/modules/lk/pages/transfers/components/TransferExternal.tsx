import { useState } from "react";
import { useCreateTransfer } from "@/modules/lk/hooks/useTransfer";
import { useTransferStore } from "@/shared/store/useTransferStore";

export default function TransferExternal() {
	const { openConfirm } = useTransferStore();
	const mutation = useCreateTransfer();

	const [address, setAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [network, setNetwork] = useState("TRC20");

	const handleTransfer = () => {
		if (!address || !amount) return alert("Укажите адрес и сумму");
		mutation.mutate({ type: "external", address, amount, network });
		openConfirm();
	};

	return (
		// <div className="space-y-4">
		// 	<select
		// 		value={network}
		// 		onChange={(e) => setNetwork(e.target.value)}
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	>
		// 		<option value="TRC20">TRC20</option>
		// 		<option value="ERC20">ERC20</option>
		// 		<option value="BEP20">BEP20</option>
		// 	</select>

		// 	<input
		// 		type="text"
		// 		value={address}
		// 		onChange={(e) => setAddress(e.target.value)}
		// 		placeholder="Внешний адрес"
		// 		className="bg-[#2a2a2a] p-2 rounded w-full"
		// 	/>

		// 	<input
		// 		type="number"
		// 		value={amount}
		// 		onChange={(e) => setAmount(e.target.value)}
		// 		placeholder="Сумма перевода"
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
				<h2 className="font-semibold mb-3">Перевод на внешний адрес</h2>
				<div className="grid sm:grid-cols-2 gap-3">
					<div>
						<label className="text-sm text-white/60">Счёт списания</label>
						<select
							id="extFrom"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						></select>
						<div id="extAvail" className="text-xs text-white/50 mt-1">
							Доступно —
						</div>
					</div>
					<div>
						<label className="text-sm text-white/60">
							Адрес (IBAN / крипто-адрес)
						</label>
						<input
							id="extAddr"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="KG.. / 0x.. / bc1.."
						/>
					</div>
					<div>
						<label className="text-sm text-white/60">Сумма</label>
						<input
							id="extAmt"
							type="text"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="0.00"
						/>
					</div>
					<div>
						<label className="text-sm text-white/60">Комиссия</label>
						<input
							id="extFee"
							type="text"
							value="0"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="0.00"
						/>
					</div>
				</div>
				<div className="mt-4">
					<button
						id="btnExt"
						className="cta-button px-4 py-2 rounded-xl opacity-50 pointer-events-none"
					>
						Вывести
					</button>
				</div>
			</div>
			<aside className="bg-white/5 border border-white/10 rounded-2xl p-4">
				<div className="text-sm text-white/70">
					Проверяйте реквизиты получателя — операции необратимы.
				</div>
			</aside>
		</div>
	);
}
