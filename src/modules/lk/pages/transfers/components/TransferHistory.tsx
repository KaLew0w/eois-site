import { useTransferHistory } from "@/modules/lk/hooks/useTransfer";
import type { HistoryDataType } from "@/shared/types/historyDataType";
import { exportToCSV } from "@/shared/utils/exportCsv";

export default function TransferHistory() {
	const { data, isLoading, isError } = useTransferHistory();

	if (isLoading) return <div>Загрузка истории...</div>;
	if (isError)
		return <div className="text-red-400">Ошибка загрузки данных</div>;
	if (!data || data.length === 0) return <div>История пуста</div>;

	return (
		<section className="bg-white/5 border border-white/10 rounded-2xl p-4">
			<div className="flex items-center justify-between mb-3">
				<h2 className="font-semibold text-lg">История переводов</h2>
				<button
					onClick={() => exportToCSV(data)}
					className="cta-button px-3 py-1.5 rounded-lg text-sm"
					id="btnExportCSV"
					title="Экспортировать все переводы (CSV)"
				>
					Экспорт CSV
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full text-sm text-white/90">
					<thead className="text-white/60 border-b border-white/10">
						<tr>
							<th className="py-2 pr-4 text-left">Дата</th>
							<th className="py-2 pr-4 text-left">Описание</th>
							<th className="py-2 pr-4 text-left">Сумма</th>
							<th className="py-2 pr-4 text-left">Статус</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-white/10">
						{data.map((item: HistoryDataType) => (
							<tr key={item.id} className="hover:bg-white/5 transition-colors">
								<td className="py-2 pr-4 whitespace-nowrap">
									{new Date(item.dt).toLocaleDateString("ru-RU", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									})}
								</td>
								<td className="py-2 pr-4">
									<div className="font-medium">{item.descr}</div>
									<div className="text-white/50 text-[11px]">
										{item.category}
									</div>
								</td>
								<td
									className={`py-2 pr-4 font-semibold ${
										item.amount >= 0 ? "text-emerald-400" : "text-red-400"
									}`}
								>
									{item.amount > 0 ? "+" : ""}
									{item.amount} {item.currency}
								</td>
								<td className="py-2 pr-4">
									<span
										className={`px-2 py-1 text-xs rounded ${
											item.status === "done"
												? "bg-emerald-500/20 text-emerald-400"
												: item.status === "pending"
												? "bg-yellow-500/20 text-yellow-400"
												: "bg-white/10 text-white/60"
										}`}
									>
										{item.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
