import { useEffect, useState, useRef } from 'react'
import { evaluate } from 'mathjs'

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
    const [isDeg, setIsDeg] = useState(true);
    
    // Set Expression, Decimal Point, Read-Only and Current Calculation Value Status
    const [expression, setExpression] = useState([]);
    const [isDecimalPointDisabled, setIsDecimalPointDisabled] = useState(false);
    const [isReadonly, setIsReadonly] = useState(true);
    const [currentCalculationVal, setCurrentCalculationVal] = useState("    ");
    
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
                else if (lastChar === "%" || label === "-" && lastChar !== "-") setExpression([...expression, label]);
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
        } else {
            if (lastChar === "Error!") setExpression([label]);
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
        let exp1 = handleParentheses(expression.join(""));
        let exp2 = preprocessExp(exp1);
    
        try {
            const result = evaluate(exp2);
            setExpression([result]);
            setCurrentCalculationVal(exp1);
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