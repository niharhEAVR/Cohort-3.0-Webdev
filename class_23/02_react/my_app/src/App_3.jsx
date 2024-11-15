import { useEffect, useState, memo } from "react";
import './App.css'
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import { counterAtom, evenSelector } from "./store/atoms/counter_2";


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
  const count = useRecoilValue(counterAtom)
  return <div>
    {count}
  </div>
}

function Buttons() {
  const setCount = useSetRecoilState(counterAtom)
  
  return <div>
    <button onClick={() => { setCount(c => c + 2) }}>Increase</button>
    <button onClick={() => { setCount(c => c - 1) }}>Decrease</button>
  </div>
}

function EvenOrOdd() {
  const even = useRecoilValue(evenSelector)
  return <div>
    {even ? "Even" : "Odd"}
  </div>
}

export default App
