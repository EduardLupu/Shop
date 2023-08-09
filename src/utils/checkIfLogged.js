
function checkUserToken() {
    const userToken = localStorage.getItem('user-token');
    return !(!userToken || userToken === 'undefined');
}

export default checkUserToken;