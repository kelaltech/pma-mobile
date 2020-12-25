export type signupProps = {
    email: string,
    password: string,
    succesCb: Function,
    errorCb: Function
}

export const signup = ({ email, password, succesCb, errorCb}: signupProps) => {
    fetch(
        'http://localhost:1337/signup',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password
            })
        }
    )
        .then(resp => resp.json()
            .then(respObj => {
                if (resp.status === 200) {
                    succesCb(respObj);
                    return;
                }
                if (respObj.errors && respObj.errors.length > 0) {
                    errorCb({
                        title: 'Error',
                        message: respObj.errors[0].message
                    })
                    return;
                } else if (respObj.message && respObj.message.includes('unique')) {
                    errorCb({
                        title: 'This email is already signed up',
                        message: 'Try logging in'
                    })
                    return;
                }
                errorCb({
                    title: 'Unknown Error',
                    message: 'Please try again'
                })
            })
        )
        .catch(err => {
            console.log(err);
            errorCb({
                title: 'Unexpected',
                message: 'Please try again'
            })
        })
};

export type loginProps = {
    email: string,
    password: string,
    succesCb: Function,
    errorCb: Function
}

export const login = ({ email, password, succesCb, errorCb }: loginProps) => {
    fetch(
        'http://localhost:1337/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password
            })
        }
    )
        .then(resp => {
            resp.json()
                .then(respObj => {
                    if (resp.status === 200) {
                        succesCb(respObj);
                        return;
                    }
                    if (respObj.error) {
                        errorCb({
                            title: 'Error',
                            message: respObj.error
                        });
                        return;
                    }
                    errorCb({
                        title: 'Unknown Error',
                        message: 'Please try again'
                    })
                })
        }
        )
        .catch(err => {
            console.log(err);
            errorCb({
                title: 'Unexpected',
                message: 'Please try again'
            })
        })
};

let logout;
export const setLogout = (l) => {
    logout = l
};
export { logout };