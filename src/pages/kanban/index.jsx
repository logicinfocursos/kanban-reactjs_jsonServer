import { useEffect, useState } from "react"
import axios from 'axios'


export default function Kanban() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState([])
  const [taskDrop, setTaskDrop] = useState([])

  const fetchData = async () => {

    const response = await axios.get('http://localhost:3005/kanban')

    setTasks(response.data)
  }

  useEffect(() => {

    fetchData()

  }, [])


  if (!tasks || tasks.length < 1) return <></>

  return (
    <div className="container">
      <div className="kanban-heading">
        <strong className="kanban-heading-text">quadro kanban (css/html/javascript only)</strong>
      </div>
      <div className="kanban-board">
        <div className="kanban-block" id="todo" onDrop="drop(event)" onDragOver="allowDrop(event)">
          <strong>stories</strong>
          <div className="task-button-block">
            <button id="task-button" onClick={createTask}>create new task </button>
          </div>

          {
            tasks.filter((t) => t.step == 'stories' && t.status == 1).map((item, key) => {
              return (
                <div className="task" id={`task${item.id}`} draggable="true" onDragStart={(event) =>  drag(event, setTaskDrop)} key={key} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                  <span>#{item.id} {item.name}</span>
                  <p style={{ fontSize: 'x-small' }}>{item.details}</p>
                  <hr />
                  <p style={{ fontSize: 'xx-small', color: 'cadetblue' }}>created deadline daysLeft owner</p>
                </div>
              )
            })
          }

        </div>

        <div className="kanban-block" id="stories" onDrop={(event) => drop(event, setTaskDrop, taskDrop)} onDragOver={(event) => allowDrop(event)}>
          <strong>to do</strong>
          {
            tasks.filter((t) => t.step == 'todo' && t.status == 1).map((item, key) => {
              return (
                <div className="task" id={`task${item.id}`} draggable="true" onDragStart={(event) =>  drag(event, setTaskDrop)} key={key} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                  <span>#{item.id} {item.name}</span>
                  <p style={{ fontSize: 'x-small' }}>{item.details}</p>
                  <hr />
                  <p style={{ fontSize: 'xx-small', color: 'cadetblue' }}>created deadline daysLeft owner</p>
                </div>
              )
            })
          }
        </div>

        <div className="kanban-block" id="inprogress" onDrop={(event) => drop(event, setTaskDrop, taskDrop)} onDragOver={(event) => allowDrop(event)}>
          <strong>in progress</strong>
          {
            tasks.filter((t) => t.step == 'inprogress' && t.status == 1).map((item, key) => {
              return (
                <div className="task" id={`task${item.id}`} draggable="true" onDragStart={(event) =>  drag(event, setTaskDrop)} key={key} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                  <span>#{item.id} {item.name}</span>
                  <p style={{ fontSize: 'x-small' }}>{item.details}</p>
                  <hr />
                  <p style={{ fontSize: 'xx-small', color: 'cadetblue' }}>created deadline daysLeft owner</p>
                </div>
              )
            })
          }
        </div>

        <div className="kanban-block" id="verify" onDrop={(event) => drop(event, setTaskDrop, taskDrop)} onDragOver={(event) => allowDrop(event)}>
          <strong>in verify / testing</strong>
          {
            tasks.filter((t) => t.step == 'verify' && t.status == 1).map((item, key) => {
              return (
                <div className="task" id={`task${item.id}`} draggable="true" onDragStart={(event) =>  drag(event, setTaskDrop)} key={key} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                  <span>#{item.id} {item.name}</span>
                  <p style={{ fontSize: 'x-small' }}>{item.details}</p>
                  <hr />
                  <p style={{ fontSize: 'xx-small', color: 'cadetblue' }}>created deadline daysLeft owner</p>
                </div>
              )
            })
          }
        </div>

        <div className="kanban-block" id="done" onDrop={(event) => drop(event, setTaskDrop, taskDrop)} onDragOver={(event) => allowDrop(event)}>
          <strong>done</strong>
          {
            tasks.filter((t) => t.step == 'done' && t.status == 1).map((item, key) => {
              return (
                <div className="task" id={`task${item.id}`} draggable="true" onDragStart={(event) => drag(event, setTaskDrop)} key={key} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                  <span>#{item.id} {item.name}</span>
                  <p style={{ fontSize: 'x-small' }}>{item.details}</p>
                  <hr />
                  <p style={{ fontSize: 'xx-small', color: 'cadetblue' }}>created deadline daysLeft owner</p>
                </div>
              )
            })
          }
        </div>

        <div className="create-new-task-block" id="create-new-task-block">
          <strong>add task</strong>
          <span className="form-row">
            <label className="form-row-label" htmlFor="task-name">task</label>
            <input className="form-row-input" type="text" name="task-name" id="task-name" value={task.name} onChange={(event) => setTask({ ...task, name: event.target.value })} />
          </span>
          <span className="form-row">
            <label className="form-row-label" htmlFor="task-name">details</label>
            <textarea className="form-row-input" name="task-description" id="task-description" cols={70} rows={10} value={task.details} onChange={(event) => setTask({ ...task, details: event.target.value })} />
          </span>
          <span className="form-row">
            <label className="form-row-label" htmlFor="task-name">etapa</label>
            <select className="form-row-input" name="task-status" id="task-status" value={task.step} onChange={(event) => setTask({ ...task, step: event.target.value })}>
              <option value="stories">stories</option>
              <option value="todo">do do</option>
              <option value="inprogress">in progress</option>
              <option value="inprogress">verity</option>
              <option value="done">done</option>
            </select>
          </span>
          <span className="form-row-buttons">
            <button id="edit-button" onClick="editTask()">edit</button>
            <button id="save-button" onClick={() => saveTask(task)}>save</button>
            <button id="cancel-button">close</button>
          </span>
        </div>
      </div>
    </div>

  )
}

export function drag(ev, setTaskDrop) {
  ev.dataTransfer.setData("text", ev.target.id)
  console.log(">>>drag ev", ev)
  const taskDropNew = {
    task: ev.target
  }
  setTaskDrop(taskDropNew)
}

export function allowDrop(ev) {
  ev.preventDefault();
}

export function drop(ev, setTaskDrop, taskDrop) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
  console.log(">>>drop data:", data)
  console.log(">>>drop ev:", ev)
  
  let taskDropNew = {
    ...taskDrop,
    div: ev.target
  }
  setTaskDrop(taskDropNew)

  console.log(">>>taskDropNew: ", taskDropNew)
  console.log(">>>taskDropNew taskDropNew.task: ", taskDropNew.task)
  console.log(">>>taskDropNew taskDropNew.div: ", taskDropNew.div)
  //taskDropNew.task = taskDropNew.task.substr(3,taskDropNew.task.indexOf(".")-3)
  let task = taskDropNew.task.id
  let div = taskDropNew.div.id
 
 console.log(">>>taskDropNew final task, div", task, div)

 updateTask(task, div)
}

export const updateTask = async(task, div) =>{

  const id = task.substr(4)
  const responseTask = await axios.get(`http://localhost:3005/kanban?id=${id}`)
  console.log(">>> updateTask responseTask", responseTask)
  //const taskUpdate
  const taskUpdate ={
    ...responseTask.data[0],
    step: div,
    updated_at: Date.now()
  }
  console.log(">>> updateTask taskUpdate", taskUpdate)
  await axios.patch(`http://localhost:3005/kanban/${id}`, taskUpdate)
}

export function createTask() {
  var s = document.getElementById("stories");
  var v = document.getElementById("verify");
  var x = document.getElementById("inprogress");
  var y = document.getElementById("done");
  var z = document.getElementById("create-new-task-block");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
    s.style.display = "block";
    v.style.display = "block";
    z.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "none";
    s.style.display = "none";
    v.style.display = "none";
    z.style.display = "flex";
  }
}

export async function saveTask(task) {
  // var saveButton = document.getElementById("save-button");
  // var editButton = document.getElementById("edit-button");
  // if (saveButton.style.display === "none") {
  //     saveButton.style.display = "block";
  //     editButton.style.display = "none";
  // } else{
  //     saveButton.style.display = "none";
  //     editButton.style.display = "block";
  // }
  const newTask = {
    ...task,
    owner: "ael",
    "status": 1,
    "created_at": Date.now(),
    "updated_at": Date.now(),
    "deadline": Date.now(),
    "leftDays": 0
  }

  await axios.post('http://localhost:3005/kanban', newTask)

  var todo = document.getElementById("todo");
  var taskName = document.getElementById("task-name").value;
  todo.innerHTML += `
  <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
      <span>${taskName}</span>
  </div>
  `
}

export function editTask() {
  var saveButton = document.getElementById("save-button");
  var editButton = document.getElementById("edit-button");
  if (saveButton.style.display === "none") {
    saveButton.style.display = "block";
    editButton.style.display = "none";
  } else {
    saveButton.style.display = "none";
    editButton.style.display = "block";
  }
}



