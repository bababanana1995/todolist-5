import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

//c- create
//r- read (view, filter, sort, search, page)
//u- update
//d- delete

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "active"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Cheeps", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Dry fish", isDone: false},
            {id: v1(), title: "Whiskey", isDone: false},
        ]
    })



    function removeTask(id: string, todoListId: string) {
        // const tasksArrayAfterDelete: Array<TaskType> = tasks[todoListId].filter(t => t.id != id)
        // const copyTasks: TasksStateType  = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterDelete
        // setTasks(copyTasks)
        //
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== id)
        })
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        // const tasksArrayAfterAdd: Array<TaskType> = [newTask, ...tasks[todoListId]]
        // const copyTasks: TasksStateType  = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterAdd
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {
                ...t,
                isDone: isDone
            } : t)
        })
    }

    function changeTaskTitle() {

    }

    function addTodoList() {

    }

    function changeTodoListFilter(filter: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {
            ...tl,
            filter: filter
        } : tl))
    }

    function changeTodoListTitle() {

    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }





    const todoListsComponents: Array<JSX.Element> = todoLists.map(tl => {
        let tasksForTodolist: Array<TaskType> = [];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }
        if(tl.filter === "all"){
            tasksForTodolist = tasks[tl.id]
        }

        return (
            <Todolist
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}

                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })


    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
