import Type from "../Const/Types";
import "../../config/fb";
import * as firebase from "firebase";

export const BlockS = (studentId, studentUserId) => {
    return dispatch => {
        firebase.database().ref().child(`Status/${studentUserId}`).remove()
        firebase.database().ref().child("BlockList").push(studentUserId)
        const updates = {}
        updates["block"] = true
        firebase.database().ref().child(`Students/${studentId}`).update(updates)
        dispatch({ type: Type.blocks })
    }
}
export const UnBlockS = (studentId, studentUserId, BUKey) => {
    return dispatch => {
        const updates = {}
        updates["block"] = false
        firebase.database().ref().child(`Status/${studentUserId}`).set({status: "Student"})
        firebase.database().ref().child(`BlockList/${BUKey}`).remove();
        firebase.database().ref().child(`Students/${studentId}`).update(updates)
        dispatch({type: Type.unBlockS})
    }
}


















export const BlockC = (CompanyId, CompanyUserId) => {
    return (dispatch, getState) => {
        const state = getState();
        const vac = state.vacancy.allVacancies;
        const sp = vac.filter(v => v.userId === CompanyUserId);
        const updates = {}
        updates["block"] = true
        firebase.database().ref().child(`Status/${CompanyUserId}`).remove()
        firebase.database().ref().child("BlockList").push(CompanyUserId)
        firebase.database().ref().child(`Companies/${CompanyId}`).update(updates)
        sp.forEach(v => firebase.database().ref().child(`Vacancies/${v.postId}`).update(updates))
        dispatch({ type: Type.blockc })
    }
}
export const UnBlockC = (CompanyId, CompanyUserId, BUKey) => {
    return (dispatch, getState) => {
        const state = getState();
        const vac = state.vacancy.allVacancies;
        const sp = vac.filter(v => v.userId === CompanyUserId);
        const updates = {}
        updates["block"] = false
        firebase.database().ref().child(`Status/${CompanyUserId}`).set({status: "Company"})
        firebase.database().ref().child(`BlockList/${BUKey}`).remove();
        firebase.database().ref().child(`Companies/${CompanyId}`).update(updates)
        sp.forEach(v => firebase.database().ref().child(`Vacancies/${v.postId}`).update(updates))
        dispatch({type: Type.unBlockC})
    }
}


















export const BlockList = () => {
    return dispatch => {
        firebase.database().ref().child("BlockList").on("value", (snapshot) => {
            const data = snapshot.val()
            const TemArr = []
            for (let key in data) {
                TemArr.push({key: key, userId: data[key]})
            }
            dispatch({ type: Type.blockList, blockData: TemArr })
        })
    }
}
export const UpdationRequest = (data) => {
    return dispatch => {
        if (data.status === "Student") {
            firebase.database().ref().child("UpdationRequest").child("Student").push(data)
            dispatch({ type: Type.saveStudentUpdationData })
        }
        if (data.status === "Company") {
            firebase.database().ref().child("UpdationRequest").child("Company").push(data)
            dispatch({ type: Type.saveCompanyUpdationData })
        }
    }
}

export const PervDataOfUpdationRequests = () => {
    return dispatch => {
        firebase.database().ref().child("UpdationRequest").child("Student").on("value", (snapshot) => {
            const dataS = snapshot.val();
            const TemArrS = [];
            for (let key in dataS) {
                TemArrS.push({
                    userId: dataS[key].userId,
                    firstName: dataS[key].firstName,
                    lastName: dataS[key].lastName,
                    age: dataS[key].age,
                    skills: dataS[key].skills,
                    gender: dataS[key].gender,
                    phoneNumber: dataS[key].phoneNumber,
                    email: dataS[key].email,
                    qua: dataS[key].qua,
                    dep: dataS[key].dep,
                    editId: dataS[key].editId,
                    urid: key,
                    block: dataS[key].block,
                })
            }
            dispatch({ type: Type.SUpdationRequests, SupdationRequestsData: TemArrS })
        })
        firebase.database().ref().child("UpdationRequest").child("Company").on("value", (snapshot) => {
            const dataC = snapshot.val();
            const TemArrC = [];
            for (let key in dataC) {
                TemArrC.push({
                    userId: dataC[key].userId,
                    cname: dataC[key].cname,
                    es: dataC[key].es,
                    hrname: dataC[key].hrname,
                    email: dataC[key].email,
                    cnum: dataC[key].cnum,
                    editId: dataC[key].editId,
                    urid: key,
                    block: dataC[key].block,
                })
            }
            dispatch({ type: Type.CUpdationRequests, CupdationRequestsData: TemArrC })
        })

    }
}
export const RequestSAccept = (editId, updationId) => {
    return (dispatch, getState) => {
            const state = getState();
            const sp = state.admin.Srequests.find(v => v.editId === editId)
            const TemObj = {userId: sp.userId,
                firstName: sp.firstName, 
                lastName: sp.lastName,
                age: sp.age,
                skills: sp.skills,
                gender: sp.gender, 
                phoneNumber: sp.phoneNumber,
                email: sp.email, 
                qua: sp.qua,
                dep: sp.dep, block: sp.block}
                firebase.database().ref().child(`Students/${editId}`).update(TemObj);
                firebase.database().ref().child("UpdationRequest").child(`Student/${updationId}`).remove();
                dispatch({type: Type.RequestSAccept})
    }
}

export const RequestCAccept = (editId, updationId) => {
    return (dispatch, getState) => {
            const state = getState();
            const sp = state.admin.Crequests.find(v => v.editId === editId)
            const TemObj = {userId: sp.userId,
                cname: sp.cname,
                es: sp.es,
                hrname: sp.hrname,
                email: sp.email,
                cnum: sp.cnum, block: sp.block}
                firebase.database().ref().child(`Companies/${editId}`).update(TemObj);
                firebase.database().ref().child("UpdationRequest").child(`Company/${updationId}`).remove();
                dispatch({type: Type.RequestCAccept})
    }
}

export const RequestSCancel = (updationId) => {
    return dispatch => {
        firebase.database().ref().child("UpdationRequest").child(`Student/${updationId}`).remove();
        dispatch({type: Type.RequestSCancel})
    }
}
export const RequestCCancel = (updationId) => {
    return dispatch => {
        firebase.database().ref().child("UpdationRequest").child(`Company/${updationId}`).remove();
        dispatch({type: Type.RequestCCancel})
    }
}
