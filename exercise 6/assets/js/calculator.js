class Calcolatrice {
    constructor() {
        this.result = "";
        this.operator = "";
        this.firstNumber = "";
        this.secondNumber = "";
        this.dot = false;
    }

    //funzione che aggiunge un numero alla stringa del risultato
    addNumber(number) {
        this.result += number;
        this.displayResult();
    }

    //funzione che aggiunge un operatore alla stringa del risultato
    addOperator(operator) {
        //se result è vuoto, allora non posso inserire un operatore
        if (this.result === "") {
            return;
        }
        this.result += operator;
        this.operator = operator;
        this.dot = false;
        this.displayResult();
    }

    //funzione che aggiunge un punto alla stringa del risultato
    addDot() {
        if (this.dot === false && this.result !== "") {
            this.result += ".";
            this.dot = true;
            this.displayResult();
        }
    }

    //funzione che cancella l'ultimo carattere inserito
    deleteLast() {
        //se l'ultimo carattere inserito è un ., allora lo rimuovo
        if (this.result.slice(-1) === "." || this.result.slice(-1) === "+" || this.result.slice(-1) === "-" || this.result.slice(-1) === "*" || this.result.slice(-1) === "/") {
            this.dot = false;
        }
        this.result = this.result.slice(0, -1);
        this.displayResult();
    }

    //funzione che cancella tutto il contenuto sullo schermo
    clearAll() {
        //azzero ogni variabile
        this.result = "";
        this.operator = "";
        this.firstNumber = "";
        this.secondNumber = "";
        this.dot = false;
        //mostro il risultato sullo schermo
        this.displayResult();
    }

    //funzione che calcola il risultato
    calculate() {
        this.firstNumber = this.result.split(this.operator)[0];
        this.secondNumber = this.result.split(this.operator)[1];
        switch (this.operator) {
            case "+":
                this.result = parseFloat(this.firstNumber) + parseFloat(this.secondNumber);
                break;
            case "-":
                this.result = parseFloat(this.firstNumber) - parseFloat(this.secondNumber);
                break;
            case "*":
                this.result = parseFloat(this.firstNumber) * parseFloat(this.secondNumber);
                break;
            case "/":
                this.result = parseFloat(this.firstNumber) / parseFloat(this.secondNumber);
                break;
        }
        //cast result to string
        this.result = this.result.toString();
        this.operator = "";
        this.displayResult();
    }

    //funzione che mostra il risultato sullo schermo
    displayResult() {
        document.getElementById("result").innerHTML = this.result;
    }
}

//creo un oggetto di tipo Calcolatrice
const calcolatrice = new Calcolatrice();

//recupero ogni bottone e li inserisco in variabili diverse
const zero = document.getElementById("btn0");
const one = document.getElementById("btn1");
const two = document.getElementById("btn2");
const three = document.getElementById("btn3");
const four = document.getElementById("btn4");
const five = document.getElementById("btn5");
const six = document.getElementById("btn6");
const seven = document.getElementById("btn7");
const eight = document.getElementById("btn8");
const nine = document.getElementById("btn9");
const dot = document.getElementById("btnDot");
const ac = document.getElementById("btnAC");
const del = document.getElementById("btnDEL");
const plus = document.getElementById("btnPlus");
const minus = document.getElementById("btnMinus");
const mult = document.getElementById("btnMult");
const div = document.getElementById("btnDiv");
const equal = document.getElementById("btnEqual");

//per ogni bottone, aggiungo un evento click
zero.addEventListener("click", () => {
    calcolatrice.addNumber(0);
}
);
one.addEventListener("click", () => {
    calcolatrice.addNumber(1);
}
);
two.addEventListener("click", () => {
    calcolatrice.addNumber(2);
}
);
three.addEventListener("click", () => {
    calcolatrice.addNumber(3);
}
);
four.addEventListener("click", () => {
    calcolatrice.addNumber(4);
}
);
five.addEventListener("click", () => {
    calcolatrice.addNumber(5);
}
);
six.addEventListener("click", () => {
    calcolatrice.addNumber(6);
}
);
seven.addEventListener("click", () => {
    calcolatrice.addNumber(7);
}
);
eight.addEventListener("click", () => {
    calcolatrice.addNumber(8);
}
);
nine.addEventListener("click", () => {
    calcolatrice.addNumber(9);
}
);
dot.addEventListener("click", () => {
    calcolatrice.addDot();
}
);
ac.addEventListener("click", () => {
    calcolatrice.clearAll();
}
);
del.addEventListener("click", () => {
    calcolatrice.deleteLast();
}
);
plus.addEventListener("click", () => {
    calcolatrice.addOperator("+");
}
);
minus.addEventListener("click", () => {
    calcolatrice.addOperator("-");
}
);
mult.addEventListener("click", () => {
    calcolatrice.addOperator("*");
}
);
div.addEventListener("click", () => {
    calcolatrice.addOperator("/");
}
);
equal.addEventListener("click", () => {
    calcolatrice.calculate();
}
);
