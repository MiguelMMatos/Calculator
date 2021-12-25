const bill = document.querySelectorAll("input");
const buttonsTip = document.querySelectorAll("[data-percentage]")

const tipAmout = document.querySelector("#tipAmount")
const totalPerPerson = document.querySelector("#totalPerPerson")

const errorText = document.querySelector("#error-text")
const buttonReset = document.querySelector(".buttonReset")

var dict = {}
dict["currentBill"] = "";
dict["currentTip"] = 0;
dict["currentNumberPeople"] = "";

//Takes care of the data inserted into the inputs
function handleChange(e) {
    if (e.target.dataset.percentage != null) {
        handleClickOnButton(e)
    } else {
        //Check for error if value is less than 0 
        if (e.target.value <= 0 && e.target.value.length > 0) {
            e.target.classList.add("error")
            e.target.id == "currentNumberPeople" && errorText.classList.add("show")
        } else {
            e.target.classList.remove("error")
            e.target.id == "currentNumberPeople" && errorText.classList.remove("show")
        }

        if (e.target.id == "currentTip")
            buttonsTip.forEach(button => button.classList.remove("selected"));

        dict[e.target.id] = e.target.value
    }

    calculate()
}

//Clears all tips buttons and input
function clearButtons() {
    document.querySelector("#currentTip").value = "";
    buttonsTip.forEach(button => button.classList.remove("selected"));
}

function handleClickOnButton(e) {
    clearButtons();

    dict["currentTip"] = e.target.dataset.percentage;
    e.target.classList.add("selected");
}

//Calculates the amount of tip for each person
function calculate() {

    //If the values are undefined just return 
    if (
        dict["currentBill"].length == 0 ||
        dict["currentNumberPeople"].length == 0 ||
        dict["currentTip"] == 0) {
        tipAmout.innerHTML = "<span> $ </span>" + "0.00";
        totalPerPerson.innerHTML = "<span> $ </span>" + "0.00";
        return;
    }


    let tip = dict["currentTip"] == 0 ? 1 : dict["currentTip"];

    const totalTip = dict["currentBill"] * tip / 100;
    const tipPerPerson = totalTip / dict["currentNumberPeople"];
    const totalValuePerPerson = totalTip + dict["currentBill"] / dict["currentNumberPeople"];

    tipAmout.innerHTML = "<span> $ </span>" + tipPerPerson.toFixed(2);
    totalPerPerson.innerHTML = "<span> $ </span>" + totalValuePerPerson.toFixed(2);
}

function handleReset() {
    bill.forEach(input => input.value = "")
    clearButtons()
}

bill.forEach(input => input.addEventListener("input", handleChange))
buttonsTip.forEach(button => button.addEventListener("click", handleChange))
buttonReset.addEventListener("click", handleReset)