import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/todosApi'
import { useState } from 'react'

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data: todo
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

  return (
    <div>
        <h1>Hello there</h1>
    </div>
  )
}

export default TodoList