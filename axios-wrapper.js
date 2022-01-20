const axios = require('axios').default;


const wrapAxios = (axiosConfig) => {
    let retriesCounter = 0;
    const instance = axios.create({
        ...axiosConfig,
        validateStatus: status => {
            return status < 400;
        }
    });

    const retryRequest = (originalConfig) => {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {resolve(instance(originalConfig))}, axiosConfig.delayBetweenRetries || 1000);
        }))
    }

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {

        const {response, config} = error;
        const endpoint = axiosConfig.baseURL + config.url;
        console.log(`AXIOS: failed to perform request, retry attempt: ${retriesCounter + 1}, error: ${error.message}, url: ${endpoint}`);
        if(++retriesCounter < axiosConfig.retries && (!response || response.status === 404)){
            return retryRequest(config);
        }
        return Promise.reject(error);
    });

    return instance;
}

module.exports = wrapAxios;