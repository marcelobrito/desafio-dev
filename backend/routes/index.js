import express from "express";
import { CnabController } from "../controllers/cnab-controller.js";
import multer from "multer";
import { ValidationError } from "../errors/validation-error.js";
import { CnabService } from "../services/cnab-service.js";
import { cnabRepository } from "../infra/cnab-repository.js";

const upload = multer({
	dest: "uploads/",
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "text/plain") {
			cb(null, true); // Accept the file
		} else {
			cb(new ValidationError("Somente arquivos .txt são permitidos!"), false);
		}
	},
});

const router = express.Router();
const cnabController = new CnabController(new CnabService(cnabRepository));
router.post("/cnab", upload.single("file"), function (req, res, next) {
	cnabController.uploadAndProcess(req, res, next);
});
router.get("/cnab", function (req, res, next) {
	cnabController.getReport(req, res, next);
});

export default router;
