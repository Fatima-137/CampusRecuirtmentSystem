import Type from "../Const/Types";
import "../../config/fb";
import * as firebase from "firebase";

export const addNewVacancy = (newVacancy) => {
    return dispatch => {
        firebase.database().ref().child("Vacancies").push(newVacancy)
        dispatch({ type: Type.newVacancy, newVacancy })
    }
}
export const DeleteVacancy = (did) => {
    return dispatch => {
        firebase.database().ref().child(`Vacancies/${did}`).remove()
        dispatch({type: Type.deleteVacancy})
    }
}

export const PervDataOfVacancies = () => {
    return (dispatch) => {
        firebase.database().ref().child("Vacancies").on("value", (snapshot) => {
            const data = snapshot.val()
            const TemArr = []
            for (let key in data) {
                TemArr.push({
                    postId: key,
                    userId: data[key].userId,
                    jobname: data[key].jobname,
                    jobdes: data[key].jobdes,
                    salary: data[key].salary,
                    ec: data[key].ec,
                    cname: data[key].cname,
                    block: data[key].block,
                })
            }
            dispatch({ type: Type.pervDataOfVacancies, dataP: TemArr })
        })
    }
}

export const RemoveErrorMessagesPC = () => {
    return {type: Type.removeErrorMessPC}
}
export const ErrorPostC = (mess) => {
    return {type: Type.errorPostC, errorMessagePostC: mess}
}
