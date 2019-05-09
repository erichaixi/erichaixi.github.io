let my_choice = "";
let ai_choice = "";

document.write("Clicked");

//document.getElementById("btn_rock").onclick = choose("me", "rock");


function choose(who, what) {
    if (who == "me") {
        my_choice = what;
        document.write("You chose " + what);
    }
}