import Type from "../Const/Types";
const initialSate = {
    allVacancies: [],
    pervDataOfVacancies: false,
    errorFlag: false,
    errorMessage: "",
}
const VacancyReducer = (state = initialSate, action) => {
    switch (action.type) {
        case Type.pervDataOfVacancies:
            return state = {
                ...state,
                allVacancies: action.dataP,
                pervDataOfVacancies: true
            }
        case Type.newVacancy:
            return state;
        case Type.removeErrorMessPC: 
            return state = {
                ...state,
                errorFlag: false,
                errorMessage: ""
            }
        case Type.deleteVacancy: 
        return state;
        case Type.errorPostC: 
        return state = {
            ...state,
            errorFlag: true,
            errorMessage: action.errorMessagePostC,
        }
        default:
            return state;
    }
}
export default VacancyReducer;