import React, { Fragment, useState } from 'react'

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}


function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = (e: FormElem): void => {
      e.preventDefault()
      addTodo(value)
      setValue('')
    }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    // create clone of todos array with spread operator
    // so we don't mutate our original todos
    // https://stackoverflow.com/questions/44808882/create-a-clone-of-an-array-in-typescript
    const newTodos: ITodo[] = [...todos];
    // index into target todo object and copy all properties and update complete
    newTodos[index] = {
      ...newTodos[index],
      complete: !newTodos[index].complete
    };
    // set cloned array as new todo array
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  console.log(todos)

  return (
   <Fragment>
     <h1>Todo List</h1>
     <form onSubmit={handleSubmit}>
         <input
           type='text'
           value={value}
           onChange={e => setValue(e.target.value)}
           required
         />
         <button type='submit'>Add Todo</button>
       </form>

     {/* list todos */ }
     <section>
     {/* call map on todos array with 2 args + args:
          todo item from the array of type ITodo and
          and index of type number.
          https://stackoverflow.com/questions/38364400/index-inside-map-function */}
          {todos.map((todo: ITodo, index: number) => (
            <div key={index} style={{ display: 'flex' }}>
              <div
                style={{ textDecoration: todo.complete ? 'line-through' : '' }}
              >
                {todo.text}
              </div>
              <button type='button' onClick={() => completeTodo(index)}>
                {todo.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button onClick={() => removeTodo(index)}>x</button>
            </div>
          ))}
     </section>
   </Fragment>
 )
}

export default App
