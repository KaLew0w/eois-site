import { useTransferStore } from "@/shared/store/useTransferStore";
import TransferOwn from "./components/TransferOwn";
import TransferP2P from "./components/TransferP2P";
import TransferExternal from "./components/TransferExternal";
import TransferHistory from "./components/TransferHistory";
import ConfirmModal from "./components/ConfirmModal";

export default function TransfersPage() {
	const { activeTab, setActiveTab } = useTransferStore();

	const tabs = [
		{ id: "own", label: "Между своими" },
		{ id: "p2p", label: "Другому пользователю" },
		{ id: "external", label: "Внешний адрес" },
		{ id: "history", label: "История" },
	];

	return (
		<div className="space-y-6">
			<header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold">Переводы</h1>

				{/* <!-- ВНЕШНИЙ СКРОЛЛ-КОНТЕЙНЕР (только на мобилке прокрутка) --> */}
				<div className="self-start sm:self-auto -mx-2 px-2 overflow-x-auto no-scrollbar max-w-full">
					{/* <!-- ВНУТРЕННЯЯ ГРУППА ТАБОВ --> */}
					<div className="inline-flex rounded-xl overflow-hidden bg-white/5 border border-white/10 whitespace-nowrap">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as any)}
								className={`shrink-0 px-3 sm:px-4 py-2 text-sm sm:text-base cursor-pointer ${
									activeTab === tab.id
										? " bg-[#00eefd] text-black "
										: "text-gray-400 hover:text-[#00eefd]"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</header>

			<div>
				{activeTab === "own" && <TransferOwn />}
				{activeTab === "p2p" && <TransferP2P />}
				{activeTab === "external" && <TransferExternal />}
				{activeTab === "history" && <TransferHistory />}
			</div>
			<ConfirmModal />
		</div>
	);
}
