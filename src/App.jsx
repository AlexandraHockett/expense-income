import { useState } from "react";
import "./App.css";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [statementType, setStatementType] = useState("income");

  const handleChangeInputMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <main>
      <div>
        <h1 className="total-text">0</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Income or expense"
            onChange={handleChangeInputMessage}
            value={inputMessage}
          />
          <input
            type="number"
            placeholder=""
            onChange={handleChangeInputValue}
            value={inputValue}
          />
          <select
            onChange={(e) => {
              setStatementType(e.target.value);
            }}
            value={statementType}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button>+</button>
        </div>
        <div>
          <div className="card">
            <div className="card-info">
              <h4>Salary</h4>
              <p>July 27th, 2024</p>
            </div>
            <p className="amount-text success">+5000€</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
