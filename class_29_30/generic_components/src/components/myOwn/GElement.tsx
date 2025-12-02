import { Button } from './components/Buttton'
import { PlusIcon } from './icons/Plus_icon'
import { ShareIcon } from './icons/Share_icon'

function GElement() {

  return (
    <>
      <div className="h-30 w-auto flex gap-2 justify-center items-center m-2 p-3">
        <Button
          variant={"primary"}
          hover={"hprimary"}
          startIcon={<PlusIcon size={"lg"} />}
          size="lg"
          title={"Add Content"}
          ></Button>

        <Button
          variant={"secondary"}
          hover={"hprimary"}
          startIcon={<ShareIcon size={"lg"} />}
          size="lg"
          title={"Share"}
          ></Button>

        <Button
          variant={"primary"}
          hover={"hprimary"}
          startIcon={<PlusIcon size={"md"} />}
          endIcon={<ShareIcon size={"md"} />}
          size="md"
          title={"medium button"}
        ></Button>

        <Button
          variant={"primary"}
          hover={"hprimary"}
          startIcon={<PlusIcon size={"sm"} />}
          endIcon={<ShareIcon size={"sm"} />}
          size="sm"
          title={"small button"}
          ></Button>
      </div>
    </>
  )
}

export default GElement