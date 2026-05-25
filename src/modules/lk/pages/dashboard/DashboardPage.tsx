import CardBlock from "./components/CardBlock";
import RequisitesBlock from "./components/RequisitesBlock";
import QuickTransfer from "./components/QuickTransfer";
import DashboardSkeleton from "./components/DashboardSkeleton";
import { useEffect, useState } from "react";
import { useDashboard } from "@/modules/lk/hooks/useDashboard";

export default function DashboardPage() {
	const { cardsQuery, txQuery } = useDashboard();
	const [activeCardId, setActiveCardId] = useState<string | null>(null);

	useEffect(() => {
		if (cardsQuery.data && cardsQuery.data.length > 0 && !activeCardId) {
			setActiveCardId(cardsQuery.data[0].id);
		}
	}, [cardsQuery.data]);

	// Показываем скелетон только при первой загрузке (когда нет данных)
	const isInitialLoading = 
		(cardsQuery.isPending || txQuery.isPending) && 
		!cardsQuery.data && 
		!txQuery.data;

	if (isInitialLoading) {
		return <DashboardSkeleton />;
	}

	const cards = cardsQuery.data ?? [];

	const activeCard = cards.find((c) => c.id === activeCardId) ?? null;

	return (
		<div id="viewport">
			<header className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Обзор счёта</h1>
			</header>

			{/* <!-- Верхние метрики --> */}
			<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
				<a
					href="#/balances"
					className="block bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss hover:border-[#00eefd]/30 transition"
				>
					<div className="text-white/60 text-sm">Общий баланс (в USDT)</div>
					<div className="mt-2 text-2xl font-semibold" id="totalBalance">
						0,00 USDT
					</div>
					<div className="mt-2 text-xs text-white/50" id="byCurrencies">
						Fiat: 0,00 USDT • Crypto: 0,00 USDT
					</div>
				</a>
				<div className="min-w-0 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss">
					<div className="text-white/60 text-sm">Кэшбэк за месяц</div>
					<div className="mt-2 text-2xl font-semibold" id="cashback">
						—
					</div>
					<div className="mt-2 text-xs text-white/50">Подключается с бэка</div>
				</div>
				<div className="min-w-0 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss">
					<div className="text-white/60 text-sm">Расходы в этом месяце</div>
					<div className="mt-2 text-2xl font-semibold" id="monthSpent">
						0 RUB
					</div>
					<div className="mt-2 text-xs text-white/50">По данным истории</div>
				</div>
				<div className="min-w-0 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss">
					<div className="text-white/60 text-sm">Курсы</div>
					<div className="mt-2 text-2xl font-semibold">С бэкенда</div>
					<div className="mt-2 text-xs text-white/50">USDT/Fiat/Crypto</div>
				</div>
			</section>

			{/* Главная строка: 4 колонки: Карта / Реквизиты / Быстрый перевод / Статус+Баланс */}
			<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">
				<CardBlock
					cards={cards}
					activeCardId={activeCardId ?? cards[0]?.id}
					onChangeCard={(id) => setActiveCardId(id)}
				/>

				{/* <!-- 2) Реквизиты --> */}
				<RequisitesBlock activeCard={activeCard} />

				{/*4) Справа: Статус + Баланс*/}
				<div className="space-y-3 h-full flex flex-col">
					<div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
						<div>
							<div className="text-sm text-white/60">Статус карты</div>
							<div className="font-medium" id="dcStatus">
								Активна
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								id="btnFreeze"
								type="button"
								className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
							>
								Заморозить
							</button>
							<a
								href="#/cards"
								id="btnOpenCardSettingsDash"
								className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
							>
								Настроить карту
							</a>
						</div>
					</div>
					<div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-1 flex flex-col">
						<div>
							<div className="text-sm text-white/60">Баланс</div>
							<div className="font-medium" id="dcBalance">
								0,00 USD
							</div>
						</div>
						<div className="mt-3 space-y-2">
							<div className="flex items-center justify-between">
								<div className="text-sm text-white/60">День</div>
								<div className="font-medium" id="limitDay">
									500&nbsp;000,00 USD
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm text-white/60">Месяц</div>
								<div className="font-medium" id="limitMonth">
									6&nbsp;000&nbsp;000,00 USD
								</div>
							</div>
						</div>
					</div>
				</div>
				<QuickTransfer />

				{/* <!-- 5) История: на всю ширину (col-span-full) --> */}
				<div className="min-w-0  col-span-full bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss mt-2">
					<div className="md:col-span-2 xl:col-span-4 flex items-center justify-between">
						<h3 className="text-white/80">Последние операции</h3>
						<div className="flex items-center gap-3">
							<a
								id="openTransactions"
								href="#/transactions"
								className="text-[#43ecfd] text-sm"
							>
								Перейти в историю
							</a>
							<a id="seeAll" href="#/cards" className="text-[#43ecfd] text-sm">
								Карточная история
							</a>
						</div>
					</div>
					<div className="overflow-x-auto hide-scroll mt-2">
						<table className="min-w-full text-sm">
							<thead className="text-white/60">
								<tr className="text-left">
									<th className="py-2 pr-4">Дата</th>
									<th className="py-2 pr-4">Описание</th>
									<th className="py-2 pr-4">Сумма</th>
									<th className="py-2 pr-4">Статус</th>
								</tr>
							</thead>
							<tbody id="dcTxBody" className="divide-y divide-white/5">
								{txQuery.data && txQuery.data.length > 0 ? (
									txQuery.data.slice(0, 5).map((tx) => (
										<tr key={tx.id}>
											<td className="py-2 pr-4 whitespace-nowrap">{tx.date}</td>
											<td className="py-2 pr-4">{tx.descr || tx.type}</td>
											<td className="py-2 pr-4">
												{tx.amount > 0 ? "+" : "−"} {Math.abs(tx.amount)} {tx.currency}
											</td>
											<td className="py-2 pr-4">
												<span className="px-2 py-1 text-xs rounded bg-white/10">
													{tx.status || "done"}
												</span>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td className="py-3 text-white/60">Пока нет операций</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
}
