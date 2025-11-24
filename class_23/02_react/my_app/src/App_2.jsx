import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import './App.css'
import { CounterAtom, EvenSelector } from "./store/atoms/CounterAtom_Selector";


function App() {

  return (
    <>
      <RecoilRoot>
        <Counter />
        <Buttons />
        <EvenOrOdd />
      </RecoilRoot>
    </>
  )
}

function Counter() {
  const count = useRecoilValue(CounterAtom)
  return <div>
    {count}
  </div>
}

function Buttons() {
  const setCount = useSetRecoilState(CounterAtom)

  return <div>
    <button onClick={() => { setCount(c => c + 1) }}>Increase</button>
    <button onClick={() => { setCount(c => c - 1) }}>Decrease</button>
  </div>
}

function EvenOrOdd() {
  const even = useRecoilValue(EvenSelector)
  return <button>
    {even ? "Even" : "Odd"}
  </button>
}

export default App
