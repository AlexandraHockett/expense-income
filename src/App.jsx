import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState({
    message: "",
    value: "",
    statementType: "",
  });

  const [showError, setShowError] = useState({
    message: false,
    value: false,
  });

  const handleUpdateInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewMessage = () => {
    const { message, value } = input;

    if (!message) {
      return setShowError({
        message: true,
        value: false,
      });
    } else if (!value) {
      return setShowError({
        message: false,
        value: true,
      });
    } else {
      setShowError({
        message: false,
        value: false,
      });
    }
    //add logic to add statement
  };

  return (
    <main>
      <div>
        <h1 className="total-text">0</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Income or expense"
            onChange={handleUpdateInput}
            value={input.message}
            name="message"
            style={
              showError.message ? { borderColor: "rgb(206, 76, 76)" } : null
            }
          />
          <input
            type="number"
            placeholder="5000€"
            onChange={handleUpdateInput}
            value={input.value}
            name="value"
            style={showError.value ? { borderColor: "rgb(206, 76, 76)" } : null}
          />
          <select
            onChange={handleUpdateInput}
            value={input.statementType}
            name="statementType"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button onClick={handleAddNewMessage}>+</button>
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
