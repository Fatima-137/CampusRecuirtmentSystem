import Type from "../Const/Types";
import "../../config/fb";
import * as firebase from "firebase";

export const addNewStudent = (newStudent) => {
    return dispatch => {
        firebase.database().ref().child("Students").push(newStudent)
        dispatch({ type: Type.newStudent, newStudent })
    }
}

export const PervDataOfStudents = () => {
    return (dispatch) => {
        firebase.database().ref().child("Students").on("value", (snapshot) => {
            const data = snapshot.val()
            const TemArr = []
            for (let key in data) {
                TemArr.push({
                    id: key,
                    userId: data[key].userId,
                    firstName: data[key].firstName,
                    lastName: data[key].lastName,
                    age: data[key].age,
                    phoneNumber: data[key].phoneNumber,
                    gender: data[key].gender,
                    address: data[key].address,
                    email: data[key].email,
                    qua: data[key].qua,
                    dep: data[key].dep,
                    skills: data[key].skills,
                    block: data[key].block
                })
            }
            dispatch({ type: Type.pervDataOfStudents, data: TemArr })
        })
    }
}

export const Validation = (message) => {
return {type: Type.validate, verrMess: message}
}

export const RemoveErrorMessages = () => {
    return dispatch => {
        dispatch({type: Type.removeErrorMess })
    }
}