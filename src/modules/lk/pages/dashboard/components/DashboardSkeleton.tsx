export default function DashboardSkeleton() {
	return (
		<div id="viewport">
			<header className="mb-6 flex items-center justify-between">
				<div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse" />
			</header>

			{/* Верхние метрики */}
			<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-4 card-emboss"
					>
						<div className="h-4 w-32 bg-white/10 rounded animate-pulse mb-2" />
						<div className="h-8 w-40 bg-white/10 rounded animate-pulse mt-2 mb-2" />
						<div className="h-3 w-48 bg-white/10 rounded animate-pulse mt-2" />
					</div>
				))}
			</section>

			{/* Главная строка */}
			<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">
				{/* CardBlock skeleton */}
				<div className="relative">
					<div className="relative rounded-2xl p-6 min-h-[260px] overflow-hidden w-full md:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[620px] bg-white/10 animate-pulse h-[calc(100%-88px)]" />
					<div className="mt-3 w-full max-w-[420px]">
						<div className="h-4 w-28 bg-white/10 rounded animate-pulse mb-2" />
						<div className="h-10 w-full max-w-[360px] bg-white/10 rounded-xl animate-pulse" />
					</div>
				</div>

				{/* RequisitesBlock skeleton */}
				<div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-full">
					<div className="flex items-center justify-between mb-2">
						<div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
						<div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
					</div>
					<div className="space-y-3">
						<div>
							<div className="h-3 w-20 bg-white/10 rounded animate-pulse mb-2" />
							<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-2" />
								<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
							</div>
							<div>
								<div className="h-3 w-12 bg-white/10 rounded animate-pulse mb-2" />
								<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
							</div>
						</div>
					</div>
				</div>

				{/* Status + Balance skeleton */}
				<div className="space-y-3 h-full flex flex-col">
					<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
						<div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" />
						<div className="h-6 w-20 bg-white/10 rounded animate-pulse mb-3" />
						<div className="flex items-center gap-2">
							<div className="h-9 w-24 bg-white/10 rounded-xl animate-pulse" />
							<div className="h-9 w-32 bg-white/10 rounded-xl animate-pulse" />
						</div>
					</div>
					<div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-1 flex flex-col">
						<div className="h-4 w-20 bg-white/10 rounded animate-pulse mb-2" />
						<div className="h-6 w-24 bg-white/10 rounded animate-pulse mb-3" />
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
								<div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
							</div>
							<div className="flex items-center justify-between">
								<div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
								<div className="h-4 w-36 bg-white/10 rounded animate-pulse" />
							</div>
						</div>
					</div>
				</div>

				{/* QuickTransfer skeleton */}
				<div className="min-w-0 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss h-full">
					<div className="flex items-center justify-between">
						<div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
						<div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
					</div>
					<div className="mt-4 space-y-3">
						<div>
							<div className="h-4 w-12 bg-white/10 rounded animate-pulse mb-2" />
							<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
						</div>
						<div className="grid grid-cols-3 gap-3">
							<div className="col-span-2">
								<div className="h-4 w-16 bg-white/10 rounded animate-pulse mb-2" />
								<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
							</div>
							<div>
								<div className="h-4 w-16 bg-white/10 rounded animate-pulse mb-2" />
								<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
							</div>
						</div>
						<div>
							<div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" />
							<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
						</div>
						<div className="h-10 w-full bg-white/10 rounded-xl animate-pulse" />
					</div>
				</div>

				{/* История транзакций skeleton */}
				<div className="min-w-0 col-span-full bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss mt-2">
					<div className="md:col-span-2 xl:col-span-4 flex items-center justify-between">
						<div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
						<div className="flex items-center gap-3">
							<div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
							<div className="h-4 w-36 bg-white/10 rounded animate-pulse" />
						</div>
					</div>
					<div className="overflow-x-auto hide-scroll mt-2">
						<table className="min-w-full text-sm">
							<thead className="text-white/60">
								<tr className="text-left">
									<th className="py-2 pr-4">
										<div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
									</th>
									<th className="py-2 pr-4">
										<div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
									</th>
									<th className="py-2 pr-4">
										<div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
									</th>
									<th className="py-2 pr-4">
										<div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/5">
								{Array.from({ length: 5 }).map((_, i) => (
									<tr key={i}>
										<td className="py-3">
											<div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
										</td>
										<td className="py-3">
											<div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
										</td>
										<td className="py-3">
											<div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
										</td>
										<td className="py-3">
											<div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
}
