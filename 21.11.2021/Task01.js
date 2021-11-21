// Условие:
// 	Даден е следния код:

// 	var person = {
// 		_salary: 1000,
// 		getSecretSalaryInfo: function (){
// 			return this._salary;
// 		}
// 	};

// 	var stoleSalaryInfo = person.getSecretSalaryInfo;

// 	console.log(person.getSecretSalaryInfo()); //принтира 1000
// 	console.log(stoleSalaryInfo()); //принтира undefined

// 	Поправете кода така, че и двете console.log да принтират числото 1000.

var person = {
    _salary: 1000,
    getSecretSalaryInfo: function(){
        return this._salary;
    }
};

var stoleSalaryInfo = person.getSecretSalaryInfo;
console.log(person.getSecretSalaryInfo());
console.log(stoleSalaryInfo.call(person));