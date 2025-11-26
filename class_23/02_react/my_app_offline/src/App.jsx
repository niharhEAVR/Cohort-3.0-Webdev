import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { notifications, totalNotificationSelector,markAllReadSelector } from './store/atom'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  const resetAll = useSetRecoilState(markAllReadSelector);


  const increaseNetwork = () => {
    setNetworkCount(prev => ({
      ...prev,
      network: prev.network + 1
    }));
  };


  return (
    <>
      <button>Home</button>

      <button onClick={increaseNetwork}>My network ({networkCount.network >= 10 ? "9+" : networkCount.network})</button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button onClick={()=>resetAll(0)}>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App