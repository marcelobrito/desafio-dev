import { NotFoundError, ValidationError } from "./index.js";

export const ErrorHandler = (err, req, res, next) => {
	if (err instanceof ValidationError)
		res.status(422).send({ message: err.message });
	else if (err instanceof NotFoundError) res.status(404).send();
	else {
		console.error(err);
		res.status(500).send({ message: "Ops, algo deu errado!" });
	}
};
