import {Component} from 'react';

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operandA: 0,
            operandB: 0,
            operator: '+',
            result: 0
        };
    }

    updateOperandA = (e) => {
        const newOperandA = e.target.value;
        // Old Version
        /*this.setState({
            operandA,
            operandB: this.state.operandB,
            operator: this.state.operator
        });*/
        // New / Easier Version
        this.setState({
            ...this.state, // spreading operator
            operandA: parseInt(newOperandA)
        });
    };

    updateOperandB = (e) => {
        const newOperandB = e.target.value;
        this.setState({
            ...this.state,
            operandB: parseInt(newOperandB)
        });
    };

    updateOperator = (e) => {
        const newOperator = e.target.value;
        this.setState({
            ...this.state,
            operator: newOperator
        });
    };

    calculate = async () => {
        const {operandA,operandB,operator} = this.state;
        console.log(`${operandA} ${operator} ${operandB}`);

        const requestBody = {
            operandA,
            operandB
        };

        var path = "";
        switch(operator) {
            case '+':
                path = "/add";
                break;
            case '-':
                path = "/sub";
                break;
            case "*":
                path = "/mul";
                break;
        }

        const response = await fetch(`http://localhost:8080${path}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const responseBody = await response.json();
        const {result} = responseBody;

        this.setState({
            ...this.state,
            result
        });
    };

    render = () => {
        return (
            <div className="calculator-cnt">
                <fieldset>
                    <input type="number" value={this.state.operandA} onChange={this.updateOperandA}></input>
                    <select value={this.state.operator} onChange={this.updateOperator}>
                        <option>+</option>
                        <option>-</option>
                        <option>*</option>
                    </select>
                    <input type="number" value={this.state.operandB} onChange={this.updateOperandB} />
                    <button onClick={this.calculate}>calculate!</button>
                </fieldset>
                <h2>{this.state.result}</h2>
            </div>
        )
    };

}