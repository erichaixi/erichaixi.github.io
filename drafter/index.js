// Populate rows
// get_player_data();
// update_table();

function update_table(player_data) {
	// let player_data = [];
	// for (let i = 0; i < 150; i++) {
	// 	let row = [1, 1, "Saquon Barkley", "RB", 10, "NYG"]
	// 	player_data.push(row);
	// }

	let table = document.getElementById("display-table");

	let table_row_idx = 1;

	for (let row_num = 0; row_num < player_data.length; row_num++) {
		let row = table.insertRow(table_row_idx);

		let curr_row = player_data[row_num];
		
		for (let col = 0; col < 6; col++) {
			row.insertCell(col).innerHTML = curr_row[col];
		}

		table_row_idx++;
	}
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "Split-Rankings.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    // var record_num = 5;  // or however many elements there are in each row
    var allTextLines = allText.split('#');
	// var entries = allTextLines[0].split(',');
	var lines = [];
	
	for (let i = 0; i < allTextLines.length; i++) {
		
		let row = allTextLines[i].split(',');
		lines.push(row);
		console.log(row);
	}
	
	update_table(lines);
	toggle_row();
	color_row();
}



// Color rows based on position
function color_row() {
	let table = document.getElementById("display-table");
	
	// for (let i = 1; i < 10; i++) {
	// 	for (let j = 0; j < 6; j++) {
	// 		let y = table[i].cells;
	// 		console.log(y[j]);
	// 	}
	// }

	let pos_list = ["RB", "WR", "TE", "QB", "DST", "K"];

	for (var i = 1, row; row = table.rows[i]; i++) {
	//iterate through rows
	//rows would be accessed using the "row" variable assigned in the for loop
		let pos = row.cells[3].innerText;
		let name = row.cells[2].innerText;

		for (var j = 0; j < pos_list.length; j++) {
			if (pos.includes(pos_list[j])) {
				row.classList.add(pos_list[j]);
				break;
			}
		}
	}
}

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