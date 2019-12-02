import axios from 'axios';
export const LOGIN_USER = "login_user";
export const GET_PROFILE ="get_profile";
export const UPDATE_PROFILE ="update_profile";

const ROOT_URL = "http://localhost:3001";

export function loginuser(values,callback) {

    axios.defaults.withCredentials=true;
    console.log(values);
    const request = axios
    .post(`${ROOT_URL}/login`,values);

    return (dispatch) =>{
        request.then((res)=>{
            
            dispatch({ 
                type: LOGIN_USER,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function getProfile(values, callback) {

    axios.defaults.withCredentials=true;
    console.log(values)
    const request = axios
    .post(`${ROOT_URL}/profile/getprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function updateProfile(values, callback) {

    axios.defaults.withCredentials=true;
    console.log(values)
    const request = axios
    .post(`${ROOT_URL}/profile/updateprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

