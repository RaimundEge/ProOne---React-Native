import {decode as atob, encode as btoa} from 'base-64';

// const URL = 'http://blitz.cs.niu.edu:2500/api/users/';
const URL = 'http://blitz.cs.niu.edu/UserRest/api/users/';
const secret = btoa('admin:secret');

let message = '';
let user = '';
let errMsg = '';

function setUser(u) {
    user = u;
}
function setMessage(m) {
    message = m;
}
function getMessage() {
 //   console.log('getMessage: ' + message);
    let tmp = message;
    message = '';
    return tmp;
}
function setError(e) {
    errMsg = e;
}
export { URL, secret, user, setUser, getMessage, setMessage, errMsg, setError };