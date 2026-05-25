import { useTransferStore } from "@/shared/store/useTransferStore";

export default function ConfirmModal() {
	const { confirmVisible, closeConfirm } = useTransferStore();

	if (!confirmVisible) return null;

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
			<div className="bg-[#1f1f1f] p-6 rounded-xl w-96 text-center">
				<h3 className="text-lg mb-4 text-[#00eefd]">
					Перевод успешно выполнен
				</h3>
				<button
					onClick={closeConfirm}
					className="mt-2 bg-[#00eefd] text-black py-2 px-4 rounded hover:bg-[#00eefd]/80"
				>
					Ок
				</button>
			</div>
		</div>
	);
}
