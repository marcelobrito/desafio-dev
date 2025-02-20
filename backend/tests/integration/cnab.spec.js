import request from "supertest";
jest.mock("../../infra/cnab-repository.js", () => {
	return {
		cnabRepository: {
			create: jest.fn(),
			getAllByStore: jest.fn().mockResolvedValue([
				{
					type: 3,
					date: new Date("2019-03-01 15:34:53-03:00"),
					amount: (14200 / 100) * -1,
					cpf: "09620676017",
					card: "4753****3153",
					store_owner: "JOÃO MACEDO",
					store_name: "BAR DO JOÃO",
				},
			]),
			getReport: jest
				.fn()
				.mockResolvedValue([
					{ store_name: "BAR DO JOÃO", _sum: { amount: -142.0 } },
				]),
		},
	};
});
import { cnabRepository } from "../../infra/cnab-repository.js";
import app from "../../app.js";

describe("Cnab Use cases", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Should validate that file was sent", async () => {
		const res = await request(app).post("/cnab").expect(422);

		expect(res.body).toStrictEqual({
			message: "Nenhum arquivo enviado.",
		});
	});

	it("Should validate that only txt files are allowed", async () => {
		const res = await request(app)
			.post("/cnab")
			.attach("file", "tests/fixtures/file.json")
			.expect(422);

		expect(res.body).toStrictEqual({
			message: "Somente arquivos .txt são permitidos!",
		});
	});

	it("Should upload and process txt file", async () => {
		const res = await request(app)
			.post("/cnab")
			.attach("file", "tests/fixtures/CNAB.txt")
			.expect(200);

		expect(res.body).toStrictEqual({
			message: "Arquivo enviado e processado com sucesso.",
		});

		expect(cnabRepository.create).toBeCalledWith({
			type: 3,
			date: new Date("2019-03-01 15:34:53-03:00"),
			amount: (14200 / 100) * -1,
			cpf: "09620676017",
			card: "4753****3153",
			store_owner: "JOÃO MACEDO",
			store_name: "BAR DO JOÃO",
		});
	});

	it("Should return cnabs report", async () => {
		const res = await request(app)
			.post("/cnab")
			.attach("file", "tests/fixtures/CNAB.txt")
			.expect(200);

		expect(res.body).toStrictEqual({
			message: "Arquivo enviado e processado com sucesso.",
		});

		const res2 = await request(app).get("/cnab").expect(200);

		expect(res2.body).toStrictEqual([
			{
				store_name: "BAR DO JOÃO",
				total: -142.0,
				transactions: [
					{
						type: "Financiamento",
						nature: "Saída",
						date: "2019-03-01T18:34:53.000Z",
						amount: (14200 / 100) * -1,
						cpf: "09620676017",
						card: "4753****3153",
						store_owner: "JOÃO MACEDO",
						store_name: "BAR DO JOÃO",
					},
				],
			},
		]);
	});
});
