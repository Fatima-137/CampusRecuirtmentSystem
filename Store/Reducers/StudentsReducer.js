import Type from "../Const/Types"
const initState = {
    allStudents: [],
    pervDataOfStudents: false,
    vErrorMessage: "",
    vErrorFlag: false,
}
const StudentsReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.pervDataOfStudents:
            return state = {
                ...state,
                allStudents: action.data,
                pervDataOfStudents: true
            }
        case Type.newStudent:
            return state
        case Type.validate :
        return state = {
            ...state,
            vErrorFlag: true,
            vErrorMessage: action.verrMess
        }
        case Type.removeErrorMess:
        return state = {
            ...state,
            vErrorFlag: false,
            vErrorMessage: "",
        }
        default:
            return state;
    }
}
export default StudentsReducer;