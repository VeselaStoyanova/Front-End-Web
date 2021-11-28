studentName.addEventListener("change", onNameChange);
studentFamily.addEventListener("change", onNameChange);
studentNumber.addEventListener("change", onFacultyNumberChange);
studentGrade.addEventListener("change", onGradeChange);
studentForm.addEventListener("submit", onSubmitForm);
//filterBtn.addEventListener("click", newSort);
filterBtn.addEventListener("click", onFilter);

function onFilter() {
    var tableBody = document.querySelector("tbody")
    var rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((secondRow, firstRow) => {
        var secondRowValue = parseFloat(secondRow.querySelector(":nth-child(4)").innerText);
        var firstRowValue = parseFloat(firstRow.querySelector(":nth-child(4)").innerText);

        if (secondRowValue - firstRowValue > 0) {
            tableBody.insertBefore(secondRow, firstRow);
            return -1;
        } else if (secondRowValue - firstRowValue < 0) {
            tableBody.insertBefore(firstRow, secondRow);
            return 1;
        } else {
            return 0;
        }
    });

}

showAllBtn.addEventListener("click", onShowAll);
showNotGreenBtn.addEventListener("click", onShowNotGreen);
showGreenBtn.addEventListener("click", onShowGreen);

function onShowGreen() {
    const tbody = document.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.forEach(
        r => r.toggleAttribute('hidden', !r.classList.contains("green"))
    );
}

function onShowNotGreen() {
    const tbody = document.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.forEach(
        r => r.toggleAttribute('hidden', r.classList.contains("green"))
    );
}

function onShowAll() {
    const tbody = document.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.forEach(
        r => r.toggleAttribute('hidden', false)
    );
}

function onSubmitForm(event) {
    event.preventDefault();
    validateFacultyNumber(studentNumber);
    validateName(studentName);
    validateName(studentFamily);
    validateGrade(studentGrade);

    addValidData(event)
}

function validateFacultyNumber(element) {
    var facNum = element.value;
    var isValid = (facNum >= 10000 && facNum < 100000);


    markAsInvalid(element, !isValid);

    return isValid;
}

function onFacultyNumberChange(event) {
    validateFacultyNumber(event.target)
}

function validateName(element) {
    //return event.target.value.length; --> second way
    var isValid = element.value !== "";

    markAsInvalid(element, !isValid)

    return isValid;
}

function onNameChange(event) {
    validateName(event.target);
}

function validateGrade(element) {
    var number = parseFloat(element.value);
    var isValid = !isNaN(number) && number >= 2 && number <= 6;

    markAsInvalid(element, !isValid)

    return isValid;
}

function onGradeChange(event) {
    validateGrade(event.target);
}

function markAsInvalid(element, isValid) {
    element.classList.toggle("red-border", isValid)
}

function addValidData(event) {
    if (validateFacultyNumber(studentNumber) && validateName(studentName) && validateName(studentFamily) && validateGrade(studentGrade)) {
        var tableBody = document.querySelector("tbody")
        var newRow = tableBody.insertRow();

        newRow.insertCell().innerHTML = studentName.value;
        newRow.insertCell().innerHTML = studentFamily.value;
        newRow.insertCell().innerHTML = studentNumber.value;
        newRow.insertCell().innerHTML = studentGrade.value;

        if (parseFloat(studentGrade.value) >= 5.5) {
            // 	newRow.style.backgroundColor = "#8efc88";
            newRow.classList.add("green");
        }

    }


}
function newSort() {
    var tableBody = document.querySelector("tbody")
    var rows = Array.from(tableBody.querySelectorAll("tr"));
    var switching = true;
    while (switching) {
        switching = false;
        for (var i = 1; i < rows.length; i++) {
            var secondRowValue = parseFloat(rows[i + 1].querySelector(":nth-child(4)").innerText);
            var firstRowValue = parseFloat(rows[i].querySelector(":nth-child(4)").innerText);
            if (secondRowValue > firstRowValue) {
                tableBody.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                break;
            }
        }
    }

}
