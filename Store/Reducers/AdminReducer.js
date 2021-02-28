import Type from "../Const/Types";
const initState = {
    blockList: [],
    userIsBlocked: false,
    Srequests: [],
    Crequests: [],
    blockedUser: null,
}
const AdminReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.blockList:
            return {
                ...state,
                blockList: action.blockData,
            }
        case Type.blocks:
            return state = {
                ...state,
            }
        case Type.unBlockS:
            return state
        case Type.blockc:
            return state = {
                ...state,
            }
        case Type.unBlockC:
            return state;
        case Type.userIsBlocked:
            return state = {
                ...state,
                userIsBlocked: true,
                blockedUser: action.blockedUser
            }
        case Type.userIsNotBlocked:
            return state = {
                ...state,
                userIsBlocked: false,
                blockedUser: null,
            }
        case Type.SUpdationRequests:
            return state = {
                ...state,
                Srequests: action.SupdationRequestsData,
            }
        case Type.CUpdationRequests:
            return state = {
                ...state,
                Crequests: action.CupdationRequestsData,
            }
        case Type.RequestCAccept:
            return state;
        case Type.RequestSAccept:
            return state;
        case Type.RequestSCancel:
            return state;
        case Type.RequestCCancel:
            return state;
        default:
            return state;
    }
}
export default AdminReducer;