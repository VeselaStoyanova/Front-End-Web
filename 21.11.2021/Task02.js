// Условие:
// 	Създайте клас Person с две свойства:
// 		1) "name" - различно за всяка инстанция
// 		2) "planet" = "Земя" - общо за всяка инстанция
// 	Конструкторът да приема само един параметър - "Name"

// 	Добавете функция, която принтрира "Здравей [Чък Норис] от планетата [Земя]"
// 	Направете три инстанции на обекта и извикайте функцията.

class Person {
    constructor(name){
        this.name = name;
        this.planet = 'Земя';
    }

    printPerson = function(){
        console.log('Здравей ${this.name} от планетата ${this.planet}');
    }
};

var p1 = new Person("FMI1");
var p2 = new Person("FXF");
var p3 = new Person("FMI28923");

p1.printPerson();
p2.printPerson();
p3.printPerson();