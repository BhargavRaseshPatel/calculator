import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [value, setValue] = useState("")
  const buttonValues = [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 'C', 0, '=', '/'];
  const [totalResult, setTotalResult] = useState("")

  const handleButton = (v) => {
    // debugger
    if (v == 'C') {
      setValue("")
    } else if (v == '=') {
      output()
    }
    else if (typeof v == 'number') {
      setValue((val) => val + v)
    }
    else if (value.length > 0) {
      if (isLastWordOperator()) {
        setValue((val) => val.substring(0, val.length - 1) + v)
      } else {
        setValue((val) => val + v)
      }
    }
  }

  const isLastWordOperator = () => {
    const lastValue = value.split('')[value.length - 1]

    if (lastValue == '+' || lastValue == '-' || lastValue == '/' || lastValue == '*') {
      return true
    } else {
      return false
    }
  }

  const output = () => {
    let number = null
    let arrayValue = []

    if (isLastWordOperator()) {
      return console.log("Please enter the last number for operation")
    }
    else if (value === "") {
      return setTotalResult("Error")
    }

    for (let i = 0; i < value.length; ++i) {
      if (isNaN(value[i])) {
        arrayValue.push(number);
        arrayValue.push(value[i]);
        number = null;
      } else {
        number = (number || "") + value[i];
      }
    }
    if (number !== null) {
      arrayValue.push(number);
    }

    while (arrayValue.includes('/')) {
      doingOperation('/', 'div', arrayValue)
    }

    while (arrayValue.includes('*')) {
      doingOperation('*', 'mul', arrayValue)
    }

    while (arrayValue.includes('+')) {
      doingOperation('+', 'add', arrayValue)
    }

    while (arrayValue.includes('-')) {
      doingOperation('-', 'sub', arrayValue)
    }

    setTotalResult(arrayValue)

  }

  function doingOperation(operand, val, arrayValue) {
    let operatorIndex = arrayValue.indexOf(operand)
    let resultValue = (operation(arrayValue[operatorIndex - 1], val, arrayValue[operatorIndex + 1]))

    return arrayValue.splice(operatorIndex - 1, 3, resultValue)
  }

  const operation = (firstNum, operator, secondNum) => {
    let result = 0;
    switch (operator) {
      case 'add': result = Number(firstNum) + Number(secondNum); break;
      case 'sub': result = Number(firstNum) - Number(secondNum); break;
      case 'div': result = Number(firstNum) / Number(secondNum); break;
      case 'mul': result = Number(firstNum) * Number(secondNum); break;
      default: result = 0;
    }
    return result
  }

  return (
    < div style={{ display: 'flex', flexDirection: 'column', maxWidth: '480px', alignItems: 'center', justifyContent: 'center' }}>
      <h2>React Calculator</h2>

      <input type='text' readOnly value={value} name='calculate' />

      <span style={{ fontSize: '24px', marginTop: '8px' }}>{totalResult}</span>

      <div style={{ display: 'grid', marginTop: "20px", width: "100%", gridTemplateColumns: 'repeat(4,1fr)' }}>
        {buttonValues.map((value) => (
          <button key={value} style={{ margin: '5px', padding: 10, width: '100px' }} onClick={() => handleButton(value)}>
            <span style={{ fontSize: '18px' }}>{value}</span></button>
        ))}
      </div>
    </div>
  )
}

export default App
