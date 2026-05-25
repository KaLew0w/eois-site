export const FeedbackSection: React.FC = () => {
	return (
		<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 card-emboss">
			<div className="text-base sm:text-lg font-medium">Обратная связь</div>
			<div className="text-white/60 text-sm mt-1">
				Опишите проблему или идею — мы создадим обращение и вернёмся с ответом.
			</div>

			<div className="grid md:grid-cols-2 gap-3 mt-3">
				<div>
					<label className="text-sm text-white/60">Категория</label>
					<select
						id="fbType"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
					>
						<option>Проблема</option>
						<option>Идея / Улучшение</option>
						<option>Финансовый вопрос</option>
						<option>Безопасность</option>
						<option>Другое</option>
					</select>
				</div>
				<div>
					<label className="text-sm text-white/60">E-mail для ответа</label>
					<input
						id="fbEmail"
						type="email"
						placeholder="you@example.com"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
					/>
				</div>

				<div className="md:col-span-2">
					<label className="text-sm text-white/60">Тема</label>
					<input
						id="fbSubject"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
						placeholder="Кратко опишите суть"
					/>
				</div>
				<div className="md:col-span-2">
					<label className="text-sm text-white/60">Сообщение</label>
					<textarea
						id="fbMessage"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
						placeholder="Детали, шаги воспроизведения, скрины…"
					></textarea>
				</div>

				<div>
					<label className="text-sm text-white/60">Вложение (скриншот)</label>
					<input
						id="fbFile"
						type="file"
						accept="image/*"
						className="mt-1 p-2 block text-sm rounded-xl rounded-m bg-white/5 cursor-pointer"
					/>
					<div id="fbFileName" className="text-xs text-white/50 mt-1"></div>
				</div>
				<div>
					<label className="text-sm text-white/60">Приоритет</label>
					<select
						id="fbPriority"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 cursor-pointer text-white [&>option]:text-gray-900 [&>option]:bg-white"
					>
						<option>Обычный</option>
						<option>Высокий</option>
						<option>Критичный</option>
					</select>
				</div>
			</div>

			<div className="mt-3 flex flex-wrap gap-2">
				<button id="fbSend" className="px-4 py-2 rounded-xl cta-button">
					Отправить
				</button>
				<span id="fbMsg" className="text-sm text-white/60 self-center"></span>
			</div>
		</div>
	);
};
