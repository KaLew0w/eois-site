import type { ModalProps } from "@/shared/types/ModalProps";

export default function ModalCreateFiatAccount({
	isOpen,
	onClose,
}: ModalProps) {
	if (!isOpen) return null;
	return (
		<div
			id="modal"
			className="fixed inset-0 items-center justify-center z-50 flex"
		>
			<div className="absolute inset-0 bg-black/60"></div>
			<div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 w-[90%] max-w-lg">
				<div className="flex items-center justify-between">
					<h3 id="modalTitle" className="text-lg font-semibold">
						Создать фиатный счёт
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
							<label className="text-sm text-white/60">Название</label>
							<input
								id="newFiatName"
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
								placeholder="Напр. RUB • Основной"
							/>
						</div>
						<div>
							<label className="text-sm text-white/60">Валюта</label>
							<select
								id="newFiatCur"
								className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 cursor-pointer text-white [&>option]:text-gray-900 [&>option]:bg-white"
							>
								<option value="RUB">RUB</option>
								<option value="KGS">KGS</option>
								<option value="USD">USD</option>
							</select>
						</div>
					</div>
				</div>
				<div className="mt-4 flex justify-end gap-2">
					<button
						onClick={onClose}
						id="modalCancel"
						className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 cursor-pointer"
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
