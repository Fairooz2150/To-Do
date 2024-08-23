import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [completedToDos, setCompletedToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [date, setDate] = useState('');
  const [weekday, setWeekday] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString('en-US', options));

    const week = { weekday: 'long' };
    setWeekday(today.toLocaleDateString('en-US', week));
  }, []);

  const handleAddToDo = () => {
    if (toDo) {
      const newToDo = { id: Date.now(), text: toDo, status: false, date: date };
      setToDos([...toDos, newToDo]);
      setToDo('');  // Clear input field after adding
    }
  }

  const handleCheckToDo = (id) => {
    const updatedToDos = toDos.map((obj) => {
      if (obj.id === id) {
        obj.status = !obj.status;
        if (obj.status) {
          setCompletedToDos([...completedToDos, obj]);
        } else {
          setCompletedToDos(completedToDos.filter(item => item.id !== id));
        }
      }
      return obj;
    });
    setToDos(updatedToDos);
  };

  const handleRemoveToDo = (id) => {
    setToDos(toDos.filter(obj => obj.id !== id));
    setCompletedToDos(completedToDos.filter(obj => obj.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>To Do List</h1>
      </div>

      <div className="subHeading">
        <br />
        <h2>Whoop, it's {weekday} 🌝 ☕</h2>
      </div>

      <div className="input ">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="✎ Add item..."
        />
        <i onClick={handleAddToDo} className="fas fa-plus"></i>
      </div>

      <div className="container  todo-columns">

        <div className="todos  col-md-5">
          <h3>Pending Tasks</h3>
          {toDos.filter(todo => !todo.status).map((obj) => (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={obj.status}
                  onChange={() => handleCheckToDo(obj.id)}
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <p className="date">{obj.date}</p>
                <i className="fas fa-times" onClick={() => handleRemoveToDo(obj.id)}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="todos col-md-5 completed">
          <h3>Completed Tasks</h3>
          {completedToDos.map((obj) => (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={obj.status}
                  onChange={() => handleCheckToDo(obj.id)}
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <p className="date">{obj.date}</p>
                <i className="fas fa-times" onClick={() => handleRemoveToDo(obj.id)}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
