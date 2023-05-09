import actions from '../Authenticate/actions';

const initialState = {
  isAuthenticated: false,
  loader: false,
  email: null,
  name: null,
  validateUserLoader: true,
  logOutLoader: false,
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_AUTH_USER:
      return {...state, validateUserLoader: true}
    case actions.GET_AUTH_USER_SUCCESS:
      return {
        ...state,
        validateUserLoader: false,
        isAuthenticated: !!action.payload.data.email,
        email: action.payload.data.email,
        name: action.payload.data.name,
      }
    case actions.GET_AUTH_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        validateUserLoader: false,
        email: null,
        name: null,
      }
    case actions.LOGIN:
      return {...state, loader: true}
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!action.payload.data.email,
        loader: false,
        email: action.payload.data.email,
        name: action.payload.data.name,
      }
    case actions.LOGIN_FAILURE:
      return {...state, isAuthenticated: false, loader: false}
    case actions.LOGOUT:
      return {...state, logOutLoader: true}
    case actions.LOGOUT_SUCCESS:
      return {...state, isAuthenticated: false, logOutLoader: false}
    case actions.LOGOUT_FAILURE:
      return {...state, isAuthenticated: false, logOutLoader: false}
    case actions.REGISTER:
      return {...state, registerLoader: true}
    case actions.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!action.payload.data.email,
        registerLoader: false,
        email: action.payload.data.email,
        name: action.payload.data.name,
      }
    case actions.REGISTER_FAILURE:
      return {...state, isAuthenticated: false, registerLoader: false}
    case actions.CREATE_TASK:
      return {...state, createTaskLoader: true} 
    case actions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        createTaskLoader: false,
        title: action.payload.data.title,
        description: action.payload.data.description,
        status: action.payload.data.status,
        due_date: action.payload.data.due_date,
      }
    case action.CREATE_TASK_FAILURE:
      return {...state, createTaskLoader: false}
    case action.GET_TASKS: 
      return {...state, getTasksLoader: true}
    case action.GET_TASKS_SUCCESS:
      return {
        ...state,
        getTasksLoader: false,
        tasks: action.payload.data,
      }
    case action.GET_TASKS_FAILURE:
      return {...state, getTasksLoader: false}
    case action.UPDATE_TASK:
      return {...state, updateTaskLoader: true}
    case action.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        updateTaskLoader: false,
        title: action.payload.data.title,
        description: action.payload.data.description,
        status: action.payload.data.status,
        due_date: action.payload.data.due_date,
      }
    case action.UPDATE_TASK_FAILURE:
      return {...state, updateTaskLoader: false}
    case action.DELETE_TASK:
      return {...state, deleteTaskLoader: true}
    case action.DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteTaskLoader: false,
        title: action.payload.data.title,
        description: action.payload.data.description,
        status: action.payload.data.status,
        due_date: action.payload.data.due_date,
      }
    case action.DELETE_TASK_FAILURE:
      return {...state, deleteTaskLoader: false}
    case action.GET_TASK:
      return {...state, getTaskLoader: true}
    case action.GET_TASK_SUCCESS:
      return {
        ...state,
        getTaskLoader: false,
        title: action.payload.data.title,
        description: action.payload.data.description,
        status: action.payload.data.status,
        due_date: action.payload.data.due_date,
      }
    case action.GET_TASK_FAILURE:
      return {...state, getTaskLoader: false}
    case action.EDIT_TASK:
      return {...state, editTaskLoader: true}
    case action.EDIT_TASK_SUCCESS:
      return {
        ...state,
        editTaskLoader: false,
        id: action.payload.data.id,
        title: action.payload.data.title,
        description: action.payload.data.description,
        status: action.payload.data.status,
        due_date: action.payload.data.due_date,
      }
    case action.EDIT_TASK_FAILURE:
      return {...state, editTaskLoader: false}
    default:
      return state
  }
}

export default Reducer;
