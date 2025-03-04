const calculatorScreen = document.querySelector(".calculator-screen"); // mendapatkan elemen dengan class calculator-screen

const updateScreen = (number) => { // membuat fungsi updateScreen dengan parameter number
    calculatorScreen.value = number; // mengubah value dari calculatorScreen dengan parameter number
};

let previousNumber = ""; //deklarasi variabel previousNumber dengan nilai string kosong
let calculationOperator = ""; 
let currentNumber = "0"; 

const inputNumber = (number) => { // membuat fungsi inputNumber dengan parameter number
    currentNumber = currentNumber === "0" ? number : currentNumber + number; 
    // jika currentNumber sama dengan 0 maka currentNumber akan diisi dengan number, jika tidak maka currentNumber akan diisi dengan currentNumber + number
};

document.querySelectorAll(".number").forEach((number) => { // mengambil semua elemen dengan class number
    number.addEventListener("click", (event) => { // menambahkan event click pada elemen number
        inputNumber(event.target.value); // memanggil fungsi inputNumber dengan parameter event.target.value
        updateScreen(previousNumber + calculationOperator + currentNumber); // memanggil fungsi updateScreen dengan parameter previousNumber + calculationOperator + currentNumber
    });
});

const inputOperator = (operator) => { 
    if (calculationOperator === "") {  // jika calculationOperator sama dengan string kosong
        previousNumber = currentNumber; // previousNumber akan diisi dengan currentNumber
    }
    calculationOperator = operator; // calculationOperator akan diisi dengan operator
    currentNumber = "0"; // currentNumber akan diisi dengan string 0
};

document.querySelectorAll(".operator").forEach((operator) => { 
    operator.addEventListener("click", (event) => { // menambahkan event click pada elemen operator
        if (calculationOperator !== "" && currentNumber !== "0") { // jika calculationOperator tidak sama dengan string kosong dan currentNumber tidak sama dengan string 0
            calculate(); // maka panggil fungsi calculate
            updateScreen(currentNumber); // panggil fungsi updateScreen dengan parameter currentNumber
        }
        inputOperator(event.target.value); // panggil fungsi inputOperator dengan parameter event.target.value
        updateScreen(previousNumber + event.target.value); // panggil fungsi updateScreen dengan parameter previousNumber + event.target.value
    });
});

const calculate = () => {
    let result = "";
    const previous = parseFloat(previousNumber); // mengubah previousNumber menjadi float
    const current = parseFloat(currentNumber);
    switch (calculationOperator) { // membuat switch case dengan parameter calculationOperator
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "x":
            result = previous * current;
            break;
        case "/":
            result = previous / current;
            break;
        default:
            return;
    }
    currentNumber = result.toString(); // mengubah currentNumber menjadi string
    calculationOperator = "";
};

document.querySelector(".equal-sign").addEventListener("click", () => {
    calculate();
    updateScreen(currentNumber);
});

const clearAll = () => {
    previousNumber = "";
    calculationOperator = "";
    currentNumber = "0";
};

document.querySelector(".all-clear").addEventListener("click", () => { // menambahkan event click pada elemen all-clear
    clearAll();
    updateScreen(currentNumber); // panggil fungsi updateScreen dengan parameter currentNumber
});

const inputDecimal = (dot) => { // membuat fungsi inputDecimal dengan parameter dot
    if (!currentNumber.includes(dot)) { // jika currentNumber tidak mengandung dot
        currentNumber += dot;
    }
};

document.querySelector(".decimal").addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
});

document.querySelector(".persentage").addEventListener("click", () => {
    currentNumber = (parseFloat(currentNumber) / 100).toString(); // mengubah currentNumber menjadi float kemudian dibagi 100 dan diubah menjadi string
    updateScreen(currentNumber); // panggil fungsi updateScreen dengan parameter currentNumber
});


