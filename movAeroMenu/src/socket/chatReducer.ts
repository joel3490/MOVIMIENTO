import { ChatAction, ChatState, types } from "../types/SocketServices";



export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    
    //console.log(action)
    
    switch (action.type) {
        case types.aeroUserCargados:
            return {
                ...state,
                aeroUser: [ ...action.payload ]
            }  
        case types.authentificacion:
                return {
                  ...state,
                  userAuth: action.payload,
                };
        default:
            return state;
    }
};
