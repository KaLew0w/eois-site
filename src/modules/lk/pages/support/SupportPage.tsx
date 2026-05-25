import { useState } from "react";
import FAQSection from "./components/FAQSection";
import { ChatSection } from "./components/ChatSection";
import { FeedbackSection } from "./components/FeedbackSection";
import { GuidesSection } from "./components/GuidesSection";

export default function SupportPage() {
	const [tab, setTab] = useState<"faq" | "chat" | "feedback" | "guides">("faq");

	const tabs = [
		{ id: "faq", label: "FAQ" },
		{ id: "chat", label: "Чат с поддержкой" },
		{ id: "feedback", label: "Обратная связь" },
		{ id: "guides", label: "Ресурсы и гайды" },
	];

	return (
		<div className="mx-auto w-full max-w-[1100px] px-3 sm:px-4">
			<div className="mb-5 sm:mb-6">
				<h1 className="text-xl sm:text-2xl font-semibold">
					Поддержка и помощь
				</h1>
			</div>
			<div className="flex flex-wrap gap-2 mb-4">
				{tabs.map((t) => (
					<button
						key={t.id}
						onClick={() => setTab(t.id as any)}
						className={`px-3 py-2 rounded-xl cursor-pointer ${
							tab === t.id ? "bg-[#00eefd] text-black" : "bg-white/5 text-white"
						}`}
					>
						{t.label}
					</button>
				))}
			</div>

			{tab === "faq" && <FAQSection />}
			{tab === "chat" && <ChatSection />}
			{tab === "feedback" && <FeedbackSection />}
			{tab === "guides" && <GuidesSection />}
		</div>
	);
}
