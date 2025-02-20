import fs from "node:fs";
import { ValidationError } from "../errors/index.js";
import readline from "node:readline";

const Types = {};
Types[1] = { name: "Débito", nature: "Entrada", sign: 1 };
Types[2] = { name: "Boleto", nature: "Saída", sign: -1 };
Types[3] = { name: "Financiamento", nature: "Saída", sign: -1 };
Types[4] = { name: "Crédito", nature: "Entrada", sign: 1 };
Types[5] = { name: "Recebimento Empréstimo", nature: "Entrada", sign: 1 };
Types[6] = { name: "Vendas", nature: "Entrada", sign: 1 };
Types[7] = { name: "Recebimento TED", nature: "Entrada", sign: 1 };
Types[8] = { name: "Recebimento DOC", nature: "Entrada", sign: 1 };
Types[9] = { name: "Aluguel", nature: "Saída", sign: -1 };

export class CnabService {
	constructor(cnabRepository) {
		this.cnabRepository = cnabRepository;
	}

	async uploadAndProcess(file) {
		if (!file) {
			throw new ValidationError("Nenhum arquivo enviado.");
		}

		const fileStream = fs.createReadStream(file.path);
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});
		const getFromArray = (array, start, end) => {
			return array.slice(start, end).join("");
		};
		for await (const line of rl) {
			let l = line.split("");
			const date = `${getFromArray(l, 1, 5)}-${getFromArray(l, 5, 7)}-${getFromArray(l, 7, 9)}`;
			const time = `${getFromArray(l, 42, 44)}:${getFromArray(l, 44, 46)}:${getFromArray(l, 46, 48)}-03:00`;
			const type = +getFromArray(l, 0, 1);
			this.cnabRepository.create({
				type,
				date: new Date(`${date} ${time}`),
				amount: (+getFromArray(l, 9, 19) / 100) * Types[type].sign,
				cpf: getFromArray(l, 19, 30),
				card: getFromArray(l, 30, 42),
				store_owner: getFromArray(l, 48, 62).trim(),
				store_name: getFromArray(l, 62, 81).trim(),
			});
		}
	}

	async getReport() {
		const report = await this.cnabRepository.getReport();
		const data = await Promise.all(
			report.map(async (r) => {
				const transactions = await this.cnabRepository.getAllByStore(
					r.store_name,
				);

				return {
					store_name: r.store_name,
					total: +r._sum.amount,
					transactions: transactions.map((cnab) => {
						cnab.nature = Types[cnab.type].nature;
						cnab.type = Types[cnab.type].name;
						cnab.amount = +cnab.amount;
						return cnab;
					}),
				};
			}),
		);

		return data;
	}
}
