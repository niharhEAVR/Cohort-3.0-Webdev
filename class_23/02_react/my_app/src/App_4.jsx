import { useResetRecoilState, RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import './App.css'
import { tempF, tempC } from "./store/atoms/temp.jsx";

function App() {
    return <RecoilRoot>
        <TempC />
    </RecoilRoot>
}

function TempC() {
    const resetTemp = useResetRecoilState(tempC);
    const setTempC = useSetRecoilState(tempC);
    const setTempF = useSetRecoilState(tempF);

    const addTenCelsius = () => setTempC((currentTemp) => currentTemp + 10);
    const addTenFahrenheit = () => setTempF((currentTemp) => currentTemp + 10);

    const reset = () => resetTemp();


    const tempCValue = useRecoilValue(tempC);
    const tempFValue = useRecoilValue(tempF);



    return (
        <div>
            Temp (Celsius): {tempCValue}
            <br />
            Temp (Fahrenheit): {tempFValue}
            <br />
            <button onClick={addTenCelsius}>Add 10 Celsius</button>
            <br />
            <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
            <br />
            <button onClick={reset}>Reset</button>
        </div>
    )



}


export default App