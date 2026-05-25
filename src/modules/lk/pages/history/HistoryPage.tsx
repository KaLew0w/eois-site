import TransactionsTable from "./components/TransactionsTable";
import { useTransferHistory } from "@/modules/lk/hooks/useTransfer";
import { exportToCSV } from "@/shared/utils/exportCsv";

export default function HistoryPage() {
	const { data, isLoading, isError } = useTransferHistory();

	if (isLoading) return <div>Загрузка истории...</div>;
	if (isError)
		return <div className="text-red-400">Ошибка загрузки данных</div>;
	if (!data || data.length === 0) return <div>История пуста</div>;

	return (
		<div className="space-y-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">История транзакций</h1>
				<div className="flex gap-2">
					<button
						onClick={() => exportToCSV(data)}
						className="cta-button px-3 py-1.5 rounded-lg text-sm"
						title="Экспортировать все переводы (CSV)"
						id="btnExportCSV"
					>
						Экспорт CSV
					</button>
				</div>
			</div>

			<section className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss mb-4">
				<div className="grid md:grid-cols-5 gap-3 text-sm">
					<input
						id="txSearch"
						placeholder="Поиск…"
						className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
					/>
					<select
						id="txType"
						className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
					>
						<option value="">Тип: любой</option>
						<option>Пополнение</option>
						<option>Вывод</option>
						<option>Обмен</option>
						<option>Покупка</option>
					</select>
					<select
						id="txStatus"
						className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
					>
						<option value="">Статус: любой</option>
						<option>Проведено</option>
						<option>В обработке</option>
						<option>Отклонено</option>
					</select>
					<input
						type="date"
						id="fromDate"
						className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
					/>
					<input
						type="date"
						id="toDate"
						className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
					/>
				</div>
			</section>

			<TransactionsTable items={data} />
		</div>
	);
}
