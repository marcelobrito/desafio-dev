export const NotFound = (req, res, next) => {
	res.status(404).send();
	next();
};
