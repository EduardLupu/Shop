export default function checkUserToken() {
    const token = localStorage.getItem('token');
    if (localStorage.getItem('date')) {
        if (Date.now() - localStorage.getItem('date') > 2 * 60 * 59 * 1000) {
            localStorage.clear();
            window.location.reload();
            return false;
        }
    }
    if (token) {
        return true;
    }
    return false;
}