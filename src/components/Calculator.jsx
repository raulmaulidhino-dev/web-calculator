import useCalculator from '../logic/useCalculator'
import { LuDelete } from 'react-icons/lu'

const Calculator = () => {
    const {
        inputRef,
        primaryKeys,
        secondaryKeys,
        handleKeysClick,
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
        handleInputChange,
        calculate,
    } = useCalculator();

    return (
        <main className="font-body min-w-80 w-1/3 max-w-lg rounded-xl shadow-2xl border-2 border-slate-200">
            <section className="text- bg-slate-200 rounded-t-[10px] p-6 mb-4">
                <h1 className="text-xl font-title font-semibold">WEB CALCULATOR</h1>
            </section>
            <div class="bg-white p-6 pt-0">
                <div className="text-slate-500 text-right">{ currentCalculationVal }</div>
                <input type="text" 
                        class="w-full text-right text-2xl py-4 overflow-x-auto focus:outline-none focus:ring-0 focus:border-0"
                        ref={ inputRef }
                        value={ expression.join("") }
                        onChange={ handleInputChange }
                        onClick={ enableKeyboard }
                        readOnly={ isReadonly }
                />
            </div>
            <section className="border-t-2 border-slate-200 rounded-b-xl grid grid-cols-5">
                <button className="col-span-2 text-lg font-medium py-4 px-2 hover:bg-slate-200" onClick={ handleExpand }>{ isExpanding ? "Collapse" : "Expand" }</button>
                <button className="col-start-4 text-lg font-medium py-4 px-2 hover:bg-slate-200" onClick={ () => setExpression([]) }>AC</button>
                <button className="flex justify-center items-center text-lg font-medium py-4 px-2 hover:bg-slate-200" onClick={ () => setExpression([...expression.slice(0, -1)]) }><LuDelete size="20" /></button>
                <section className={`bg-slate-200 col-span-5 ${ isExpanding ? 'grid grid-cols-5' : 'hidden' }`}>
                    {secondaryKeys.map(({label, type}) => {
                        return (
                            <button
                                key={label}
                                className={`${type} text-lg ${ isExpanding ? 'py-2 px-1' : 'py-4 px-2' } hover:bg-white`}
                                onClick={() => handleKeysClick(label, type) }
                                disabled={false}
                            >
                                {label}
                            </button>
                        );
                    })}
                    <section className="col-span-2 flex justify-center items-center py-4 px-2">
                        <button className={`text-sm p-2 border-2 border-white rounded-l-lg ${ isDeg ? 'bg-white' : '' }`} onClick={ () => setIsDeg(true) }>DEG</button>
                        <button className={`text-sm p-2 border-2 border-l-0 border-white rounded-r-lg ${ !isDeg ? 'bg-white' : '' }`} onClick={ () => setIsDeg(false) }>RAD</button>
                    </section>
                </section>
                {primaryKeys.map(({label, type}) => {
                    return (
                        <button
                            key={label}
                            className={`${type} text-lg font-medium ${ isExpanding ? 'py-2 px-1' : 'py-4 px-2' } hover:bg-slate-200`}
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

export default Calculator;