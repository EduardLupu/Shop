export default function checkUserToken() {
    const userToken = localStorage.getItem('user-token');
    if (userToken && userToken !== 'undefined' && userToken.length === 68) {
        return true;
    }
    return false;
}