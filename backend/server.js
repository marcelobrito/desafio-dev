import app from "./app.js";

const server = app.listen(3000);

const unexpectedErrorHandler = (error) => {
	console.error(error);
	if (server) {
		server.close(() => {
			console.info("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
