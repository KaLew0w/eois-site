export interface CardType {
	id: string;
	brand: string;
	name: string;
	pan: string;
	exp: string;
	cvv?: string;
	currency: string;
	balance?: string;
	active: boolean;
	gradient?: string; // название градиента, приходит с бэка
	isPhysical?: boolean;
}
