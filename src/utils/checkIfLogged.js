export default function checkUserToken() {
    const token = sessionStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}