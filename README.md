# SendIt

SendIt is JS library make the use of js build-in function fetch easier.

## Getting started

## Creating an instance of SendIt

```js
let sendit = new SendIt({
    shouldCache: true
})
```

### Parameter

|name|type|default|description|
|---|---|---|---|
|shouldCache|Boolean|false|If true caching is enabled|

## SendIt.get()

```js
sendit.get('/path', {}, 'text');
```

Assuming you are following along the code snippets, the snippet above performs a get-request
to the given route.

### Parameter

|name|type|default|description|
|---|---|---|---|
|path|String|''|Specifies the path the request goes to. Cannot be empty|
|params|Object|{}|Specifies the URL parameters in key value pairs. The querystring is built automatically.|
|type|String|'json'|Specifies the type of response you are awaiting and parses it accordingly.|

### Return values

|name|type|values|description|
|---|---|---|---|
|status|String|'ok', 'failed'|Gives information about wether an error occured or not.|
|error|Object|~|Contains a error code and a descrption of the error that occured.|
|response|Object or Text|~|Contains the parsed response body.|

```js
let { status, error, response } = sendit.get('/path', {}, 'text');
```

You can use object deconstructuring to get the single values.

{
    
}