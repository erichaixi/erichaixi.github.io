window.addEventListener('load', (event) => {
	console.log('page is fully loaded');
	test();
});

function test() {
	document.getElementById("total-amount").value = "";
}

function update_tip(val) {
	document.getElementById("tip-pct").innerHTML = val + "%";
	update_all();
}

function update_people(val) {
	document.getElementById("num_people_count").innerHTML = val;
	update_all();
}

function update_all() {
	let tip_pct = parseInt(document.getElementById("tip-pct").innerHTML.slice(0, -1));

	// Get current total, pre-tax
	let curr_total = document.getElementById("total-amount").value;
	if (curr_total.length > 0) {
		curr_total = parseFloat(curr_total);
	}
	else {
		curr_total = 0;
	}

	// Tip amount + grand total
	let grand_total = 0;
	if (curr_total == 0) {
		console.log("Empty total");
		document.getElementById("tip-amt").innerHTML = "$0.00";
		document.getElementById("grand-total-amt").innerHTML = "$0.00";
	}
	else {
		let tip = parseFloat(((tip_pct / 100.0) * curr_total).toFixed(2));
		document.getElementById("tip-amt").innerHTML = "$" + tip;
		console.log("Tip amount: " + tip);

		grand_total = (tip + curr_total).toFixed(2);
		console.log("Grand total: " + grand_total);
		document.getElementById("grand-total-amt").innerHTML = "$" + grand_total;
	}

	// $ per person
	let num_people = parseInt(document.getElementById("num_people_count").innerHTML);
	let cost_per_person = (parseFloat(grand_total) / num_people).toFixed(2);
	document.getElementById("split_cost").innerHTML = "$" + cost_per_person;

	// $ per couple
	let cost_per_couple = (2 * parseFloat(cost_per_person)).toFixed(2);
	document.getElementById("couple_cost").innerHTML = "$" + cost_per_couple;
}