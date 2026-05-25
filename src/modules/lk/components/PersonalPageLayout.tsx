import PersonalPageHeader from "./PersonalPageHeader";
import DesktopSider from "./DesktopSider";
import { Outlet } from "react-router-dom";
import MobileSider from "./MobileSider";

export default function PersonalPageLayout() {

	return (
		<div className="min-h-screen flex bg-[#111] text-white">
			<MobileSider/>
			<DesktopSider />
			<main className="flex-1 p-6 lg:ml-0 ml-0 pt-20 lg:pt-6 overflow-y-auto hide-scroll">
				<PersonalPageHeader/>
				<div id="viewport">
					<Outlet />
				</div>
				<footer className="py-10 text-center text-xs text-white/40">
					The One • Финансовые сервисы нового поколения
				</footer>
			</main>
		</div>
	);
}
