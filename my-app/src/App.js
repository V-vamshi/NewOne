import React from 'react';
import { sayHello, addNumbers } from "./components/util.js";


function App() {
  return (
    <div>
      <h1>{sayHello()}</h1>
      <p>2 + 3 = {addNumbers(2, 3)}</p>
    </div>
  );
}

export default App;