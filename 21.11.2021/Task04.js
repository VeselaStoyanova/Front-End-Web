// Условие:
// 	С помощта на closure и клас, направете задача 1, така че _sallary да е наистина
// 	private.

function privatePerson(){
    let _salary = 1000;
    this.getSecretSalaryInfo = function(){
        return _salary;
    }
}

let privateP = new privatePerson();
console.log(privateP.getSecretSalaryInfo());