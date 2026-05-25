import { useState } from "react";
import { useFAQ } from "@/modules/lk/hooks/useSupport";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";

export default function FAQSection() {
	const { data: faqs = [], isLoading, error } = useFAQ();
	const [expanded, setExpanded] = useState<Array<string | number>>([]);
	const [search, setSearch] = useState("");
	const [feedback, setFeedback] = useState<
		Record<string | number, "like" | "dislike" | null>
	>({});

	const handleFeedback = (id: string | number, type: "like" | "dislike") => {
		setFeedback((prev) => ({ ...prev, [id]: prev[id] === type ? null : type }));
	};

	const [debouncedSearch] = useDebounce(search, 300);
	const filtered = faqs.filter((f: any) =>
		f.question.toLowerCase().includes(debouncedSearch.toLowerCase()),
	);

	const toggle = (id: string | number) =>
		setExpanded((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);

	const toggleAll = (expand: boolean) =>
		setExpanded(expand ? (filtered as any[]).map((f) => f.id) : []);

	if (isLoading) return <div className="text-white/70 p-4">Загрузка…</div>;

	if (error) return <div className="text-red-400 p-4">Ошибка загрузки FAQ</div>;

	return (
		<div className="p-4 bg-white/5 rounded-2xl border border-white/10">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div className="text-base sm:text-lg font-medium">
					Часто задаваемые вопросы
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => toggleAll(true)}
						className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
					>
						Раскрыть всё
					</button>
					<button
						onClick={() => toggleAll(false)}
						className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
					>
						Свернуть всё
					</button>
				</div>
			</div>

			<div className="mt-3">
				<input
					placeholder="Поиск по вопросам…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-sm focus:outline-none"
				/>
			</div>

			<div className="mt-3 divide-y divide-white/5">
				{filtered.length === 0 && (
					<div className="py-6 text-white/60">Ничего не найдено</div>
				)}
				{filtered.map((f: any) => (
					<div key={f.id} className="py-3 ">
						<button
							onClick={() => toggle(f.id)}
							className="w-full text-left flex items-start justify-between gap-3 group"
						>
							<span className="font-medium leading-6 group-hover:text-[#00eefd] cursor-pointer">
								{f.question}
							</span>
							<span className="shrink-0 opacity-70 group-hover:opacity-100">
								{expanded.includes(f.id) ? "▲" : "▼"}
							</span>
						</button>

						<AnimatePresence initial={false}>
							{expanded.includes(f.id) && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.25 }}
									className="mt-2 text-white/80 text-sm overflow-hidden"
								>
									<div>{f.answer}</div>
									<div className="mt-2 flex items-center gap-2 text-xs text-white/60">
										<span>Полезно?</span>
										<button
											onClick={() => handleFeedback(f.id, "like")}
											className={`px-2 py-1 rounded bg-white/10 border border-white/10 cursor-pointer ${
												feedback[f.id] === "like"
													? "bg-emerald-500/20 text-emerald-300"
													: ""
											}`}
										>
											Да
										</button>
										<button
											onClick={() => handleFeedback(f.id, "dislike")}
											className={`px-2 py-1 rounded bg-white/10 border border-white/10 cursor-pointer ${
												feedback[f.id] === "dislike"
													? "bg-red-500/20 text-red-300"
													: ""
											}`}
										>
											Нет
										</button>
										<button
											onClick={() =>
												navigator.clipboard.writeText(
													window.location.href + "#" + f.id,
												)
											}
											className="ml-2 px-2 py-1 rounded bg-white/10 border border-white/10 cursor-pointer"
										>
											Скопировать ссылку
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</div>
	);
}
