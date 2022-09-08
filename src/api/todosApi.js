import Axios from 'axios'

const todosApi = Axios.create({
    baseURL: "http://localhost:5000"
})

export const getTodos = async () => {
    const response = await todosApi.get('/todos')
    return response.data
}

export const createTodo = async (todo) => {
    await todosApi.post('/todos', todo)
}

export const deleteTodo = async (id) => {
    await todosApi.delete(`/todos/${id}`, id)
}

export const updateTodo = async (todo) => {
    await todosApi.patch(`/todos/${todo.id}`, todo)
}