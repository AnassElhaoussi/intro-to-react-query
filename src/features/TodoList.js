import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/todosApi'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faTrash, faCheck} from '@fortawesome/free-solid-svg-icons'

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery('todos', getTodos)

    
    const addTodoMutation = useMutation(createTodo, {
        onSuccess: () =>{
            queryClient.invalidateQueries('todos')
        }
    })

    const updateTodoMutation = useMutation(updateTodo, {
        onMutate: ({id, completed}) => {
            queryClient.setQueryData('todos', old => {
               console.log(old)
               const newUpdatedTodos = old
               .map((todo) => {
                    if(todo.id === id){
                        return {...todo, completed}
                    }
                    return todo
               })

               return newUpdatedTodos
            })
        }
    })

    const deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodoMutation.mutate({userId:1, title: newTodo, completed: false  })
        setNewTodo('')
    }

    const todosWrapper = (
        <div className='todos'>
            <span>YOUR CURRENT TASKS :  </span>
            <div className='todos__container'>
                {data?.map((todo, id) => {
                    return (
                        <div className='todo'>
                            <input 
                            type="checkbox" 
                            id={todo.id}
                            checked={todo.completed}
                            onChange={() => {
                                updateTodoMutation
                                .mutate({...todo, completed: !todo.completed})
                            }} />
                            <label htmlFor={todo.id}>{todo.title}</label>
                            <FontAwesomeIcon 
                            icon={faTrash}
                            onClick={() => deleteTodoMutation.mutate(todo.id)}
                            />
                        </div>
                    )
                }).reverse()}
            </div>
        </div>
    )


  return (
      <div className='wrapper'>
        <div>
            <h1 className='primary-heading'>Hi there!</h1>
            <div className='input-container'>
                <input 
                    type="text" 
                    placeholder="What's your today's task"
                    value={newTodo}
                    onChange={event => setNewTodo(event.target.value)}
                    />
                
                <FontAwesomeIcon 
                icon={faCheck} 
                className='check'
                onClick={handleSubmit} />
            </div>
        </div>
        {data && todosWrapper}
        {isError && <p className='error'>{error.message}</p>}
        {isLoading && <p className='loading'>Loading your todos..</p>}
    </div>
  )
}

export default TodoList