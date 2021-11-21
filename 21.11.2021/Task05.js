// Условие:
// Напишете три класа, които отговарят на следната UML диаграма:
// 1.	PaymentMethod – клас, който трябва да има само един метод, който return-ва string: "Your amount in the account is: "
// 2.	CashMethod – наследява PaymentMethod и има:
//     a.	Наистина private property amount, което не може да бъде достъпвано директно от инстанцията.
//     b.	Public method addToAmount, който добавя стойност към private property-то
//     c.	Public method reduceFromAmount, който изважда стойност от private property-то
//     d.	Public method getAmount, който извиква родителския getAmount и в края добавя стойността от private property-то към текущия стринг
// 3.	CreditMethod – наследява PaymentMethod и има:
//     a.	Наистина private property amount, което не може да бъде достъпвано директно от инстанцията.
//     b.	Public method addToAmount, който добавя 90% от подадената стойност към private property-то
//     c.	Public method reduceFromAmount, който изважда стойност от private property-то
//     d.	Public method getAmount, който извиква родителския getAmount и в края добавя стойността от private property-то към текущия стринг

// Пример за използване на класовете:
// const cashAccount = new CashMethod();
// cashAccount.getAmount(); // returns “Your amount in the account is: 0”
// cashAccount.addToAmount(100); // returns cashAccount instance (useful for method chaining)
// cashAccount.addToAmount(20).addToAmount(30).reduceFromAmount(10); // returns cashAccount instance (useful for method chaining)
// cashAccount.getAmount(); // returns “Your amount in the account is: 140”

// const creditAccount = new CreditMethod();
// creditAccount.addToAmount(100); // returns creditAccount instance (useful for method chaining)
// creditAccount.getAmount(); // returns “Your amount in the account is: 90”;

// В публичния interface на класовете не е разрешено да има нищо друго освен описаните методи и всички наследени от Object.

class PaymentMethod {
    getResult() {
        return "Your amount in the account is: ";
    }
}


class CashMethod extends PaymentMethod {
    constructor() {
        super();

        let amount = 0;

        this.getAmount = function () {
            return amount;
        }

        this.setAmount = function (newAmount) {
            amount = newAmount;
        }
    }

    addToAmount(value) {
        this.setAmount(this.getAmount() + value);
        return this;
    }

    reduceFromAmount(value) {
        this.setAmount(this.getAmount() - value);
        return this;
    }

    getResult() {
        return super.getResult() + this.getAmount();
    }

}

class CreditMethod extends PaymentMethod {
    constructor() {
        super();

        let amount = 0;

        this.getAmount = function () {
            return amount;
        }

        this.setAmount = function (newAmount) {
            amount = newAmount;
        }
    }

    addToAmount(value) {
        this.setAmount(this.getAmount() + (9 / 10) * value);
        return this;
    }

    reduceFromAmount(value) {
        this.setAmount(this.getAmount() - value);
        return this;
    }

    getResult() {
        return super.getResult() + this.getAmount();
    }
}

const cashAccount = new CashMethod();
cashAccount.getResult(); // returns “Your amount in the account is: 0”
cashAccount.addToAmount(100); // returns cashAccount instance (useful for method chaining)
cashAccount.addToAmount(20).addToAmount(30).reduceFromAmount(10); // returns cashAccount instance (useful for method chaining)
console.log(cashAccount.getResult()); // returns “Your amount in the account is: 140”

const creditAccount = new CreditMethod();
creditAccount.addToAmount(100); // returns creditAccount instance (useful for method chaining)
console.log(creditAccount.getResult()); // returns “Your amount in the account is: 90”;