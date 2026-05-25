import { User, Shield, Bell } from "lucide-react";


export const userMenuItems = [
    { icon: User, label: "Профиль", path: "/lk/settings" },
    {
        icon: Shield,
        label: "Безопасность",
        path: "/lk/settings?tab=security",
    },
    {
        icon: Bell,
        label: "Уведомления",
        path: "/lk/settings?tab=notifications",
    },
]