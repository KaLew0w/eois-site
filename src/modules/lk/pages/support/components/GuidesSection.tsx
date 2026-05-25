import { useState } from "react";
import { useGuides } from "@/modules/lk/hooks/useSupport";

export const GuidesSection: React.FC = () => {
	const { data: guides = [], isLoading, error } = useGuides();
	console.log("Guides data:", guides);
	console.log("Is loading:", isLoading);
	console.log("Error:", error);
	const [selectedGuide, setSelectedGuide] = useState<any | null>(null);

	if (isLoading)
		return <div className="text-white animate-pulse">Загрузка...</div>;

	if (error)
		return (
			<div className="text-red-400 p-4">
				Ошибка загрузки гайдов: {(error as Error).message}
			</div>
		);

	return (
		<div className="mx-auto w-full max-w-[1100px]">
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 card-emboss">
				<div className="text-base sm:text-lg font-medium">Ресурсы и гайды</div>

				<div className="mt-3 grid md:grid-cols-2 gap-3">
					{guides.length === 0 && (
						<div className="col-span-2 text-white/60 py-6 text-center">
							Гайды не найдены
						</div>
					)}
					{guides?.map((guide: any) => (
						<div
							key={guide.id}
							className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4"
						>
							<div className="font-medium">{guide.title}</div>
							<div className="text-sm text-white/70 mt-1">{guide.content}</div>

							<div className="mt-2 flex flex-wrap gap-2">
								{guide.tags?.map((tag: string, i: number) => (
									<span
										key={i}
										className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10"
									>
										{tag}
									</span>
								))}
							</div>

							<div className="mt-3 flex flex-wrap gap-2">
								<button
									onClick={() => setSelectedGuide(guide)}
									data-read={`g${guide.id}`}
									className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
								>
									Открыть
								</button>
								<button
									data-dl={`g${guide.id}`}
									className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
								>
									Скачать PDF
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Модалка */}
			{selectedGuide && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
					<div className="relative bg-[#1A1A1A] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 w-[92%] max-w-xl">
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-base sm:text-lg font-semibold">
								{selectedGuide.title}
							</h3>
							<button
								onClick={() => setSelectedGuide(null)}
								className="h-9 w-9 rounded-xl hover:bg-white/10"
							>
								✕
							</button>
						</div>
						<div className="text-sm text-white/80">{selectedGuide.content}</div>
						<div className="mt-4 flex flex-wrap gap-2 justify-end">
							<button
								onClick={() => setSelectedGuide(null)}
								className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20"
							>
								Закрыть
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
