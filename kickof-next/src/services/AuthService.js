import Api from "utils/api";
import {setItem} from "utils/storage";

const login = (params) => {
    return Api.Instance.post('/login', params)
        .then(res => {
            console.log(res?.data)
            if (res.status === 200) {
                setItem('x-token', res.data?.data?.token);
            }

            return res;
        });
};

const getProfile = () => {
    return Api.Instance.get('/profile').then(res => res.data);
};

const AuthService = {
    login,
    getProfile
};

export default AuthService;