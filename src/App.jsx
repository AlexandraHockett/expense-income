import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState({
    message: "",
    value: "",
    statementType: "income",
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
    const { message, value, statementType } = input;

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
      //add logic to add statement
      setMessages([
        ...messages,
        {
          name: message,
          value: parseFloat(value).toFixed(2),
          type: statementType,
          date: new Date().toDateString(),
        },
      ]);
      setInput({
        message: "",
        value: "",
        statementType: "income",
      });
    }
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
          {messages.map(({ name, value, type, date }) => (
            <div className="card">
              <div className="card-info">
                <h4>{name}</h4>
                <p>{date}</p>
              </div>
              <p
                className={`amount-text ${
                  type === "income" ? "success" : "danger"
                }`}
              >
                {type === "income" ? "+" : "-"}
                {value}€
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
