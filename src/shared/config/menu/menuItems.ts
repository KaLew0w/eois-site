import {
    LayoutDashboard,
    Wallet,
    List,
    CreditCard,
    Bitcoin,
    Shield,
    HelpCircle,
    Repeat,
    Send,
    Banknote,
} from "lucide-react";

export const menuItems = [
    { name: "Обзор", path: "/lk/dashboard", icon: LayoutDashboard },
    { name: "Кошельки", path: "/lk/wallets", icon: Wallet },
    { name: "Обмен валют", path: "/lk/exchange", icon: Repeat },
    { name: "Переводы", path: "/lk/transfers", icon: Send },
    { name: "Карты", path: "/lk/cards", icon: CreditCard },
    { name: "История", path: "/lk/transactions", icon: List },
    { name: "Инвестиции", path: "/lk/invest", icon: Bitcoin },
    { name: "Балансы", path: "/lk/balances", icon: Banknote },
    { name: "Настройки", path: "/lk/settings", icon: Shield },
    { name: "Поддержка", path: "/lk/support", icon: HelpCircle },
]