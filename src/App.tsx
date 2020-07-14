import React from 'react';
import './App.css';
import {useListState} from "./hooks/ListState";
import {useCounter} from "./hooks/Counter";

function App() {
  const counterList = useListState(useCounter);

  return (
      <div className="App">
        <div className="App-header">
          {counterList.values.map((counter, index) => (
              <div key={counterList.getKey(index)}>
                <button onClick={counter.increment}>
                  {counter.value}
                </button>

                <button onClick={() => counterList.remove(index)}>
                  ×
                </button>
              </div>
          ))}

          <button onClick={counterList.add}>
            +
          </button>

          {counterList.render()}
        </div>
      </div>
  );
}

export default App;
