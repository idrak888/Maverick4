// calculator array
let calculatorArray;
let calculatorDomArray = [];
// other variable 
let tempSpan
let counter
let parenthesisCounter
let finalParenthesis
let toLoop = false

function factorialize(num) {
    //recursive approach
  if (num < 0) 
        return -1;
  else if (num == 0) 
      return 1;
    else {
        return (num * factorialize(num - 1))
    }
}

export function compute(stringInput) {
    // all the calculator used function
    let openParenthesisSign = 0
    let openParenthesisCounter = 0 
    let closedParenthesisCounter = 0
    
    if (stringInput.includes("pi")) {
        stringInput = stringInput.replaceAll("pi", Math.PI);
    } 

    if (stringInput.includes("e")) {
        stringInput = stringInput.replaceAll("e", Math.E);
    }

    if (stringInput.includes("log") || stringInput.includes("sqrt") || stringInput.includes("!") || stringInput.includes("sin") || stringInput.includes("cos") || stringInput.includes("tan") || stringInput.includes("cot") || stringInput.includes("sec") || stringInput.includes("csc")) {
        if (stringInput.includes("log")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return Math.log2(num);
        }
        if (stringInput.includes("sqrt")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return Math.sqrt(num);
        }
        if (stringInput.includes("!")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return factorialize(num);
        }
        if (stringInput.includes("sin")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return Math.sin(num).toFixed(2);
        }
        if (stringInput.includes("cos")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return Math.cos(num).toFixed(2);
        }
        if (stringInput.includes("tan")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return Math.tan(num).toFixed(2);
        }
        if (stringInput.includes("sec")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return 1/Math.cos(num).toFixed(2);
        }
        if (stringInput.includes("cot")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return 1/Math.tan(num).toFixed(2);
        }
        if (stringInput.includes("csc")) {
            var num = parseFloat(stringInput.slice(stringInput.indexOf("(") + 1, stringInput.indexOf(")")))
            return 1/Math.sin(num).toFixed(2);
        }
    } else {
        calculatorArray = stringInput.split("");
    }

    uniteCharacter()
    parseCalculatorArray()

    console.log(calculatorArray)

    while(calculatorArray.includes("sin(" || calculatorArray.includes("cos("))) {
        solveMultiplicationAndDivisionInParenthesis()
        solveAdditionsAndSubtractionInParenthesis()

        for (let i = 0; i < calculatorArray.length; i++) {
            if (calculatorArray[i] === "(") {
                openParenthesisCounter++
                openParenthesisSign = i
            }
            if (calculatorArray[i] === ")") {
                closedParenthesisCounter++
            }
        }
    }

    while(calculatorArray.includes("(" || calculatorArray.includes(")"))) {
        solveMultiplicationAndDivisionInParenthesis()
        solveAdditionsAndSubtractionInParenthesis()

        for (let i = 0; i < calculatorArray.length; i++) {
            if (calculatorArray[i] === "(") {
                openParenthesisCounter++
                openParenthesisSign = i
            }
            if (calculatorArray[i] === ")") {
                closedParenthesisCounter++
            }
        }
        // count how many pharenthesis he user has inserted 
        if (openParenthesisCounter !== closedParenthesisCounter) {
            preventCrash()
            break
        }
        else if (openParenthesisCounter === closedParenthesisCounter && calculatorArray[openParenthesisSign + 1] === ")") {
            preventCrash()
            break
        }
        
    } 
    
    while(calculatorArray.includes("*") || calculatorArray.includes("/") || calculatorArray.includes("+") || calculatorArray.includes("-") || calculatorArray.some(x => x < 0) && calculatorArray.length !== 1) {
        solveMultiplicationAndDivision()
        solveAdditionsAndSubtraction()
    }
    appendResult()


    // calculator logic
    // function used to unite into number all the string 
    function uniteCharacter() {
        let counter = 0
        while (calculatorArray[counter + 1] !== undefined) {
            try {
                if (isNaN(parseFloat(calculatorArray[counter])) && calculatorArray[counter] !== "-") {
                    counter++
                }
                else if (isNaN(parseFloat(calculatorArray[counter])) === false || calculatorArray[counter] === "-") {
                    if (isNaN(parseFloat(calculatorArray[counter + 1])) === false || calculatorArray[counter + 1] === ".") {
                        let numberCounter = counter
                        while (isNaN(parseFloat(calculatorArray[numberCounter + 1])) === false || calculatorArray[counter + 1] === ".") {
                            calculatorArray[numberCounter] += calculatorArray[numberCounter + 1]
                            calculatorArray.splice(numberCounter + 1, 1)
                        }
                    }
                    else {
                        counter++
                    }
                }

            } catch (e) {
                counter--
                break
            }
        }
        console.log(calculatorArray)
        calculatorArray[calculatorArray.length - 1] = calculatorArray[calculatorArray.length - 1].replaceAll('undefined', '')
    }
    // function to parse all the string into number
    function parseCalculatorArray() {
        for (let i = 0; i < calculatorArray.length; i++) {
            if (isNaN(parseFloat(calculatorArray[i])) === false) {
                calculatorArray[i] = parseFloat(calculatorArray[i])
            }
        }
    }
    return calculatorArray;
}
    
function appendResult() {}

function preventCrash() {
    alert("You have insert something wrong, pls retry")
    alert("Remember that you have to insert every operator and number in the correct aritmethical order for example don't do something like 33(22+44)")            
}

// function used to solve first all the multiplicatio in parenthesis
function solveMultiplicationAndDivisionInParenthesis() {
    do {
        for (let j = calculatorArray.length; j > 0; j--) {
            if (calculatorArray[j] === ")") {
                finalParenthesis = j
            }
        }
        for (let i = 0; i < calculatorArray.length; i++) {
            if (calculatorArray[i] === "(" && i < finalParenthesis) {
                parenthesisCounter = i
                counter = parenthesisCounter + 1
            }
        }
        for (let i = parenthesisCounter; i < finalParenthesis; i++) {
            if (calculatorArray[i] === "*" || calculatorArray[i] === "/") {
                toLoop = true
                break
            }
            else {
                toLoop = false
            }
        }

        while (counter < finalParenthesis) {
            counter++
            // iterate trought the parenthesis
            for (let operatorChecker = parenthesisCounter + 1; operatorChecker < finalParenthesis; operatorChecker++) {
                multiplyDivide(operatorChecker) 
            }
        }
    } while (toLoop === true && calculatorArray.includes("(") && calculatorArray.includes(")"))
}
    

function multiplyDivide(operatorChecker) {
    // check if the number is negative
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "*" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] *= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "/" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] /= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "*" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] *= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    for (let i = 0; i < calculatorArray.length; i++) {
        if (calculatorArray[i - 1] === "(" && isNaN(parseFloat(calculatorArray[i])) === false && calculatorArray[i + 1] === ")") {
            calculatorArray.splice(i - 1, 1)
            i--
            calculatorArray.splice(i + 1, 1)
            i--
        }
    }
}

// function used to add and subtract in pharenthesis
function solveAdditionsAndSubtractionInParenthesis() {
    do {
        for (let j = calculatorArray.length; j > 0; j--) {
            if (calculatorArray[j] === ")") {
                finalParenthesis = j
            }
        }
        for (let i = 0; i < calculatorArray.length; i++) {
            if (calculatorArray[i] === "(" && i < finalParenthesis) {
                parenthesisCounter = i
                counter = parenthesisCounter + 1
            }
        }
        for (let i = parenthesisCounter; i < finalParenthesis; i++) {
            if (calculatorArray[i] === "+" || calculatorArray[i] === "-") {
                toLoop = true
                break
            }
            else {
                toLoop = false
            }
        }
        
        
        while (counter < finalParenthesis) {
            counter++
            // iterate trought the pharenthesis
            for (let operatorChecker = parenthesisCounter + 1; operatorChecker < finalParenthesis; operatorChecker++) {
                sumSubtract(operatorChecker)                
            }
        }
    } while (toLoop === true && calculatorArray.includes("(") && calculatorArray.includes(")"))
}

function sumSubtract(operatorChecker) {
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] < 0 && calculatorArray[operatorChecker - 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] += calculatorArray[operatorChecker]
        calculatorArray.splice(operatorChecker, 1)
    }
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "+" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] += calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "-" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] -= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    // check if there is a negative number 
    

    for (let i = 0; i < calculatorArray.length; i++) {
        if (calculatorArray[i - 1] === "(" && isNaN(parseFloat(calculatorArray[i])) === false && calculatorArray[i + 1] === ")") {
            calculatorArray.splice(i - 1, 1)
            i--
            calculatorArray.splice(i + 1, 1)
            i--
            finalParenthesis = parenthesisCounter
            toLoop = false
        }
    }        
} 

// solve multiplication and division that are outside of the parenthesis

function solveMultiplicationAndDivision() {
        for (let i = 0; i < calculatorArray.length; i++) {
            if (calculatorArray[i] === "*") {
                calculatorArray[i - 1] *= calculatorArray[i + 1]
                calculatorArray.splice(i,2)
            }
            if (calculatorArray[i] === "/") {
                calculatorArray[i - 1] /= calculatorArray[i + 1]
                calculatorArray.splice(i,2)
            }
            if (i === calculatorArray.length - 1 && calculatorArray.includes("*") || calculatorArray.includes("/")) {
                i = 0
            }
        }
}

// solve addition and subtraction that are outside of the parenthesis

function solveAdditionsAndSubtraction() {
    for (let i = 0; i < calculatorArray.length; i++) {
        if (calculatorArray[i] === "+") {
            calculatorArray[i - 1] += calculatorArray[i + 1]
            calculatorArray.splice(i,2)
        }
        if (calculatorArray[i - 1] !== undefined && calculatorArray[i] < 0) {
            calculatorArray[i - 1] += calculatorArray[i]
            calculatorArray.splice(i,1)
        }
    }
}         