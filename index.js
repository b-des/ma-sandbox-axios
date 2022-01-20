const axiosWrapper = require('./axios-wrapper');

//https://jsonplaceholder.typicode.com/posts/1
//http://google.com/not_exist
//https://www.appsloveworld.com/sample-rest-api-url-for-testing-with-authentication/
//https://dummyapi.io/
const config = {
    baseURL: 'https://dummyapi.io/',
    retries: 3,
    delayBetweenRetries: 1000,
    timeout: 10000
}
axiosWrapper(config).get('/posts/1').then(response => {
    console.log(response.status);
}).catch(error => {
    console.error(error);
});