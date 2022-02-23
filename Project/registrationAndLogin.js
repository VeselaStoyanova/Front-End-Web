function registrationFunc(event) {
    event.preventDefault();
    let userFirstName = document.getElementById('nameInput').value;
    let userLastName = document.getElementById('lastNameInput').value;
    let userUsername = document.getElementById('usernameInput').value;
    let userEmail = document.getElementById('emailInput').value;
    let userPassword = document.getElementById('passwordInput').value;
    let userConfirmedPassword = document.getElementById('passwordSecondTimeInput').value;
    let userGender = document.getElementById('gender');
    userGender.checked ? gender = 'Male' : gender = 'Female';
    let userDateOfBirth = document.getElementById('dateOfBirthInput').value;

    let user_records=new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_records.some((v)=>{return v.username==userUsername})) {
        alert("The username is not free.");
    } else if(isValidName(userFirstName) && isValidName(userLastName) && isValidUsername(userUsername) && isValidEmail(userEmail)
        && isValidPassword(userPassword) && arePasswordsTheSame(userPassword, userConfirmedPassword) && isValidDateOfBirth(userDateOfBirth)
        && isUsernameFree(userUsername)){
        user_records.push({
            "firstName" : userFirstName,
            "lastName" : userLastName,
            "username" : userUsername,
            "email" : userEmail,
            "password" : userPassword,
            "gender" : gender,
            "dateOfBirth" : userDateOfBirth,
        });
        localStorage.setItem("users",JSON.stringify(user_records));
        location.href = "logInForm.html";
    }

}

function isValidName(name){
    let regEx = "^[a-zA-Z]{2,30}$";
    if(!name.match(regEx)){
        alert("Дължината на името трябва да бъде между 2 и 30 символа и трябва да съдържа само букви.");
        return false;
    }
    return true;
}

function isValidUsername(username){
    let regEx = "^[A-Za-z][A-Za-z0-9_]{5,29}$";
    if(!username.match(regEx)){
        alert("Потребителското име трябва да започва с буква и дължината му трябва да бъде между 6 и 30 символа.");
        return false;
    }
    return true;
}

function isValidEmail(email){
    let regEx = "^(.+)@(.+)$";
    if(!email.match(regEx)){
        alert("Невалиден имейл.");
        return false;
    }
    return true;
}

function isValidPassword(password){
    let regEx = /^(?=.*[0-9])(?=.*[!@.#$%^&*])[a-zA-Z0-9!.@#$%^&*]{6,16}$/;
    if(!password.match(regEx)){
        alert("Паролата трябва да съдържа поне едно число, една главна буква, една малка буква и поне един специален символ");
        return false;
    }
    return true;
}

function arePasswordsTheSame(password, confirmedPassword){
    if(password !== confirmedPassword){
        alert("Потвърдената парола не съвпада с паролата.");
        return false;
    }
    return true;
}

function isValidDateOfBirth(){
    let dateOfBirth = document.getElementById('dateOfBirthInput').valueAsDate;
    let currDate = new Date();
    if(currDate < dateOfBirth){
        alert("Невалидна дата на раждане.");
        return false;
    }
    if(currDate.getFullYear() - dateOfBirth.getFullYear() < 14){
        alert("Трябва да имате 14 години, за да се регистрирате.");
        return false;
    }
    if(currDate.getFullYear() - dateOfBirth.getFullYear() == 14){
        if(currDate.getMonth() < dateOfBirth.getMonth()){
            alert("Трябва да имате 14 години, за да се регистрирате.");
            return false;
        }
        if(currDate.getMonth() == dateOfBirth.getMonth()){
            if(currDate.getDate() < dateOfBirth.getDate()){
                alert("Трябва да имате 14 години, за да се регистрирате.");
                return false;
            }
        }
    }

    return true;
}

function isUsernameFree(name){
    if(localStorage.getItem(name) !== null){
        alert("Потребителското име е заето.");
        return false;
    }
    return true;
}

const loadAllExcursions = async () => {
    const response = await fetch(
        "https://api.npoint.io/d7f3bca8a9d6ff428e50"
    );
    const excursionsResponse = await response.json();
    let sortedExcursions = excursionsResponse["excursions"].sort((a, b) =>
        ((new Date(a["dateOfCreating"]).toJSON()).toString()) > ((new Date(b["dateOfCreating"]).toJSON()).toString()) ? 1 :
            ((new Date(b["dateOfCreating"]).toJSON()).toString()) > ((new Date(a["dateOfCreating"]).toJSON()).toString()) ? -1 : 0);
    sortedExcursions.forEach((excursion) => listItemTempl(excursion));
};

const listItemTempl = (excursion) => {
    const firstList = document.getElementsByClassName("mainExcursions")[0];
    let exc = document.createElement('li');
    exc.classList.add("exc");

    let topPart = document.createElement('div');
    topPart.classList.add("topPart");

    let excPhoto = document.createElement('img');
    excPhoto.src = excursion["photos"][0]["photoURL"];

    topPart.appendChild(excPhoto);

    let info = document.createElement('div');
    info.classList.add('info');

    let basicInfo = document.createElement('div');
    basicInfo.classList.add("basicInfo");

    let excName = document.createElement('h2');
    excName.classList.add("excName");
    excName.innerText = excursion["title"];

    let excRoute = document.createElement('h3');
    excRoute.classList.add("excRoute");
    excRoute.innerText = excursion["route"];

    basicInfo.appendChild(excName);
    basicInfo.appendChild(excRoute);
    info.appendChild(basicInfo);

    let excDescriptionFirstPart = document.createElement('div');
    excDescriptionFirstPart.classList.add("excDescriptionFirstPart");

    let dateOfCreatingPar = document.createElement('p');
    dateOfCreatingPar.classList.add("dateOfCreating");
    let jsonDate = new Date(excursion["dateOfCreating"]).toJSON();
    let newDate = jsonDate.toString();
    dateOfCreatingPar.innerText = "Дата на създаване: " + newDate.substr(0,10);
    excDescriptionFirstPart.appendChild(dateOfCreatingPar);

    let avgRating = document.createElement('p');
    avgRating.classList.add("avgRating");
    let ratings = JSON.parse(localStorage.getItem("ratings")) ? JSON.parse(localStorage.getItem("ratings")) : [];
    let findExc = ratings.find((v) => {
        return excursion["id"] == v.excursionId
    });
    if(findExc != null){
        avgRating.innerText = "Рейтинг: " + findExc.averageRating;
    }else{
        avgRating.innerText = "Рейтинг: -";
    }

    excDescriptionFirstPart.appendChild(avgRating);
    info.appendChild(excDescriptionFirstPart);

    let excDescriptionSecondPart = document.createElement('div');
    excDescriptionSecondPart.classList.add("excDescriptionSecondPart");

    let excType = document.createElement('h3');
    excType.classList.add("excType");
    excType.innerText = excursion["description"]["type"];

    let excEating = document.createElement('h3');
    excEating.classList.add("excEating");
    excEating.innerText = excursion["description"]["eating"];

    let excNightsNumber = document.createElement('h3');
    excNightsNumber.classList.add("excNightsNumber");
    excNightsNumber.innerText = excursion["description"]["nightsNumber"];

    excDescriptionSecondPart.appendChild(excType);
    excDescriptionSecondPart.appendChild(excEating);
    excDescriptionSecondPart.appendChild(excNightsNumber);

    let excBottomPart = document.createElement('div');
    excBottomPart.classList.add("excBottomPart");

    let excPrice = document.createElement('h3');
    excPrice.classList.add("excPrice");
    excPrice.innerText = excursion["price"];

    let moreInfo = document.createElement('button');
    moreInfo.classList.add("moreInfo");
    moreInfo.addEventListener("click", function(event){
        let id= excursion['id'];
        window.location.href = "excursion.html/?id="+id;
    });
    moreInfo.innerText = "Виж още";

    excBottomPart.appendChild(excPrice);
    excBottomPart.appendChild(moreInfo);

    exc.appendChild(topPart);
    exc.appendChild(info);
    exc.appendChild(excDescriptionSecondPart);
    exc.appendChild(excBottomPart);
    firstList.appendChild(exc);
}

const displayAllItems = (excursion) => {
    const list = document.getElementsByClassName("mainExcursion")[0];

    let basicInfo = document.createElement('header');
    basicInfo.classList.add("basicInfo");

    let basicInfoList = document.createElement('ul');
    basicInfoList.classList.add("basicInfoList");
    basicInfo.appendChild(basicInfoList);

    let excursionType = document.createElement('li');
    excursionType.classList.add("excursionType");
    basicInfoList.appendChild(excursionType);

    let excType = document.createElement('span');
    excType.classList.add("excType");
    excType.innerText = excursion["description"]["type"];
    excursionType.appendChild(excType);

    let dates = document.createElement('li');
    dates.classList.add("dates");
    basicInfoList.appendChild(dates);

    let firstExcursionDates = document.createElement('span');
    firstExcursionDates.classList.add("firstExcursionDates");
    firstExcursionDates.innerText = excursion["dates"][0]["dateFrom"] + " - " + excursion["dates"][0]["dateTo"];
    dates.appendChild(firstExcursionDates);

    let eating = document.createElement('li');
    eating.classList.add("eating");
    basicInfoList.appendChild(eating);

    let eatingType = document.createElement('span');
    eatingType.classList.add("eatingType");
    eatingType.innerText = excursion["description"]["eating"];
    eating.appendChild(eatingType);

    let numberOfNights = document.createElement('li');
    numberOfNights.classList.add("numberOfNights");
    basicInfoList.appendChild(numberOfNights);

    let nightsNumber = document.createElement('span');
    nightsNumber.classList.add("nightsNumber");
    nightsNumber.innerText = excursion["description"]["nightsNumber"];
    numberOfNights.appendChild(nightsNumber);

    let excCategory = document.createElement('li');
    excCategory.classList.add("excCategory");
    basicInfoList.appendChild(excCategory);

    let category = document.createElement('span');
    category.classList.add("category");
    category.innerText = excursion["category"];
    excCategory.appendChild(category);

    let importantExcInfo = document.createElement('div');
    importantExcInfo.classList.add("importantExcInfo");
    basicInfo.appendChild(importantExcInfo);

    let nameOfExc = document.createElement('h1');
    nameOfExc.classList.add("nameOfExc");
    nameOfExc.innerText = excursion["title"];
    importantExcInfo.appendChild(nameOfExc);

    let routeOfExc = document.createElement('h2');
    routeOfExc.classList.add("routeOfExc");
    routeOfExc.innerText = excursion["route"];
    importantExcInfo.appendChild(routeOfExc);

    let destinationOfExc = document.createElement('h2');
    destinationOfExc.classList.add("destinationOfExc");
    destinationOfExc.innerText = excursion["destination"];
    importantExcInfo.appendChild(destinationOfExc);

    let priceOfExc = document.createElement('h3');
    priceOfExc.classList.add("priceOfExc");
    priceOfExc.innerText = "Цена: " + excursion["price"];
    importantExcInfo.appendChild(priceOfExc);

    let dateOfCreating = document.createElement('div');
    dateOfCreating.classList.add("dateOfCreating");
    basicInfo.appendChild(dateOfCreating);

    let photosDiv = document.createElement('div');
    photosDiv.classList.add("photosDiv");

    excursion.photos.forEach((exc) =>
        photosDiv.appendChild(loadPhotos(exc.photoURL))
    )

    basicInfo.appendChild(photosDiv);

    let secondaryInfo = document.createElement("div");
    secondaryInfo.classList.add("secondaryInfo");

    let datesOfExc = document.createElement("div");
    datesOfExc.classList.add("datesOfExc");

    secondaryInfo.appendChild(datesOfExc);

    let freeDates = document.createElement("ul");
    freeDates.classList.add("freeDates");
    freeDates.innerText = "Свободни дати";

    excursion.dates.forEach((exc) =>
        freeDates.appendChild(createUnorderedListForDates(exc.dateFrom, exc.dateTo)));

    datesOfExc.appendChild(freeDates);

    let programDiv = document.createElement("div");
    programDiv.classList.add("programDiv");

    secondaryInfo.appendChild(programDiv);

    let program = document.createElement("ul");
    program.classList.add("program");
    programDiv.appendChild(program);
    program.innerText = "Програма";

    excursion.program.forEach((exc) =>
        program.appendChild(createUnorderedListForProgram(exc.dayNumber, exc.thingsToDo)));

    let penaltiesDiv = document.createElement("div");
    penaltiesDiv.classList.add("penaltiesDiv");

    secondaryInfo.appendChild(penaltiesDiv);

    let penalties = document.createElement("ul");
    penalties.classList.add("penalties");
    penaltiesDiv.appendChild(penalties);
    penalties.innerText = "Неустойки";

    excursion.moreInfo.penalties.forEach((exc) =>
        penalties.appendChild(createUnorderedList(exc.info)));

    let necessaryDocumentsOfExcDiv = document.createElement("div");
    necessaryDocumentsOfExcDiv.classList.add("necessaryDocumentsOfExcDiv");

    secondaryInfo.appendChild(necessaryDocumentsOfExcDiv);

    let necessaryDocuments = document.createElement("ul");
    necessaryDocuments.classList.add("necessaryDocuments");
    necessaryDocumentsOfExcDiv.appendChild(necessaryDocuments);
    necessaryDocuments.innerText = "Необходими документи:";

    excursion.moreInfo.necessaryDocuments.forEach((exc) =>
        necessaryDocuments.appendChild(createUnorderedList(exc.info)));

    let enrollmentConditionsOfExcDiv = document.createElement("div");
    enrollmentConditionsOfExcDiv.classList.add("enrollmentConditionsOfExcDiv");

    secondaryInfo.appendChild(enrollmentConditionsOfExcDiv);

    let enrollmentConditions = document.createElement("p");
    enrollmentConditions.classList.add("enrollmentConditions");
    enrollmentConditions.innerText = "Условия за записване:" + "\n" + excursion["moreInfo"]["enrollmentConditions"];
    enrollmentConditionsOfExcDiv.appendChild(enrollmentConditions);

    let infoAboutPrice = document.createElement("div");
    infoAboutPrice.classList.add("infoAboutPrice");

    let thingsInPriceDiv = document.createElement("div");
    thingsInPriceDiv.classList.add("thingsInPriceDiv");

    infoAboutPrice.appendChild(thingsInPriceDiv);

    let thingsInPrice = document.createElement("ul");
    thingsInPrice.classList.add("thingsInPrice");
    thingsInPriceDiv.appendChild(thingsInPrice);

    thingsInPrice.innerText = "В цената се включват: ";
    excursion.priceInclude.forEach((exc) =>
        thingsInPrice.appendChild(createUnorderedList(exc.info)));

    let thingsNotInPriceDiv = document.createElement("div");
    thingsNotInPriceDiv.classList.add("thingsNotInPriceDiv");

    infoAboutPrice.appendChild(thingsNotInPriceDiv);

    let thingsNotInPrice = document.createElement("ul");
    thingsNotInPrice.classList.add("thingsNotInPrice");
    thingsNotInPriceDiv.appendChild(thingsNotInPrice);
    thingsNotInPrice.innerText = "В цената не се включват: ";
    excursion.priceNotInclude.forEach((exc) =>
        thingsNotInPrice.appendChild(createUnorderedList(exc.info)));

    let moreExcursionsTable = document.createElement("table");
    moreExcursionsTable.classList.add("moreExcursionsTable");

    moreExcursionsTable.innerText = "Допълнителни екскурзии";
    let firstRow = moreExcursionsTable.insertRow(0);

    let firstCell = firstRow.insertCell(0);
    let secondCell = firstRow.insertCell(1);
    let thirdCell = firstRow.insertCell(2);

    firstCell.innerText = "Място";
    secondCell.innerText = "Цена за възрастен";
    thirdCell.innerText = "Цена за дете";
    moreExcursionsTable.appendChild(firstRow);

    excursion.moreExcursions.forEach((exc) =>
        moreExcursionsTable.appendChild(createTableWithMoreExc(exc.place, exc.priceForAdult, exc.priceForChild)));

    list.appendChild(basicInfo);
    list.appendChild(secondaryInfo);
    list.appendChild(infoAboutPrice);
    list.appendChild(moreExcursionsTable);
}

const loadPhotos = (photoURL) => {
    let img = document.createElement("img");
    img.classList.add("box-image");
    img.src = "../" + photoURL;
    return img;
}

const createUnorderedListForDates = (dateFrom, dateTo) => {
    let freeDate  = document.createElement("li");
    freeDate.classList.add("freeDate");
    freeDate.innerText = dateFrom + " - " + dateTo;
    return freeDate;
}

const createUnorderedListForProgram = (dayNumber, thingsToDo) => {
    let programForDay = document.createElement("li");
    programForDay.classList.add("programForDay");
    programForDay.innerText = dayNumber + "\n" + thingsToDo;
    return programForDay;
}

const createUnorderedList = (condition) =>{
    let li = document.createElement("li");
    li.classList.add("li");
    li.innerText = condition;
    return li;
}

const createTableWithMoreExc = (place, priceForAdult, priceForChild) => {
   let row = document.createElement("tr");
   row.classList.add("row");

   let firstCell = document.createElement("td");
   firstCell.innerText = place;

   let secondCell = document.createElement("td");
   secondCell.innerText = priceForAdult;

   let thirdCell = document.createElement("td");
   thirdCell.innerText = priceForChild;

   row.appendChild(firstCell);
   row.appendChild(secondCell);
   row.appendChild(thirdCell);

   return row;
}




