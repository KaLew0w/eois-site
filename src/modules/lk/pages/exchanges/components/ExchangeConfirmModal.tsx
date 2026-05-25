import React from "react";

interface ExchangeConfirmModalProps {
	isOpen: boolean;
	title: string;
	children: React.ReactNode;
	onConfirm: () => void | Promise<void>;
	onClose: () => void;
}

export const ExchangeConfirmModal: React.FC<ExchangeConfirmModalProps> = ({
	isOpen,
	title,
	children,
	onConfirm,
	onClose,
}) => {
	if (!isOpen) return null;

	const handleConfirm = async () => {
		await onConfirm();
		onClose();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="absolute inset-0 bg-black/60"
				onClick={onClose}
				onKeyDown={(e) => e.key === "Escape" && onClose()}
				role="presentation"
			/>
			<div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 w-[92%] sm:w-[90%] max-w-lg">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-white">{title}</h3>
					<button
						type="button"
						onClick={onClose}
						className="h-9 w-9 rounded-xl hover:bg-white/10 text-white text-xl leading-none"
					>
						×
					</button>
				</div>
				<div className="mt-3 text-sm text-white/90">{children}</div>
				<div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
					<button
						type="button"
						onClick={onClose}
						className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 w-full sm:w-auto text-white"
					>
						Отмена
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						className="px-3 py-2 rounded-lg bg-[#00eefd] text-black font-medium w-full sm:w-auto"
					>
						Подтвердить
					</button>
				</div>
			</div>
		</div>
	);
};
