import Type from "../Const/Types";
const initialSate = {
    allCompanies: [],
    pervDataOfCompanies: false,
    errorFlag: false,
    errorMessage: ""
}
const CompanyReducer = (state = initialSate, action) => {
    switch (action.type) {
        case Type.pervDataOfCompanies:
            return state = {
                ...state,
                allCompanies: action.dataC,
                pervDataOfCompanies: true
            }
        case Type.newCompany:
            return state;
        case Type.removeErrorMessC: 
            return state = {
                ...state,
                errorFlag: false,
                errorMessage: ""
            }
        case Type.errorInfoC: 
        return state = {
            ...state,
            errorFlag: true,
            errorMessage: action.errorMessageInfoC,
        }
        default:
            return state;
    }
}
export default CompanyReducer;