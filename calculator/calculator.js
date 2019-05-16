let val = "0";

document.addEventListener('keyup', processKeyPress);

document.getElementById("btn1").addEventListener("click", button_1);
document.getElementById("btn2").addEventListener("click", button_2);
document.getElementById("btn3").addEventListener("click", button_3);
document.getElementById("btn4").addEventListener("click", button_4);
document.getElementById("btn5").addEventListener("click", button_5);
document.getElementById("btn6").addEventListener("click", button_6);
document.getElementById("btn7").addEventListener("click", button_7);
document.getElementById("btn8").addEventListener("click", button_8);
document.getElementById("btn9").addEventListener("click", button_9);
document.getElementById("btn0").addEventListener("click", button_0);
document.getElementById("btn+").addEventListener("click", button_add);
document.getElementById("btn-").addEventListener("click", button_sub);
document.getElementById("btn*").addEventListener("click", button_mul);
document.getElementById("btn/").addEventListener("click", button_div);
document.getElementById("btnC").addEventListener("click", button_clear);
document.getElementById("btn=").addEventListener("click", solve);

function update_display() {
	if (val.length <= 14) {
		document.getElementById("display").innerHTML = val;
	}
	else {
		document.getElementById("display").innerHTML = val.slice(val.length-14, val.length);
	}
	
}

function solve() {
	console.log(val);
	if (last_is_operator()) {
		return;
	}

	let pos = get_oper_idx();
	if (pos == -1) {
		update_display();
		return;
	}
	operate(pos);
	console.log("solve");
	solve();
}

function get_oper_idx() {
	// Returns string index of highest precedence operator, or -1 if no more operators
	let pos = val.indexOf("x");
	if (pos > -1) {
		return pos;
	}
	pos = val.indexOf("/");
	if (pos > -1) {
		return pos;
	}
	pos = val.indexOf("+");
	if (pos > -1) {
		return pos;
	}
	pos = val.indexOf("-");
	return pos;
}

function operate(pos) {
	// Takes the index of an operator as input
	// Performs this operation on the 2 numbers on either side and replaces them with the answer
	let left_operand = parseInt(val.slice(get_left_operand_start(pos), pos));
	let right_operand = parseInt(val.slice(pos+1, get_right_operand_end(pos)));

	let res = 0;
	switch (val.charAt(pos)) {
		case "x":
			res = left_operand * right_operand;
			break;
		case "/":
			res = Math.floor(left_operand / right_operand);
			break;
		case "+":
			res = left_operand + right_operand;
			break;
        case "-":
            res = left_operand - right_operand;
            if (res < 0) {
                res = 0;
            }
			break;
		default:
			break;
	}
	let str_to_replace = left_operand.toString(10) + val.charAt(pos) + right_operand.toString(10);
	val = val.replace(str_to_replace, res.toString(10));
}

function get_left_operand_start(pos) {
	// Takes the index of an operator as input
	// Returns index of previous operator, or 0 if there's only a number to the left
	let curr = pos - 2;
	while (curr > 0) {
		switch (val.charAt(curr)) {
			case "+":
			case "-":
			case "x":
			case "/":
				return curr;
			default:
				curr--;
		}
	}
	return 0;
}

function get_right_operand_end(pos) {
	// Takes the index of an operator as input
	// Returns index of next operator, or length of val if there's only a number to the right
	let curr = pos + 2;
	while (curr < val.length) {
		switch (val.charAt(curr)) {
			case "+":
			case "-":
			case "x":
			case "/":
				return curr;
			default:
				curr++;
		}
	}
	return val.length;
}



function processKeyPress(event) {
    switch (event.key) {
        case "1":
            button_1();
            break;
        case "2":
            button_2();
            break;
        case "3":
            button_3();
            break;
        case "4":
            button_4();
            break;
        case "5":
            button_5();
            break;
        case "6":
            button_6();
            break;
        case "7":
            button_7();
            break;
        case "8":
            button_8();
            break;
        case "9":
            button_9();
            break;
        case "0":
            button_0();
            break;
        case "Delete":
        case "Backspace":
            button_clear();
            break;
        case "/":
            button_div();
            break;
        case "*":
            button_mul();
            break;
        case "-":
            button_sub();
            break;
        case "+":
            button_add();
            break;
        case "Enter":
            solve();
            break;
        default:
            break;
    }
}

function button_1() {
	add_to_val("1");
	update_display();
}
function button_2() {
	add_to_val("2");
	update_display();
}
function button_3() {
	add_to_val("3");
	update_display();
}
function button_4() {
	add_to_val("4");
	update_display();
}
function button_5() {
	add_to_val("5");
	update_display();
}
function button_6() {
	add_to_val("6");
	update_display();
}
function button_7() {
	add_to_val("7");
	update_display();
}
function button_8() {
	add_to_val("8");
	update_display();
}
function button_9() {
	add_to_val("9");
	update_display();
}
function button_0() {
	add_to_val("0");
	update_display();
}
function button_add() {
	add_to_val("+");
	update_display();
}
function button_sub() {
	add_to_val("-");
	update_display();
}
function button_mul() {
	add_to_val("x");
	update_display();
}
function button_div() {
	add_to_val("/");
	update_display();
}
function button_clear() {
	val = "0";
	document.getElementById("display").innerHTML = "0";
}


function add_to_val(next) {
	if (val == "0") {
		switch (next) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
				val = next;
				break;
			default:
				break;
		}
	}
	else if (last_is_operator()) {
		switch (next) {
			case "+":
			case "-":
			case "x":
			case "/":
				val = val.slice(0, -1) + next;
				break;
			default:
				val += next;
				break;
		}
	}
	else {
		val += next;
	}
}

function last_is_operator() {
	switch (val.charAt(val.length - 1)) {
		case "+":
		case "-":
		case "x":
		case "/":
			return true;
		default:
			return false;
	}

}