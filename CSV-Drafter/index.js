// Populate rows
{/* <tr>
	<td>1</td>
	<td>1</td>
	<td>Saquon Barkley</td>
	<td>RB</td>
	<td>NYG</td>
</tr>

<tr>
	<td>2</td>
	<td>3</td>
	<td>Christian McCaffrey</td>
	<td>RB</td>
	<td>CAR</td>
</tr> */}

update_table();

function update_table() {
	let player_data = [];
	for (let i = 0; i < 50; i++) {
		let row = [1, 1, "Saquon Barkley", "RB", "NYG"]
		player_data.push(row);
	}

	let table = document.getElementById("display-table");

	let table_row_idx = 1;

	for (let row_num = 0; row_num < player_data.length; row_num++) {
		let row = table.insertRow(table_row_idx);

		// console.log(player_data[row_num]);
		// let curr_row = JSON.parse(player_data[row_num]);
		let curr_row = player_data[row_num];
		// console.log(curr_row);
		
		for (let col = 0; col < curr_row.length; col++) {
			row.insertCell(col).innerHTML = curr_row[col];
		}

		row_num++;
		table_row_idx++;
	}
}



// Color rows based on position

toggle_row();
// Disable row on click
function toggle_row() {
	var table = document.getElementById('display-table');
	// var table = document.getElementsByTagName("table");

	var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;

            // var rowsNotSelected = table.getElementsByTagName('tr');
            // for (var row = 0; row < rowsNotSelected.length; row++) {
            //     rowsNotSelected[row].style.backgroundColor = "";
            //     rowsNotSelected[row].classList.remove('selected');
            // }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
			
			if (rowSelected.classList.contains("disabled")) {
				rowSelected.classList.remove("disabled");
			}
			else {
				rowSelected.classList.add("disabled");
			}
			
			// rowSelected.style.backgroundColor = "yellow";
            // rowSelected.className += " selected";
        }
    }

} //end of function