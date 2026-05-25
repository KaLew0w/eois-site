import type { CardDetails } from "@/modules/lk/services/cardsService";

interface HistorySectionCardProps {
	card?: CardDetails;
}

export default function HistorySectionCard({ card }: HistorySectionCardProps) {
    const handleExportCSV = () => {
        console.log("Экспорт CSV");
    }
    return (
        <div id="tabHist" className="">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-white/60">История операций по карте</div>
                <button onClick={handleExportCSV} id="btnExportCSV" className="cta-button px-3 py-2 rounded-xl">Экспорт CSV</button>
            </div>
            <div className="overflow-x-auto hide-scroll">
                <table className="min-w-full text-sm">
                    <thead className="text-white/60"><tr className="text-left">
                        <th className="py-2 pr-4">Дата</th>
                        <th className="py-2 pr-4">Описание</th>
                        <th className="py-2 pr-4">Сумма</th>
                        <th className="py-2 pr-4">Статус</th>
                    </tr></thead>
                    <tbody id="histBody" className="divide-y divide-white/5"><tr><td className="py-3 text-white/60">Пока нет операций</td></tr></tbody>
                </table>
            </div></div>
    )
}