function App() {
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [display, setDisplay] = React.useState("0");

    const calcDisplay = (symbol) => {
        setExpression((prev) => prev + symbol);
        setDisplay((prev) => prev + symbol);
        // displaying equals    
        if (expression[expression.length-1] == "=") {
            if (/[0-9.]/.test(symbol)){
                setExpression(symbol);
            }
            else {
                setExpression(answer + symbol);
            }
        };
        // if first digit is zero overwrite with integer or decimal.
        if (symbol === "0" && expression.includes(".")){
            setExpression(expression + symbol)
        }else if (symbol === "0" && expression[0] === "0"){
            setExpression(expression)
            setDisplay(display)
        }else if ((symbol === "1"| symbol === "2"|symbol === "3"|symbol === "4"|symbol === "5"|symbol === "6"|symbol === "7"|symbol === "8"|symbol === "9")
            && expression[0]==="0" && expression[1].includes(".")){
            setExpression(expression + symbol);
            setDisplay(display + symbol);
        }else if ((symbol === "1"| symbol === "2"|symbol === "3"|symbol === "4"|symbol === "5"|symbol === "6"|symbol === "7"|symbol === "8"|symbol === "9")
        && expression[0]==="0" && display[0] ==="0" && !expression.includes(".")){
            setExpression(expression.split("").slice(1).join("") + symbol);
            setDisplay(display.split("").slice(1).join("") + symbol);
        }else if ((symbol === "1"| symbol === "2"|symbol === "3"|symbol === "4"|symbol === "5"|symbol === "6"|symbol === "7"|symbol === "8"|symbol === "9")
        && display[0] ==="0"){
            setDisplay(symbol);
        };

        if (symbol ==="0" && display[0] === "0" & !display.includes(".")){
            setDisplay(display)
        };


        // decimal ifs.
        if (symbol === ".") {
            document.getElementById("decimal").disabled = true;
        };
        if (symbol === "/" |symbol === "-" |symbol === "+" |symbol === "*") {
            document.getElementById("decimal").disabled = false;
            setDisplay(symbol);
        };

        // only one operation in a row
        if ((symbol === "/"|symbol === "*"|symbol === "+") && 
            (expression[expression.length-1]=="/"|
            expression[expression.length-1]=="*"|
            expression[expression.length-1]=="+")) {
            setExpression(expression)
        };
        // Only one minus in a row
        if (symbol === "-" && (expression[expression.length-1]=="-")) {
            setExpression(expression)
        };
         // minus cannot follow operation
        if ((symbol === "/"|symbol === "+"|symbol === "*") && expression[expression.length-1]=="-") {
            setExpression(expression);
        };
        // replacing operations on click
        if ((symbol === "*"|symbol === "+") && (expression[expression.length-1]==="/")) {
            setExpression(prev => prev.split("").slice(0, prev.length-1).join("") + symbol);
        };
        if ((symbol === "*"|symbol === "/") && (expression[expression.length-1]==="+")) {
            setExpression(prev => prev.split("").slice(0, prev.length-1).join("") + symbol);
        };
        if ((symbol === "/"|symbol === "+") && (expression[expression.length-1]==="*")) {
            setExpression(prev => prev.split("").slice(0, prev.length-1).join("") + symbol);
        };
        if ((symbol === "/"|symbol === "+"|symbol === "*") && expression[expression.length-1]=="-" &&
            (expression[expression.length-2]=="/"|
            expression[expression.length-2]=="*"|
            expression[expression.length-2]=="+")) {
            setExpression(prev => prev.split("").slice(0, prev.length-2).join("") + symbol);
        };
        
};


    const calculate = () => {
        setAnswer(eval(expression));
        setExpression(prev => prev + "=")
        setDisplay("")
        document.getElementById("decimal").disabled=false;
    }
    
    const allClear = () => {
        setExpression("")
        setAnswer("")
        setDisplay("0")
        document.getElementById("decimal").disabled=false
    }

    const deleteOne = () => {
        setExpression(prev => prev.split("").slice(0, prev.length-1).join(""));
        setDisplay(prev => prev.split("").slice(0, prev.length-1).join(""));
        if (display.slice(-1)==="."){
            document.getElementById("decimal").disabled = false;
        };
    }

    return (
        <div id="calculator">
        <div id="display-grid">
            <div id="prevDisplay">{expression}</div>
            <div id="display">{answer}{display}</div>    
        </div>
        <button onClick={allClear}id="clear"className="span-two">AC</button>
        <button onClick={deleteOne}id="delete">DEL</button>
        <button onClick={()=> calcDisplay("/")}id="divide">/</button>
        <button onClick={()=> calcDisplay("1")}id="one">1</button>
        <button onClick={()=> calcDisplay("2")}id="two">2</button>
        <button onClick={()=> calcDisplay("3")}id="three">3</button>
        <button onClick={()=> calcDisplay("*")}id="multiply">*</button>
        <button onClick={()=> calcDisplay("4")}id="four">4</button>
        <button onClick={()=> calcDisplay("5")}id="five">5</button>
        <button onClick={()=> calcDisplay("6")}id="six">6</button>
        <button onClick={()=> calcDisplay("+")}id="add">+</button>
        <button onClick={()=> calcDisplay("7")}id="seven">7</button>
        <button onClick={()=> calcDisplay("8")}id="eight">8</button>
        <button onClick={()=> calcDisplay("9")}id="nine">9</button>
        <button onClick={()=> calcDisplay("-")}id="subtract">-</button>
        <button onClick={()=> calcDisplay(".")}id="decimal">.</button>
        <button onClick={()=> calcDisplay("0")}id="zero">0</button>
        <button onClick={calculate}id="equals"className="span-two">=</button>
    </div>
    );
}


ReactDOM.render(<App/>, document.getElementById("root"));