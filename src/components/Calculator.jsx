import React, { useState } from 'react'
import { LuDelete } from 'react-icons/lu'

const Calculator = () => {
    // Calculator Keys
    const keys = [
        { label: "7", type: "number" },
        { label: "8", type: "number" },
        { label: "9", type: "number" },
        { label: "÷", type: "operation" },
        { label: "%", type: "operation" },
        { label: "4", type: "number" },
        { label: "5", type: "number" },
        { label: "6", type: "number" },
        { label: "×", type: "operation" },
        { label: "x²", type: "quadratic" },
        { label: "1", type: "number" },
        { label: "2", type: "number" },
        { label: "3", type: "number" },
        { label: "-", type: "operation" },
        { label: "√x", type: "square-root" },
        { label: "0", type: "zero"},
        { label: "+/-", type: "property" },
        { label: ".", type: "property" },
        { label: "+", type: "operation" }
    ];
    

    // Set Expanding Status
    const [isExpanding, setIsExpanding] = useState(false);
    const [isDeg, setIsDeg] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const handleExpand = () => {
        setIsExpanding(!isExpanding);
    }

    const handlePrimaryKeysClick = (label, type) => {
        label = label.replaceAll("x", "");
        setInputValue(inputValue + label);

        if (type === "number") {
            document.querySelectorAll(".number").forEach((button) => {
                button.disabled = false;
            }, []);
            document.querySelector(".zero").disabled = false;

            document.querySelectorAll(".operation").forEach((button) => {
                button.disabled = false;
            }, []);

            document.querySelector(".quadratic").disabled = false;
            document.querySelector(".square-root").disabled = false;

        } else if (type === "zero") {
            document.querySelectorAll(".number").forEach((button) => {
                button.disabled = true;
            }, []);
            document.querySelector(".zero").disabled = false;

            document.querySelectorAll(".operation").forEach((button) => {
                button.disabled = false;
            }, []);

            document.querySelector(".quadratic").disabled = false;
            document.querySelector(".square-root").disabled = false;

        } else if (type === "operation") {
            document.querySelectorAll(".number").forEach((button) => {
                button.disabled = false;
            }, []);
            document.querySelector(".zero").disabled = false;

            document.querySelectorAll(".operation").forEach((button) => {
                button.disabled = true;
            }, []);

            document.querySelector(".quadratic").disabled = true;
            document.querySelector(".square-root").disabled = false;

        } else if (type === "quadratic") {
            document.querySelectorAll(".number").forEach((button) => {
                button.disabled = true;
            }, []);
            document.querySelector(".zero").disabled = true;

            document.querySelectorAll(".operation").forEach((button) => {
                button.disabled = false;
            }, []);

            document.querySelector(".quadratic").disabled = false;
            document.querySelector(".square-root").disabled = false;

        } else if (type === "square-root") {
            document.querySelectorAll(".number").forEach((button) => {
                button.disabled = false;
            }, []);
            document.querySelector(".zero").disabled = false;
            document.querySelectorAll(".operation").forEach((button) => {
                button.disabled = true;
            }, []);

            document.querySelector(".quadratic").disabled = true;
            document.querySelector(".square-root").disabled = true;

        }
    }

    return (
        <main className="font-body min-w-80 w-1/3 max-w-lg rounded-xl shadow-2xl border-2 border-slate-200">
            <section className="text- bg-slate-200 rounded-t-[10px] p-6 mb-4">
                <h1 className="text-xl font-title font-semibold">WEB CALCULATOR</h1>
            </section>
            <div class="bg-white p-6 pt-0">
                <div className="text-slate-500 text-right">45&times;45</div>
                <input type="text" 
                        class="w-full text-right text-3xl py-4 focus:outline-none focus:ring-0 focus:border-0"
                        value={ inputValue }
                />
            </div>
            <section className="border-t-2 border-slate-200 rounded-b-xl grid grid-cols-5 buttons">
                <button className="col-span-2" onClick={handleExpand}>{ isExpanding ? "Collapse" : "Expand" }</button>
                <button className="col-start-4" onClick={ () => setInputValue("") }>CE</button>
                <button className="flex justify-center items-center" onClick={ () => setInputValue(inputValue.slice(0, -1)) }><LuDelete size="20" /></button>
                <section className={`bg-slate-200 col-span-5 expand-buttons ${ isExpanding ? 'grid grid-cols-5' : 'hidden' }`}>
                    <button>sin</button>
                    <button>cos</button>
                    <button>tan</button>
                    <button>ln</button>
                    <button>log</button>
                    <button>y<sup>x</sup></button>
                    <button>&pi;</button>
                    <button>e</button>
                    <button>&#40;</button>
                    <button>&#41;</button>
                    <section className="col-span-2 flex justify-center items-center">
                        <button className={`text-sm p-2 border-2 border-white rounded-l-lg ${ isDeg ? 'bg-white' : '' }`} onClick={ () => setIsDeg(true) }>DEG</button>
                        <button className={`text-sm p-2 border-2 border-l-0 border-white rounded-r-lg ${ !isDeg ? 'bg-white' : '' }`} onClick={ () => setIsDeg(false) }>RAD</button>
                    </section>
                </section>
                {keys.map(({ label, type, extraClass }) => {
                    return(
                        <button
                            key={label}
                            className={`${type}${extraClass ? ` ${extraClass}` : ""}`}
                            onClick={() => handlePrimaryKeysClick(label, type) }
                            disabled={inputValue === "" && (type === "operation" || type === "quadratic") ? true : false}
                        >
                            {label}
                        </button>
                    )
                })}
                <button className="operation equal-btn text-white text-xl font-extrabold bg-teal-700 rounded-br-[10px] hover:bg-teal-400">=</button>
            </section>
        </main>
    )
}

export default Calculator