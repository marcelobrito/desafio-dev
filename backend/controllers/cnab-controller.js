import { CnabService } from "../services/cnab-service.js";

export class CnabController {
	constructor(cnabService) {
		this.cnabService = cnabService;
	}

	async uploadAndProcess(req, res, next) {
		try {
			await this.cnabService.uploadAndProcess(req.file, next);
			return res
				.status(200)
				.send({ message: "Arquivo enviado e processado com sucesso." });
		} catch (error) {
			next(error);
		}
	}
	async getReport(req, res, next) {
		try {
			const cnabs = await this.cnabService.getReport();
			return res.status(200).send(cnabs);
		} catch (error) {
			next(error);
		}
	}
}
