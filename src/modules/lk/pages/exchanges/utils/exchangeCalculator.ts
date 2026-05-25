/**
 * Калькулятор обмена валют
 * Извлечено из lk/js/views/exchange.js для использования в React
 */

// Константы курсов валют (можно заменить на API)
const USD_RATES: Record<string, number> = { RUB: 95, KGS: 86 };
const CRYPTO_RATES: Record<string, number> = { BTC: 60000, ETH: 2800, USDT: 1 };

// Списки валют
export const FIAT_LIST = ["RUB", "KGS", "USD"];
export const CRYPTO_LIST = ["BTC", "ETH", "USDT"];

/**
 * Вычисляет курс обмена между двумя валютами
 * @param from - Исходная валюта (например, "BTC", "USD", "RUB")
 * @param to - Целевая валюта
 * @returns Курс обмена (сколько единиц "to" за 1 единицу "from")
 */
export function calculateRate(from: string, to: string): number {
	const isFiat = (x: string) => x in USD_RATES || x === "USD";
	const isCryp = (x: string) => x in CRYPTO_RATES;

	// Крипто → Крипто
	if (isCryp(from) && isCryp(to)) {
		return CRYPTO_RATES[from] / CRYPTO_RATES[to];
	}

	// Крипто → Фиат
	if (isCryp(from) && isFiat(to)) {
		return to === "USD" ? CRYPTO_RATES[from] : CRYPTO_RATES[from] * USD_RATES[to];
	}

	// Фиат → Крипто
	if (isFiat(from) && isCryp(to)) {
		return from === "USD" ? 1 / CRYPTO_RATES[to] : USD_RATES[from] / CRYPTO_RATES[to];
	}

	// Фиат → Фиат
	if (isFiat(from) && isFiat(to)) {
		if (from === "USD" && to !== "USD") return USD_RATES[to];
		if (to === "USD" && from !== "USD") return 1 / USD_RATES[from];
		if (to !== "USD" && from !== "USD") return USD_RATES[to] / USD_RATES[from];
		return 1;
	}

	return 1;
}

/**
 * Парсит сумму из строки, понимает запятые/точки и научную запись
 * @param raw - Исходное значение
 * @param dp - Количество знаков после запятой для округления
 * @returns Нормализованное число или 0
 */
export function parseAmount(raw: string | number | null | undefined, dp: number = 8): number {
	if (raw == null) return 0;
	const s = String(raw).trim().replace(',', '.').toLowerCase();
	if (!s) return 0;
	const n = Number(s); // parseFloat понимает "1e-8"
	if (!isFinite(n)) return 0;
	const fixed = +n.toFixed(dp);
	return fixed > 0 ? fixed : 0;
}

/**
 * Форматирует число, убирая лишние нули
 * @param n - Число для форматирования
 * @param dp - Количество знаков после запятой
 * @returns Отформатированная строка (например, "1.23" вместо "1.23000000")
 */
export function formatAmount(n: number, dp: number = 8): string {
	return n.toFixed(dp).replace(/\.?0+$/, '');
}

/**
 * Форматирует курс для отображения
 * @param rate - Курс обмена
 * @param from - Исходная валюта
 * @param to - Целевая валюта
 * @returns Отформатированная строка курса
 */
export function formatRate(rate: number, from: string, to: string): string {
	return `${Number(rate).toLocaleString('ru-RU', { maximumFractionDigits: 8 })} ${to} за 1 ${from}`;
}

export interface CalculateExchangeParams {
	from: string;
	to: string;
	amount: string | number;
	feePercent?: number;
	decimalPlaces?: number;
}

export interface CalculateExchangeResult {
	rate: number;
	gross: number;
	fee: number;
	net: number;
	from: string;
	to: string;
	amount: number;
	formattedRate: string;
	formattedOutput: string;
}

/**
 * Вычисляет результат обмена
 * @param params - Параметры расчета
 * @param params.from - Исходная валюта
 * @param params.to - Целевая валюта
 * @param params.amount - Сумма для обмена
 * @param params.feePercent - Процент комиссии (по умолчанию 0.5%)
 * @param params.decimalPlaces - Количество знаков после запятой
 * @returns Результат расчета или null, если данные невалидны
 */
export function calculateExchange({
	from,
	to,
	amount,
	feePercent = 0.5,
	decimalPlaces = 8,
}: CalculateExchangeParams): CalculateExchangeResult | null {
	const parsedAmount = parseAmount(amount, decimalPlaces);

	if (!from || !to || parsedAmount <= 0) {
		return null;
	}

	const rate = calculateRate(from, to);
	const gross = +(parsedAmount * rate).toFixed(decimalPlaces);
	const fee = +(gross * (feePercent / 100)).toFixed(decimalPlaces);
	const net = +(gross - fee).toFixed(decimalPlaces);

	return {
		rate,
		gross,
		fee,
		net,
		from,
		to,
		amount: parsedAmount,
		formattedRate: formatRate(rate, from, to),
		formattedOutput: `${net.toLocaleString('ru-RU', { maximumFractionDigits: decimalPlaces })} ${to}`,
	};
}
