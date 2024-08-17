import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllow, setnumberAllow] = useState(false)
  const [chart, setchart] = useState(false)
  const [password, setpassword] = useState("")
  //ref hook
  const password_ref = useRef(null)

  const passwordgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllow)
      str += "0123456789"
    if (chart)
      str += "!@#$%^&*_+-=[]{}?/"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, numberAllow, chart])

  const copypasswordtoclipbord = useCallback(() => {
    password_ref.current.select();  // Select the input text
    document.execCommand("copy");  // Copy the selected text
    alert("Password copied to clipboard!");
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordgen()
  }, [length, numberAllow, chart, passwordgen])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center py-2">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={password_ref}
        />
        <button
          onClick={copypasswordtoclipbord}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={12}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setlength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllow}
            id="numberInput"
            onChange={() => setnumberAllow((prev) => !prev)}
          />
          <label htmlFor="numberInput">Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={chart}
            id="CharacterInput"
            onChange={() => setchart((prev) => !prev)}
          />
          <label htmlFor="CharacterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
