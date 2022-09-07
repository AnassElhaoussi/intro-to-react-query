import Axios from 'axios'

const todosApi = Axios.create({
    baseURL: "http://localhost:3500"
})

export const getTodos = async () => {
    const response = await todosApi.get('/todos')
    return response.data
}

export const createTodo = async (todo) => {
    await todosApi.post('/todos', todo)
}

export const deleteTodo = async (todo) => {
    await todosApi.delete(`/todos/${todo.id}`, todo)
}

export const updateTodo = async ({id}) => {
    await todosApi.patch(`/todos/${id}`, id)
}