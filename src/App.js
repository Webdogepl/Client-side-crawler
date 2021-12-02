import React, { useState } from "react";
import "./App.css";
import Results from "./componenets/Results";
import searchLogic from "./componenets/searchLogic";
import XLSXdownloader from "./componenets/XLSXdownloader";
const cheerio = require("cheerio");

function App() {
	const [url, setUrl] = useState("");

	function fireCrawler(e) {
		e.preventDefault();

		var Crawler = require("crawler");

		var c = new Crawler({
			maxConnections: 3,
			callback: function (error, res, done) {
				if (error) {
					console.log(error);
				} else {
					searchLogic(res);
				}
				done();
			},
		});

		c.queue([
			{
				uri: url,
				jQuery: true,

				callback: function (error, res, done) {
					if (error) {
						console.log(error);
						alert(`Error - invalid adress: ${url}`);
					} else {
						searchLogic(res);

						const $ = cheerio.load(res.body);
					}
					done();
				},
			},
		]);
	}

	function handleChange(e) {
		setUrl(e.target.value);
	}

	return (
		<div className="App">
			<div className="crawler__container">
				<h1 className="crawler__container__title">Crawler</h1>
				<form className="crawler__container__form">
					<input
						type="text"
						name="urlInput"
						placeholder="https://adress.com or Google keywords"
						onChange={handleChange}
					/>
					<button onClick={fireCrawler}>Search</button>
					<XLSXdownloader />
				</form>

				<div className="crawler__container__results">
					<Results />
				</div>
			</div>
		</div>
	);
}

export default App;
