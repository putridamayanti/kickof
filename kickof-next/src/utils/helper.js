import {setItem} from "utils/storage";

export const generateUniqueId = (length = 6) => {
    return Math.random().toString(36).substring(2, length+2);
};

export const getIp = () => {
    return fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                setItem('country', res.countryCode?.toLowerCase());
            }
        });
};

export const handleURLQueries = (router, path) => {
    console.log(router)
    if (Object.keys(router.query).length && path) {
        const arr = Object.keys(router.query)

        return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]]) && path !== '/'
    }

    return false
}