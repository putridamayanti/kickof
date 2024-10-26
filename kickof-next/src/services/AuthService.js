import Api from "utils/api";
import {setItem} from "utils/storage";

const login = (params) => {
    return Api.Instance.post('/login', params)
        .then(res => {
            if (res.status === 200) {
                setItem('x-token', res.data?.data?.token);
            }

            return res;
        });
};

const AuthService = {
    login
};

export default AuthService;