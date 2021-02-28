import SignInReducer from "./SignInReducer";
import SignUpReducer from "./SignUpReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import StudentsReducer from "./StudentsReducer";
import CompanyReducer from "./CompanyReducer";
import VacancyReducer from "./VacancyReducer";
import AdminReducer from "./AdminReducer";
const rootReducer = combineReducers({
    signIn: SignInReducer,
    signUp: SignUpReducer,
    auth: authReducer,
    student: StudentsReducer, 
    company: CompanyReducer,
    vacancy: VacancyReducer,
    admin: AdminReducer,
})
export default rootReducer;