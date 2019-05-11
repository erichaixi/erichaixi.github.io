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

function update_all() {
	let tip_pct = parseInt(document.getElementById("tip-pct").innerHTML.slice(0, -1));
	console.log("tip %: " + tip_pct);

	let curr_total = document.getElementById("total-amount").value;
	if (curr_total.length > 0) {
		curr_total = parseFloat(curr_total);
	}
	else {
		curr_total = 0;
	}
	console.log("Total: " + curr_total);

	if (curr_total == 0) {
		console.log("Empty total");
		document.getElementById("tip-amt").innerHTML = "$0.00";
		document.getElementById("grand-total-amt").innerHTML = "$0.00";
	}
	else {
		let tip = parseFloat(((tip_pct / 100.0) * curr_total).toFixed(2));
		document.getElementById("tip-amt").innerHTML = "$" + tip;
		console.log("Tip amount: " + tip);

		let grand_total = (tip + curr_total).toFixed(2);
		console.log("Grand total: " + grand_total);
		document.getElementById("grand-total-amt").innerHTML = "$" + grand_total;
	}
}