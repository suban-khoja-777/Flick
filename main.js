// DOM Element Reference
const TASK_CONTAINER = document.querySelector('div.task-container > ul');
const NEW_TASK_INPUT = document.querySelector('input.new-task-input');


let STORE = [];

const getDataFromDatabase = () =>  {
    return API_CALL(ENDPOINTS.getAllTask,GET_ALL_TASK_REQUEST);
}


const initilizeApp = () => {
    
    const response = getDataFromDatabase();
    response.then(res => {
        STORE = res.nodes.filter(node => node.id !== 'root');
        createTaskOnUI(STORE);
    });
    
}

const createTaskOnUI = (TaskList) => {
    if(!TaskList) return;

    TASK_CONTAINER.innerHTML = '';
    TaskList.forEach(task => {
        let task_ele = TASK_TEMP.content.cloneNode(true);
        task_ele.querySelector('li').setAttribute('task-id',task.id);
        task_ele.querySelector('li > .task-label').textContent = task.content;
        (task.checked) ? 
            task_ele.querySelector('li > .task-actions > .toggl').textContent = '❌' :
            task_ele.querySelector('li > .task-actions > .toggl').textContent = '✔️';
        
            TASK_CONTAINER.appendChild(task_ele);
        
        (task.checked) ? 
            TASK_CONTAINER.querySelector(`li[task-id="${task.id}"] > .task-label`).classList.add('completed'):
            TASK_CONTAINER.querySelector(`li[task-id="${task.id}"] > .task-label`).classList.add('not-completed');
    });
}

const getTaskId = (btnEle) => {
    let li_ele = btnEle.parentElement.parentElement;
    return li_ele.getAttribute('task-id');
}

const deleteTask = (e) => {
    let task_id = getTaskId(e.currentTarget);
    STORE = STORE.filter(task => task.id !== task_id);
    
    createTaskOnUI(STORE);
    API_CALL(ENDPOINTS.updateTask,DELETE_TASK_REQUEST(task_id));
}

const togglTaskStatus = (e) => {
    let task_id = getTaskId(e.currentTarget);
    let newTaskStatus;
    STORE = STORE.map(task => {
        if(task.id === task_id)
        newTaskStatus = task.checked = !task.checked;  
        return task;
    })

    createTaskOnUI(STORE);
    API_CALL(ENDPOINTS.updateTask,UPDATE_TASK_STATUS_REQUEST(newTaskStatus,task_id));

}

const createNewTask = (e) => {
    let task_content = e.currentTarget.value;
    if(task_content && e.key === 'Enter'){
        STORE = [
            ...STORE,
            {
                id : TASK_CONTAINER.childElementCount+1,
                content : task_content,
                checked : false
            }
        ];
        e.currentTarget.value = null;
        
        createTaskOnUI(STORE);
        API_CALL(ENDPOINTS.updateTask,CREATE_TASK_REQUEST(task_content));
    }
} 

const updateTaskContent = (e) => {
    let task_content = e.currentTarget.querySelector('span.task-label').textContent;
    if(task_content){
        API_CALL(ENDPOINTS.updateTask,UPDATE_TASK_LABEL_REQUEST(task_content,e.currentTarget.getAttribute('task-id')));
    }
}

