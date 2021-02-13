export class SendIt {
    constructor(options = {}) {
        this.shouldCache = options.shouldCache ? options.shouldCache : false;
        this.cache = {};
    }

    async get(path = '', params = {}, headers = {}, type = 'json') {
        if(path === '' || typeof path !== 'string') return new Error('Path cannot be empty xor must be type of string.');
        let queryString = this.#buildQueryString(params);
        // catch if user is offline
        if(!navigator.onLine) {
            if(this.shouldCache) {
                if(this.cache[path + queryString]) {
                    return [
                        'failed',
                        {
                            code: '',
                            description: 'Could not fetch. Device is not online. Please check the internet connection.'
                        },
                        this.cache[path + queryString]
                    ]
                } else {
                    return [
                        'failed',
                        { code: '', description: `Could not fetch. Device is not online. Please check the internet conncetion. No data in cache for route: ${path} with parameters: ${queryString}` },
                        {}
                    ]
                }
            } else {
                return [
                    'failed',
                    {
                        code: '',
                        description: 'Could not fetch. Device is not online. Please check the internet connection.'
                    },
                    {}
                ]
            }
        };
        //fetch
        let parsedBody;
        let response = await fetch(path + queryString, { method: 'get', headers: headers })
            .then(async (response) => {
                switch(type) {
                    case 'json':
                        parsedBody = await response.json();
                        if(this.shouldCache) this.cache[path + queryString] = parsedBody;
                        return [
                            'ok',
                            {},
                            parsedBody
                        ]
                    case 'text':
                        parsedBody = await response.text();
                        if(this.shouldCache) this.cache[path + queryString] = parsedBody;
                        return  [
                            'ok',
                            {},
                            parsedBody
                        ]
                    default:
                        parsedBody = await response.json();
                        if(this.shouldCache) this.cache[path + queryString] = parsedBody;
                        return  [
                            'ok',
                            {},
                            parsedBody
                        ]
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

    async post(path = '', body = {}, headers = {}, type = 'json') {
        if(path === '' || typeof path !== 'string') return new Error('Path cannot be empty xor must be type of string.');
        if(typeof body !== 'object') return new Error(`Typeof body must be object, got ${typeof object} instead.`);
        if(!navigator.onLine) {
            return {
                status: 'failed',
                error: {
                    code: '',
                    description: 'Could not fetch. Device is not online. Please check the internet connection.'
                },
                response: {}
            }
        }

        let response = await fetch(path, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(async (response) => {
                switch(type) {
                    case 'json':
                        return [
                            'ok',
                            {},
                            await response.json()
                        ]
                    case 'text':
                        return [
                            'ok',
                            {},
                            await response.text()
                        ]
                    default:
                        return [
                            'ok',
                            {},
                            await response.json()
                        ]
                }
            })
            .catch((error) => {
                return [
                    'ok',
                    {
                        code: '',
                        description: 'Fetch could not be completed. Server did not respond.'
                    },
                    {}
                ]
                return {
                    status: 'failed',
                    error: {
                        code: '',
                        description: 'Fetch could not be completed. Server did not respond.'
                    },
                    response: {}
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