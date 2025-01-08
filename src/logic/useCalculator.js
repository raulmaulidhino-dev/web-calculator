import { useEffect, useState, useRef } from 'react'
import { create, all } from 'mathjs'
import { Decimal } from 'decimal.js'


export const useCalculator = () => {
    // Input Reference
    const inputRef = useRef(null);

    // Calculator Keys
    const primaryKeys = [
        { label: "7", type: "number" },
        { label: "8", type: "number" },
        { label: "9", type: "number" },
        { label: "÷", type: "operation" },
        { label: "%", type: "percent" },
        { label: "4", type: "number" },
        { label: "5", type: "number" },
        { label: "6", type: "number" },
        { label: "×", type: "operation" },
        { label: "^", type: "operation" },
        { label: "1", type: "number" },
        { label: "2", type: "number" },
        { label: "3", type: "number" },
        { label: "-", type: "operation" },
        { label: "√", type: "function" },
        { label: "0", type: "zero"},
        { label: "00", type: "double-zero" },
        { label: ".", type: "decimal-point" },
        { label: "+", type: "operation" }
    ];
    
    const secondaryKeys = [
        { label: "sin", type: "function" },
        { label: "cos", type: "function" },
        { label: "tan", type: "function" },
        { label: "ln", type: "function" },
        { label: "log", type: "function" },
        { label: "!", type: "factorial" },
        { label: "π", type: "constant" },
        { label: "e", type: "constant" },
        { label: "(", type: "property" },
        { label: ")", type: "property" },
    ];
    
    // Set Expanding & Degree Status
    const [isExpanding, setIsExpanding] = useState(false);
    const [isDeg, setIsDeg] = useState(false);
    
    // Set Expression, Decimal Point, Read-Only and Current Calculation Value Status
    const [expression, setExpression] = useState([]);
    const [isDecimalPointDisabled, setIsDecimalPointDisabled] = useState(false);
    const [isReadonly, setIsReadonly] = useState(true);
    const [currentCalculationVal, setCurrentCalculationVal] = useState("    ");

    const math = create(all);

    Decimal.set({ precision: 100 });

    math.pi = Decimal.acos(-1);
    math.e = new Decimal(1).naturalExponential();

    math.add = (x, y) => {
        return new Decimal(String(x)).add(new Decimal(String(y)));
    }
    
    math.subtract = (x, y) => {
        return new Decimal(String(x)).sub(new Decimal(String(y)));
    }

    math.multiply = (x, y) => {
        return new Decimal(String(x)).mul(new Decimal(String(y)));
    }

    math.divide = (x, y) => {
        if (y === 0) return "Cannot be divided by Zero!";
        else return new Decimal(String(x)).div(new Decimal(String(y)));
    }

    math.pow = (x, y) => {
        return new Decimal(String(x)).pow(new Decimal(String(y)));
    }

    math.sqrt = x => {
        return new Decimal(String(x)).sqrt();
    }

    math.sin = x => {
        x = isDeg ? math.multiply(math.multiply(math.divide(x, 360), 2), math.pi) : x;
        if (parseInt(math.divide(x, math.pi)) == math.divide(x, math.pi)) return Decimal(0);
        return new Decimal(String(x)).sin();
    }

    math.cos = x => {
        x = isDeg ? math.multiply(math.multiply(math.divide(x, 360), 2), math.pi) : x;
        if (parseInt(math.divide(math.multiply(x, "2"), math.pi)) == math.divide(math.multiply(x, "2"), math.pi)) {
            if (math.divide(math.multiply(x, "2"), math.pi) % 2 !== 0) return Decimal(0);
        };
        return new Decimal(String(x)).cos();
    }

    math.tan = x => {
        x = isDeg ? math.multiply(math.multiply(math.divide(x, 360), 2), math.pi) : x;
        if (math.cos(x) == 0) return "Cannot be divided by Zero!";
        return new Decimal(String(x)).tan();
    }

    math.log = x => {
        return new Decimal(String(x)).ln();
    }

    math.log10 = x => {
        return new Decimal(String(x)).log();
    }

    math.factorial = x => {
        if (x < 0 || !Number.isInteger(x)) return "Error!";
        else if (x === 0 || x === 1) return 1;
        else return math.multiply(x, math.factorial(x - 1));
    }

    
    const focusInputAtEnd = () => {
        if (inputRef.current) {
            const length = inputRef.current.value.length;
    
            inputRef.current.setSelectionRange(length, length);
            inputRef.current.focus();
        }
    };
    
    const enableKeyboard = () => {
        setIsReadonly(false);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    }
    
    useEffect(() => {
        focusInputAtEnd();
    });
    
    const handleExpand = () => {
        setIsExpanding(!isExpanding);
    }
    
    const handleKeysClick = (label, type) => {
        setIsReadonly(true);
        let lastChar = expression.at(-1);
        if (type === "operation") {
            if (isNaN(Number(lastChar)) && lastChar !== "e" && lastChar !== "π") {
                if (lastChar === "√" || expression.length === 0) setExpression([...expression]);
                else if (lastChar === "%" || (label === "-" && lastChar === "(") || lastChar === ")") setExpression([...expression, label]);
                else setExpression([...expression.slice(0, -1), label]);
            }
            else setExpression([...expression, label]);
            setIsDecimalPointDisabled(false);
            
        } else if (type === "percent" || type === "factorial") {
            if (isNaN(Number(lastChar))) setExpression([...expression]);
            else setExpression([...expression, label]);
    
        } else if (type === "decimal-point") {
            if (isNaN(Number(lastChar))) setExpression([...expression]);
            else {
                setExpression([...expression, label]);
                setIsDecimalPointDisabled(true);
            }
        } else if (type === "function") {
            setExpression([...expression, label + "("]);
        } else if (type === "property" && label === "(") {
            if (lastChar === '.') setExpression([...expression]);
            else setExpression([...expression, label]);
        } else if (type === "property" && label === ")") {
            if (expression.length === 0 || lastChar === '.' || lastChar === "+" || lastChar === '-' || lastChar === "×" || lastChar === "÷" || lastChar === "^") setExpression([...expression]);
            else setExpression([...expression, label]);
        } else {
            if (lastChar === "Error!" || lastChar === "Infinity" || lastChar === "Cannot be divided by Zero!") setExpression([label]);
            else setExpression([...expression, label]);
        }
    }

    const handleKeyPress =  e => {
        const key = e.key;

        if (/^[1-9]+$/.test(key)) handleKeysClick(key, "number");
        else if (/^[0]+$/.test(key)) handleKeysClick(key, "zero");
        else if (/^[.]+$/.test(key)) handleKeysClick(key, "decimal-point");
        else if (/^[+\-*/×÷:^]+$/.test(key)) handleKeysClick(key, "operation");
        else if (/^[%]+$/.test(key)) handleKeysClick(key, "percent");
        else if (/^[√]+$/.test(key)) handleKeysClick(key, "function");
        else if (/^[!]+$/.test(key)) handleKeysClick(key, "factorial");
        else if (/^[πe]+$/.test(key)) handleKeysClick(key, "constant");
        else if (/^[()]+$/.test(key)) handleKeysClick(key, "property");
        else if (key === "Tab") handleExpand();
        else if (key === "Enter") calculate();
        else if (key === "Backspace") setExpression([...expression.slice(0, -1)]);
    }
    
    const handleParentheses = exp => {
        let openCount = 0;
        let closeCount = 0;
    
        for (let char of exp) {
            if (char === '(') openCount++;
            else if (char === ')') closeCount++;
        }
    
        const missingClose = openCount - closeCount;
    
        if (missingClose > 0) exp += ')'.repeat(missingClose);
        else if (missingClose < 0) exp = '('.repeat(Math.abs(missingClose)) + exp;

        exp = exp.replace("()", "");
    
        return exp;
    }
    
    const preprocessExp = exp => {
        return exp
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/:/g, '/')
            .replace(/√/g, 'sqrt')
            .replace(/log/g, 'log10')
            .replace(/ln/g, 'log')
            .replace(/π/g, ' pi ')
            .replace(/e/g, ' e ')
    }
    
    const calculate = () => {
        const exp1 = handleParentheses(expression.join(""));
        const exp2 = preprocessExp(exp1);
    
        try {
            const result = math.evaluate(exp2);

            setExpression([result]);
            setCurrentCalculationVal(exp2);
            setIsDecimalPointDisabled(false);
        } catch (error) {
            setExpression(["Error!"]);
        }
    }

    return {
        inputRef,
        primaryKeys,
        secondaryKeys,
        handleKeysClick,
        handleKeyPress,
        isExpanding,
        handleExpand,
        isDeg,
        setIsDeg,
        expression,
        setExpression,
        currentCalculationVal,
        isDecimalPointDisabled,
        isReadonly,
        enableKeyboard,
        calculate,    
    };
};

export default useCalculator;