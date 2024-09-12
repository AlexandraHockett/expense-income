import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = messages.reduce((sum, { type, value }) => {
      if (type === "expense") {
        return sum - parseFloat(value);
      } else return sum + parseFloat(value);
    }, 0);
    setTotal(newTotal);
  }, [messages]);

  const renderTotal = () => {
    if (total > 0) {
      return <h1 className="total-text success">+{Math.abs(total)}</h1>;
    } else if (total < 0) {
      return <h1 className="total-text danger">-{Math.abs(total)}</h1>;
    } else {
      return <h1 className="total-text">{Math.abs(total)}</h1>;
    }
  };

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
          id: uuidv4(),
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
        {renderTotal()}
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
          {messages.map(({ name, value, type, date, id }) => (
            <div className="card" key={id}>
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
