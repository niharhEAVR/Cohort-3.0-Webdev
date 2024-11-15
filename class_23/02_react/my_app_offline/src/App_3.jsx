
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil';
import { todosAtomFamily } from './store/selector_family';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
//    const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
   const todo= useRecoilValueLoadable(todosAtomFamily(id));

    if(todo.state === "loading"){
        return <div>
            Loading...
        </div>
    }else if(todo.state === "hasValue"){
        return (
          <>
            {todo.contents.title}
            {todo.contents.completed}
            <br />
          </>
        )
    }else if(todo.state === "hasError"){
        return <div>
            Backend called failed
        </div>
    }

}

export default App