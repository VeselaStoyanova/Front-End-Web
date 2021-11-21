// Условие:
// 	Да се създаде клас Item с две свойства - име и отстъпка (в проценти).
// 	Нека основната цена е 1000 и тя се връща от метод на прототипа.
// 	Създайте метод на инстанцията, който изчислява цената, базирано на основната цена,
// 	прилагайги към нея дадената отстъпка.

class Item {
    constructor(name, discount){
        this.name = name;
        this.discount = discount;
        //this.price = 1000;
    }

    calculatePrice = function(price){
        return this.price - (this.price * (this.discount / 100));
    }
}

Item.prototype.price = 1000;
var it = new Item("item", 50);
console.log(it.calculatePrice());

function Item1(name, discount){
    this.name = name;
    this.discount = discount;
}

this.calculatePrice = function(){
    return this.price - (this.price * this.discount / 100)
}

var it1 = new Item1("test", 50);
Item.prototype.price = 1000;

console.log(it1.calculatePrice());