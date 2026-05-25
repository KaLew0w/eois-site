import type { ModalProps } from "@/shared/types/ModalProps";

export default function ModalCreateCryptoWallet({
	isOpen,
	onClose,
	children,
}: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 items-center justify-center z-50 flex">
			<div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 w-[90%] max-w-lg">
				<div className="flex items-center justify-between">
					<h3 id="modalTitle" className="text-lg font-semibold">
						Создать крипто‑кошелёк
					</h3>
					<button
						onClick={onClose}
						id="modalClose"
						className="h-9 w-9 rounded-xl hover:bg-white/10 cursor-pointer"
					>
						×
					</button>
				</div>
				<div id="modalBody" className="mt-3 text-sm">
					<div className="grid gap-3">
						<div>
							<label className="text-sm text-white/60">Актив</label>
							<select
								id="newCryptoAsset"
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 cursor-pointer text-white [&>option]:text-gray-900 [&>option]:bg-white"
							>
								<option>BTC</option>
								<option>ETH</option>
								<option>USDT</option>
							</select>
						</div>
						<div>
							<label className="text-sm text-white/60">Сеть</label>
							<select
								id="newCryptoNet"
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 cursor-pointer text-white [&>option]:text-gray-900 [&>option]:bg-white"
							>
								<option>Bitcoin</option>
								<option>Ethereum</option>
								<option>TRON</option>
							</select>
						</div>
					</div>
				</div>
				<div className="mt-4 flex justify-end gap-2">
					<button
						id="modalCancel"
						className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 cursor-pointer"
						onClick={onClose}
					>
						Отмена
					</button>
					<button
						id="modalOk"
						className="px-3 py-2 rounded-lg bg-[#00eefd] text-black font-medium"
					>
						Ок
					</button>
				</div>
			</div>
		</div>
	);
}
