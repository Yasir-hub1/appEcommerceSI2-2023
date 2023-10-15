export const RESTORE_TOKEN = 'RESTORE_TOKEN';// restaura el token para q el usuario entre directo si esta logueado

export const SIGN_IN = 'SIGN_IN';//

export const SIGN_OUT = 'SIGN_OUT';//

/* ESTADO INICIAL DE LA APP */
export const initialState = {
    access_token: null,
    user:null,
}
/* GUARDANDO ESTADO DEL USUARIO =>TOKEN */
const AuthReducer=(prevState:{user:null,access_token:null}=initialState,action)=>{
    // console.log("reducer ",action.access_token);
    switch(action.type){
        /* cuando se restaure el token añade uno nuevo */
        case RESTORE_TOKEN:{
            return {
                ...prevState,
                access_token:action.access_token,
                user:action.user,
            }
        }
        case SIGN_IN:{
            return {
                ...prevState,
                access_token:action.access_token,
                user:action.user,
            }
        }
        case SIGN_OUT:{
            return {
                ...prevState,
                access_token:null,
                user:null,
            }
        }
        
    }
};
/* video 35 inicial */
export default AuthReducer;