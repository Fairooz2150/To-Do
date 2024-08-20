import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [date, setDate] = useState('');
  const [weekday, setWeekday] = useState('');

  useEffect(() => {
    const today = new Date(); 
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString('en-US', options));


    const week = { weekday: 'long' };
    setWeekday(today.toLocaleDateString('en-US', week))
  }, []);

  return (
    <div className="app">

      <div className="mainHeading">
        <h1>To Do List</h1>
      </div>

      <div className="subHeading">
        <br/>
        <h2>Whoop, it's {weekday} 🌝 ☕</h2>
      </div>

      <div className="input">
        <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={() => setToDos([...toDos, { id: Date.now(), text: toDo, status: false }])} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input 
                  onChange={(e) => {
                    setToDos(toDos.map(obj2 => {
                      if (obj2.id === obj.id) {
                        obj2.status = e.target.checked;
                      }
                      return obj2;
                    }));
                  }} 
                  type="checkbox" 
                  checked={obj.status} 
                />
                <p>{obj.text}</p>
              </div>

              <div className="right">
                <i className="fas fa-times"></i>
              </div>
            </div>
          );
        })}

        {toDos.map((obj) => {
          if (obj.status) {
            return (<h1 key={obj.id}>{obj.text}</h1>);
          }
          return null;
        })}
      </div>

    </div>
  );
}

export default App;
