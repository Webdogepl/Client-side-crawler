import React from "react";

function Results(props) {
	return (
		<table id="main-table">
			<thead>
				<tr>
					<td>URLS</td>
					<td>Emails</td>
					<td>Phone Numbers</td>
				</tr>
			</thead>
			<tbody id="results__body"></tbody>
		</table>
	);
}

export default Results;
