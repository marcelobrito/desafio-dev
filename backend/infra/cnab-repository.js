const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";

export class CnabRepository {
	async create(cnab) {
		return await prisma.cnab.create({ data: cnab });
	}

	async getAllByStore(name) {
		return await prisma.cnab.findMany({
			where: { store_name: name },
			orderBy: { date: "desc" },
		});
	}

	async getReport() {
		return await prisma.cnab.groupBy({
			by: ["store_name"],
			_sum: {
				amount: true,
			},
			orderBy: {
				_sum: {
					amount: "desc",
				},
			},
		});
	}
}

export const cnabRepository = new CnabRepository();
