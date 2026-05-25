import { api } from "@/modules/lk/api/api";
import MockAdapter from "axios-mock-adapter";

import faqData from "./mock-data/faq.json";
import guidesData from "./mock-data/guides.json";
import fiatAccounts from "./mock-data/fiatAccounts.json";
import cryptoAccounts from "./mock-data/cryptoAccounts.json";
import transfersData from "./mock-data/transfers.json";
import cards from "./mock-data/cards.json";

const mock = new MockAdapter(api, { delayResponse: 100 });

mock.onGet("/api/support/faq").reply(200, faqData);
mock.onGet("/api/support/guides").reply(200, guidesData);
mock.onGet("/api/wallets/fiat").reply(200, fiatAccounts);
mock.onGet("/api/wallets/crypto").reply(200, cryptoAccounts);
mock.onGet("/api/transfers/history").reply(200, transfersData);
mock.onGet("/api/cards").reply(200, cards);

export default mock;
