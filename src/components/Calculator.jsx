import React, { useState } from 'react'
import { LuDelete } from 'react-icons/lu'

const Calculator = () => {
    // Set Expanding Status
    const [isExpanding, setIsExpanding] = useState(false);

    const handleExpand = () => {
        setIsExpanding(!isExpanding);
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
                        value="2025"
                />
            </div>
            <section className="border-t-2 border-slate-200 rounded-b-xl grid grid-cols-5 buttons">
                <button className="col-span-2" onClick={handleExpand}>{ isExpanding ? "Collapse" : "Expand" }</button>
                <button className="col-start-4">CE</button>
                <button className="flex justify-center items-center"><LuDelete size="20" /></button>
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
                        <button className="text-sm bg-white p-2 border-2 border-white rounded-l-lg">DEG</button>
                        <button className="text-sm p-2 border-2 border-l-0 border-white rounded-r-lg">RAD</button>
                    </section>
                </section>
                <button className="number">7</button>
                <button className="number">8</button>
                <button className="number">9</button>
                <button className="operation">&divide;</button>
                <button className="operation">mod</button>
                <button className="number">4</button>
                <button className="number">5</button>
                <button className="number">6</button>
                <button className="operation">&times;</button>
                <button className="operation">x&sup2;</button>
                <button className="number">1</button>
                <button className="number">2</button>
                <button className="number">3</button>
                <button className="operation">-</button>
                <button className="operation">&radic;x</button>
                <button className="number zero">0</button>
                <button className="property">+/-</button>
                <button className="property">.</button>
                <button className="operation">+</button>
                <button className="operation equal-btn text-white text-xl font-extrabold bg-teal-700 rounded-br-[10px] hover:bg-teal-400">=</button>
            </section>
        </main>
    )
}

export default Calculator