import './App.css'
import { Button } from './components/Buttton'
import { PlusIcon } from './icons/Plus_icon'
import { ShareIcon } from './icons/Share_icon'

function App() {

  return (
    <>
      <div className=''>
        <Button
          variant={"primary"}
          startIcon={<PlusIcon size={"lg"} />}
          size="lg"
          title={"Add Content"}
        ></Button>

        <Button
          variant={"secondary"}
          startIcon={<ShareIcon size={"lg"} />}
          size="lg"
          title={"Share"}
        ></Button>


        <Button
          variant={"primary"}
          startIcon={<PlusIcon size={"sm"} />}
          endIcon={<ShareIcon size={"sm"} />}
          size="sm"
          title={"small button"}
        ></Button>

        <Button
          variant={"primary"}
          startIcon={<PlusIcon size={"md"} />}
          endIcon={<ShareIcon size={"md"} />}
          size="md"
          title={"medium button"}
        ></Button>
      </div>
    </>
  )
}

export default App