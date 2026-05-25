import { useSearchParams } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import UiSection from "./components/UiSections";
import NotificationSection from "./components/NotificationSection";
import SecuritySection from "./components/SecuritySection";

export default function SettingsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentTab = searchParams.get("tab") || "profile";

	const tabs = [
		{ id: "profile", label: "Профиль" },
		{ id: "ui", label: "Интерфейс" },
		{ id: "notifications", label: "Уведомления" },
		{ id: "security", label: "Безопасность" },
	];

	const handleTabChange = (tab: string) => {
		setSearchParams({ tab });
	};

	return (
		<div className="mx-auto w-full max-w-[1100px] px-3 sm:px-4">
			<div className="mb-5 sm:mb-6">
				<h1 className="text-2xl sm:text-3xl font-semibold">Настройки</h1>
			</div>

			<div className="flex gap-2 mb-6">
				{tabs.map((t) => (
					<button
						key={t.id}
						onClick={() => handleTabChange(t.id)}
						className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
							currentTab === t.id
								? "bg-[#00eefd] text-black"
								: "bg-white/5 text-white"
						}`}
					>
						{t.label}
					</button>
				))}
			</div>

			{currentTab === "profile" && <ProfileSection />}
			{currentTab === "ui" && <UiSection />}
			{currentTab === "notifications" && <NotificationSection />}
			{currentTab === "security" && <SecuritySection />}
		</div>
	);
}
