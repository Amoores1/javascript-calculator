function App() {
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [display, setDisplay] = React.useState("0");


    const calcDisplay = (symbol) => {
        setExpression((prev) => prev + symbol);
        setDisplay((prev) => prev + symbol);
        // if equals sign is followed by a number calc resets, if followed by an operation, it calculates answer.
        if (expression[expression.length-1] == "=") {
            if (/[0-9.]/.test(symbol)){
                setExpression(symbol);
                setDisplay(symbol);
                setAnswer("");
            }
            else {
                setExpression(answer + symbol);
            }
        };
        // if input is 0 and there is a decimal then you can add zeroes
        if (symbol === "0" && expression.includes(".")){
            setExpression(expression + symbol)
        // if input is 0 and display or expression is 0 without decimal at first index you cannot add zero
        }else if (symbol === "0" && expression[0] === "0"){
            setExpression(expression)
            setDisplay(display)
        // if input is an integer and expression is '0.' then you can add a number
        }else if ((symbol === "1"| symbol === "2"|symbol === "3"|symbol === "4"|symbol === "5"|symbol === "6"|symbol === "7"|symbol === "8"|symbol === "9")
            && expression[0]==="0" && expression[1].includes(".")){
            setExpression(expression + symbol);
            setDisplay(display + symbol);
        // if input is a number and display and expression reads 0 then replace 0 with integer
        }else if ((symbol === "1"| symbol === "2"|symbol === "3"|symbol === "4"|symbol === "5"|symbol === "6"|symbol === "7"|symbol === "8"|symbol === "9")
        && expression[0]==="0" && display[0] ==="0" && !expression.includes(".")){
            setExpression(expression.split("").slice(-1).join("") + symbol);
            setDisplay(display.split("").slice(-1).join("") + symbol);
        // if input is a number and display at first position is number, replace 0 with integer.
        }else if ((symbol === "1"| symbol === "2"|symbol === "3"|symbol === "4"|symbol === "5"|symbol === "6"|symbol === "7"|symbol === "8"|symbol === "9")
        && display[0] ==="0"){
            setDisplay(symbol)
        };
        // if input is zero and display shows 0 add first index you cannot add another zero
        if (symbol ==="0" && display[0] === "0" && !display.includes(".")){
            setDisplay(display)
        };
        // if input is 0 and display[0] shows operation followed by zero[1] you cannot add another zero
        if (symbol ==="0" && (display[0] === "+"|display[0] === "-"|display[0] === "/"|display[0] === "*")
        && !display.includes(".") && display[1]==="0"){
            setDisplay(display)
            setExpression(expression)
        };


        // decimal disable if decimal entered
        if (symbol === ".") {
            document.getElementById("decimal").disabled = true;
        };
        // makes instant decimal click read 0._ in both display and expression
        if (symbol === "." && expression === "" && display === "0") {
            setDisplay("0" + symbol);
            setExpression("0" + symbol);
        };
        // makes decimal click after an operation read 0._ and clears answer
        if (symbol === "."
                && (expression[expression.length-1] === "+"|expression[expression.length-1] === "-"|expression[expression.length-1] === "/"|expression[expression.length-1] === "*")
                && (display[0] === "+"|display[0] === "-"|display[0] === "/"|display[0] === "*")) {
            setExpression(expression + "0" + symbol);
            setDisplay(display + "0" + symbol);
            setAnswer("");
        };
        // makes entry of 0 after operation impossible unless combined with decimal
        if (symbol === "0"
                && (expression[expression.length-1] === "+"|expression[expression.length-1] === "-"|expression[expression.length-1] === "/"|expression[expression.length-1] === "*")
                && (display[0] === "+"|display[0] === "-"|display[0] === "/"|display[0] === "*")){
            setExpression(expression)
            setDisplay(display)
            setAnswer("")
        };
        // makes instant zero entry impossible. not ideal but people will realise you have to just press decimal?
        if (symbol === "0"
                && expression ==""
                && display==="0") {
            setExpression(expression)
            setDisplay(display)
            setAnswer("")
        };
        // shows operation by itself in display, clears answer and resets disabled decimal
        if (symbol === "/" |symbol === "-" |symbol === "+" |symbol === "*") {
            document.getElementById("decimal").disabled = false;
            setDisplay(symbol);
            setAnswer("");
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
         // operation cannot follow minus
        if ((symbol === "/"|symbol === "+"|symbol === "*") && expression[expression.length-1]=="-") {
            setExpression(expression);
        };
        // replacing operations on click
        if ((symbol === "*"|symbol === "+") && (expression[expression.length-1]==="/")) {
            setExpression(prev => prev.split("").slice(0, prev.length-1).join("") + symbol);
        }else if ((symbol === "*"|symbol === "/") && (expression[expression.length-1]==="+")) {
            setExpression(prev => prev.split("").slice(0, prev.length-1).join("") + symbol);
        }else if ((symbol === "/"|symbol === "+") && (expression[expression.length-1]==="*")) {
            setExpression(prev => prev.split("").slice(0, prev.length-1).join("") + symbol);
        };
        if ((symbol === "/"|symbol === "+"|symbol === "*") && expression[expression.length-1]=="-" &&
            (expression[expression.length-2]=="/"| expression[expression.length-2]=="*"| expression[expression.length-2]=="+")) {
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
        <button onClick={allClear}data-key="c"id="clear"className="span-two">AC</button>
        <button onClick={deleteOne}data-delete id="delete">DEL</button>
        <button onClick={()=> calcDisplay("/")}data-key="/"id="divide">/</button>
        <button onClick={()=> calcDisplay("1")}data-key="1"id="one">1</button>
        <button onClick={()=> calcDisplay("2")}data-key="2"id="two">2</button>
        <button onClick={()=> calcDisplay("3")}data-key="3"id="three">3</button>
        <button onClick={()=> calcDisplay("*")}data-key="*"id="multiply">*</button>
        <button onClick={()=> calcDisplay("4")}data-key="4"id="four">4</button>
        <button onClick={()=> calcDisplay("5")}data-key="5"id="five">5</button>
        <button onClick={()=> calcDisplay("6")}data-key="6"id="six">6</button>
        <button onClick={()=> calcDisplay("+")}data-key="+"id="add">+</button>
        <button onClick={()=> calcDisplay("7")}data-key="7"id="seven">7</button>
        <button onClick={()=> calcDisplay("8")}data-key="8"id="eight">8</button>
        <button onClick={()=> calcDisplay("9")}data-key="9"id="nine">9</button>
        <button onClick={()=> calcDisplay("-")}data-key="-"id="subtract">-</button>
        <button onClick={()=> calcDisplay(".")}data-key="."id="decimal">.</button>
        <button onClick={()=> calcDisplay("0")}data-key="0"id="zero">0</button>
        <button onClick={calculate}data-key="="id="equals"className="span-two">=</button>
    </div>
    );
}


ReactDOM.render(<App/>, document.getElementById("root"));
