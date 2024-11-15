import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'b983fdd2-6d82-4150-88ca-bd6a10af1e07'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string
    addedDate: string
    order: number
}

type ResponseTodolistsType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

type ItemDataType = {
    item: TodolistType
}

export type TaskResponseType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskResponseType[]
}
export const todolistsAPI = { 
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistsType<ItemDataType>>('todo-lists', { title: title })
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseTodolistsType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseTodolistsType>(`todo-lists/${id}`, { title: title })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<GetTasksResponseType>(`todo-lists/${ todolistId }/tasks/+ ${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<GetTasksResponseType>(`todo-lists/${ todolistId }/tasks/+ ${taskId}`)
    }
    
}