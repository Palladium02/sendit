export class SendIt {
    constructor(options = {}) {
        this.shouldCache = options.shouldCache ? options.shouldCache : false;
        this.cache = {};
    }

    async get(path = '', params = {}, type = 'json') {
        if(path === '' || typeof path !== 'string') return new Error('Path cannot be empty xor must be type of string.');
        let queryString = this.#buildQueryString(params);
        // catch if user is offline
        if(!navigator.onLine) {
            if(this.shouldCache) {
                if(this.cache[path + queryString]) {
                    return {
                        status: 'failed',
                        error: {
                            code: '',
                            description: 'Could not fetch. Device is not online. Please check the internet connection.'
                        },
                        response: this.cache[path + queryString]
                    }
                } else {
                    return {
                        status: 'failed',
                        error: { code: '', description: `Could not fetch. Device is not online. Please check the internet conncetion. No data in cache for route: ${path} with parameters: ${queryString}` },
                        response: {}
                    }
                }
            } else {
                return {
                    status: 'failed',
                    error: {
                        code: '',
                        description: 'Could not fetch. Device is not online. Please check the internet connection.'
                    },
                    response: {}
                }
            }
        };
        //fetch
        let parsedBody;
        let response = await fetch(path + queryString)
            .then(async (response) => {
                switch(type) {
                    case 'json':
                        parsedBody = await response.json();
                        if(this.shouldCache) this.cache[path + queryString] = parsedBody;
                        return {
                            status: 'ok',
                            error: {},
                            response: parsedBody
                        }
                    case 'text':
                        parsedBody = await response.text();
                        if(this.shouldCache) this.cache[path + queryString] = parsedBody;
                        return {
                            status: 'ok',
                            error: {},
                            response: parsedBody
                        }
                    default:
                        parsedBody = await response.json();
                        if(this.shouldCache) this.cache[path + queryString] = parsedBody;
                        return {
                            status: 'ok',
                            error: {},
                            response: parsedBody
                        }
                }
            })
            .catch((error) => {
                if(error) {
                    return {
                        status: 'failed',
                        error: {
                            code: '',
                            description: 'Fetch could not be completed. Server did not respond.'
                        },
                        response: {}
                    }
                }
            });
        return response;
    }

    // ?param=value&antoherParam=anotherValue
    #buildQueryString(params) {
        if(typeof params !== 'object') return new TypeError(`Typeof params must be object, got ${typeof params}`);
        let pairs = [];
        let key;
        for(key in params) {
            let param = `${key.toString()}=${params[key]}`;
            pairs.push(param);
        }

        return `?${pairs.join('&')}`;
    }
}