const Calculator = () => {
    return (
        <main className="font-body min-w-80 w-1/3 max-w-lg rounded-xl shadow-2xl border-2 border-slate-200">
            <section className="text- bg-slate-200 rounded-t-[10px] p-6 mb-4">
                <h1 className="text-xl font-title font-semibold">WEB CALCULATOR</h1>
            </section>
            <div class="bg-white p-6 pt-0">
                <div className="text-slate-500 text-right">1+1</div>
                <input type="text" 
                        class="w-full text-right text-3xl py-4 focus:outline-none focus:ring-0 focus:border-0"
                />
            </div>
            <section className="border-t-2 border-slate-200 rounded-b-xl buttons grid grid-cols-5">
                <button className="col-span-2">Expand</button> {/*  Collapse */}
                <button className="col-start-4">CE</button>
                <button>X</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>&divide;</button>
                <button>mod</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>&times;</button>
                <button>x&sup2;</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>-</button>
                <button>&radic;x</button>
                <button>0</button>
                <button>+/-</button>
                <button>.</button>
                <button>+</button>
                <button>=</button>
            </section>
        </main>
    )
}

export default Calculator