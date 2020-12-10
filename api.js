const API_TOKEN = 'xuxd4BbvBd4CKzsJK0GaLIkyMtHb0B1PmQTz3IQBKAFAw1mBWGRT49SbXPNSICdEhvQsaiwEUEuUA0SGrELI2CMITu0oCcVzustCuItFPFW_pPt1TG5iKR-8QxuAlIMb';

const ROOT_FILE_ID = 'FnDMSS66yUUS3rP-SsegXf6J';

const ENDPOINTS = {
    getAllTask : "https://dynalist.io/api/v1/doc/read",
    updateTask : "https://dynalist.io/api/v1/doc/edit"
}

const GET_ALL_TASK_REQUEST = {
    token : API_TOKEN,
    file_id : ROOT_FILE_ID
}

const CREATE_TASK_REQUEST = (content) => {
    return {
        token : API_TOKEN,
        file_id : ROOT_FILE_ID,
        changes: [
            {
                action: "insert",
                parent_id: "root",
                index: -1,
                content,
                checked: false
            }
        ]
    }
}



const UPDATE_TASK_STATUS_REQUEST = (checked,node_id) => {
    return {
        token : API_TOKEN,
        file_id : ROOT_FILE_ID,
        changes: [
            {
                action: "edit",
                node_id,
                checked
            }
        ]
    }
}

const UPDATE_TASK_LABEL_REQUEST = (content,node_id) => {
    return {
        token : API_TOKEN,
        file_id : ROOT_FILE_ID,
        changes: [
            {
                action: "edit",
                node_id,
                content
            }
        ]
    }
}

const DELETE_TASK_REQUEST = (node_id) => {
    return {
        token : API_TOKEN,
        file_id : ROOT_FILE_ID,
        changes: [{
            action: "delete",
            node_id,
        }
        ]
    }
}

const API_CALL = (endpoint,request) => {
    return fetch(
        endpoint,{
            body : JSON.stringify(request),
            method : 'POST'
        }
    ).then(res => res.json()).catch(err => err);
}
