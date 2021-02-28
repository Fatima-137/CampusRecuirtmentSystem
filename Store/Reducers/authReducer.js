import Type from "../Const/Types"
const initState={
    status: "",
    currentUser: null,
    errorMessage: "",
    statusErr: false,
    
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case Type.currentUser:
        return state={
            ...state,
            status: action.userStatus,
            currentUser: action.currentUser
        }
        case Type.currentUserError:
        return state = {
            ...state,
            status: "",
            currentUser: null,
        }
        case Type.logOut:
        return state;
        case Type.SignUpVS:
        return state = {
            ...state,
            errorMessage: "Please select one of these options.",
            statusErr: true,
        }
        case Type.remove :
            return state = {
                ...state,
                errorMessage: "",
                statusErr: false,
        }
        default:
        return state;
    }
    
}
export default  authReducer;