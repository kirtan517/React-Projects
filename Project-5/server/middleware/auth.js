import jwt from "jsonwebtoken";
import fetch from "node-fetch";
// const fetch = require('node-fetch');

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, "test");

			req.userId = decodedData?.id;
		} else {
			const res = await fetch("https://www.googleapis.com/oauth2/v1/certs");
			const key1 = await res.json();
            const keys = JSON.parse(JSON.stringify(key1));

			const decoded = jwt.decode(token, { complete: true });

			const key = keys[decoded.header.kid];

			decodedData = jwt.verify(token, key);
            req.userId = decodedData.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
