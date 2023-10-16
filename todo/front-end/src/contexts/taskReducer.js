
export const actions = {
    added: "added_task",
    deleted: "deleted_task",
    updated: "updated_task",
    checkedDone: "check_done"
}

export default function taskReducer(state, action){
    switch(action.type){
        case actions.added: {
            return  [...state, action.name]
        }
        case actions.updated:
            return state.map(task => task._id === action.todo._id ? action.todo: task)
        case actions.deleted:
            return state.filter(item => item._id != action.id)
        case actions.checkedDone:
            return state.map(item =>{
                if (item._id === action.todo._id){
                  return {...item, completed: !item.completed}
                }
                return item
              })
        default: {
            throw Error(`unknown ${action.type} type`)
        }
    }
}