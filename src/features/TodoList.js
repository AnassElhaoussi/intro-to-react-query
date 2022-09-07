import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/todosApi'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons'

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data: todosData
    } = useQuery('todos', getTodos)

    const addTodoMutation = useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        }
    })

    const updateTodoMutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
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
        <div className='todos-container'>
            <h1>Your current tasks : </h1>
            <div>
                {todosData?.map(todo => {
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
        <h1>Add a new todo</h1>
        <input 
            type="text" 
            placeholder="What's your today's task"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value)}
        />
        <button onClick={handleSubmit}>Submit task</button>
        {todosData && todosWrapper}
        {isError && <p>{error.message}</p>}
        {isLoading && <p>Loading...</p>}
    </div>
  )
}

export default TodoList