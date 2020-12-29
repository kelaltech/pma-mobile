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