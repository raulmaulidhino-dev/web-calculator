import React, { useEffect, useState, useRef } from 'react'
import { evaluate } from 'mathjs'
import { LuDelete } from 'react-icons/lu'

const Calculator = () => {
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
        { label: "√", type: "square-root" },
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

    const inputRef = useRef(null);

    // Set Expanding Status
    const [isExpanding, setIsExpanding] = useState(false);
    const [isDeg, setIsDeg] = useState(true);
    const [inputValue, setInputValue] = useState("");
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

    const handleInputChange = e => {
        setInputValue(e.target.value);
        setIsDecimalPointDisabled(false);
    }

    const handleKeysClick = (label, type) => {
        setIsReadonly(true);
        let lastChar = inputValue[inputValue.length - 1];
        if (type === "operation") {
            if (isNaN(Number(lastChar))) {
                if (lastChar === "√") setInputValue(inputValue);
                else if (lastChar === "%") setInputValue(inputValue + label);
                else setInputValue(inputValue.slice(0, -1) + label);
            }
            else setInputValue(inputValue + label);
            setIsDecimalPointDisabled(false);
            
        } else if (type === "percent" || type === "factorial") {
            if (isNaN(Number(lastChar))) setInputValue(inputValue);
            else setInputValue(inputValue + label);

        } else if (type === "decimal-point") {
            if (isNaN(Number(lastChar))) setInputValue(inputValue);
            else {
                setInputValue(inputValue + label);
                setIsDecimalPointDisabled(true);
            }
        } else if (type === "function") {
            if (isNaN(Number(lastChar))) setInputValue(inputValue + label + "(");
        } else {
            setInputValue(inputValue + label);
        }
    }

    const preprocessExp = exp => {
        return exp
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/√/g, 'sqrt(')
            .replace(/π/g, 'pi')
    }

    const calculate = () => {
        const exp = preprocessExp(inputValue);
        try {
            const result = evaluate(exp);
            setInputValue(String(result));
            setCurrentCalculationVal(exp);
            setIsDecimalPointDisabled(false);
        } catch (error) {
            setInputValue(error.message);
        }
    }

    return (
        <main className="font-body min-w-80 w-1/3 max-w-lg rounded-xl shadow-2xl border-2 border-slate-200">
            <section className="text- bg-slate-200 rounded-t-[10px] p-6 mb-4">
                <h1 className="text-xl font-title font-semibold">WEB CALCULATOR</h1>
            </section>
            <div class="bg-white p-6 pt-0">
                <div className="text-slate-500 text-right">{ currentCalculationVal }</div>
                <input type="text" 
                        class="w-full text-right text-3xl py-4 overflow-x-auto focus:outline-none focus:ring-0 focus:border-0"
                        ref={ inputRef }
                        value={ inputValue }
                        onChange={ handleInputChange }
                        onClick={ enableKeyboard }
                        readOnly={ isReadonly }
                />
            </div>
            <section className="border-t-2 border-slate-200 rounded-b-xl grid grid-cols-5 buttons">
                <button className="col-span-2" onClick={handleExpand}>{ isExpanding ? "Collapse" : "Expand" }</button>
                <button className="col-start-4" onClick={ () => setInputValue("") }>CE</button>
                <button className="flex justify-center items-center" onClick={ () => setInputValue(inputValue.slice(0, -1)) }><LuDelete size="20" /></button>
                <section className={`bg-slate-200 col-span-5 expand-buttons ${ isExpanding ? 'grid grid-cols-5' : 'hidden' }`}>
                    {secondaryKeys.map(({label, type}) => {
                        return (
                            <button
                                key={label}
                                className={`${type}`}
                                onClick={() => handleKeysClick(label, type) }
                                disabled={false}
                            >
                                {label}
                            </button>
                        );
                    })}
                    <section className="col-span-2 flex justify-center items-center">
                        <button className={`text-sm p-2 border-2 border-white rounded-l-lg ${ isDeg ? 'bg-white' : '' }`} onClick={ () => setIsDeg(true) }>DEG</button>
                        <button className={`text-sm p-2 border-2 border-l-0 border-white rounded-r-lg ${ !isDeg ? 'bg-white' : '' }`} onClick={ () => setIsDeg(false) }>RAD</button>
                    </section>
                </section>
                {primaryKeys.map(({label, type}) => {
                    return (
                        <button
                            key={label}
                            className={`${type}`}
                            onClick={() => handleKeysClick(label, type) }
                            disabled={type === "decimal-point" ? isDecimalPointDisabled : false}
                        >
                            {label}
                        </button>
                    );
                })}
                <button className="operation equal-btn text-white text-xl font-extrabold bg-teal-700 rounded-br-[10px] hover:bg-teal-400" onClick={ calculate }>=</button>
            </section>
        </main>
    )
}

export default Calculator