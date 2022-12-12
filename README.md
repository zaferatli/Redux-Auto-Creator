
# Redux Creator Usage

We use this creator for add new request to action, reducer and saga files automatically.

## Installation

```
npm i @zaferatli/ra
```

After install Redux creator, you need add 

### Be sure of these before tart
Reducer.js

1)`//end` string on reducer end of the initialState array. [Example Image](https://imagedelivery.net/yl5R5Esago2X_W93mb7gzA/7ad9dca4-4553-465f-03d5-c5f93eea3800/public)

2)`default:` string on reducer end of the reducer part. [Example Image](https://imagedelivery.net/yl5R5Esago2X_W93mb7gzA/9d4c77da-ef85-42ae-a9f1-00be8b480f00/public)


Saga.js

1)`function* handler() {` string on saga function. [Example Image](https://imagedelivery.net/yl5R5Esago2X_W93mb7gzA/66e79b85-4882-4e49-43c0-74fde1c3f500/public)

2)`export {handler};` string on saga end function. [Example Image](https://imagedelivery.net/yl5R5Esago2X_W93mb7gzA/556074f2-84d3-4ca4-00d9-f33ad7ff4f00/public)




After these steps you can create request strings.


Get request for slider and response return data
```
npx @zaferatli/ra --actionName='GET_SLIDER' --dataStatus='true' --requestType='get'
```


Post request for edit user and response not return data
```
npx @zaferatli/ra --actionName='UPDATE_USER_PROFILE' --dataStatus='false' --requestType='post'

```
First time of use cli tools ask from you define path of Action, Reducer and Saga files location.

Example Folder Structure:
```
->my-awesome-project
    ->__tests__
    ->.bundle
    ->android
    ->app
        ->redux
            ->action.js
            ->reducer.js
            ->sagas.js
            ->store.js
    ->ios
    ->node_modules
    etc...
```
you need to defined like

```
./app/redux/action.js
./app/redux/reducer.js
./app/redux/sagas.js
```
as [Image](https://imagedelivery.net/yl5R5Esago2X_W93mb7gzA/4f620c28-81cf-472c-d53a-4edb2df5b100/public)

## How It Works?

This creator logic:

1) Create template string for Action, Reducer and Saga
2) Find locator string
    - Action
      + End of the page
    - Reducer
      + State part we need to add 
      ```
      //end
      ```
      so creator find //end string and change with template string + '//end' string.

      + Reducer part we use
      ```
      default:
      ```
      string, we find that string and we change template string + 'default:' string
    
    - Saga
      + Function defined part
      ```
      function* handler() {
      ```
      string, we find that string and change 'unction* handler() {' + sagaHeader template string 

      + Saga function part
      ```
      export {handler};
      ```
      string, we find that string and change sagaDetail template + 'export {handler};'  string 
      
    
    You can change this locator with parameters.

3) Rewrite file.


## Parameters

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `--actionName=`      | `string` | Action name of request, we use this keyword in action, reducer and saga |
| `--dataStatus==`      | `string` | If you get any data from request, you can set with 'true', default is 'false'. Reducer and saga will be changed |
| `--requestType==`      | `string` | Request type, 'get', 'post', 'put' etc. this will be add axios request type |
| `--createTemplateLocal`      | `string` | When you add this parameter, template files will be create in root dir as ra-template, you can edit templates. After you call this parameter again, files will be overwritted. |
| `--resetPath`      | `string` | RA cli need to define action, reducer and saga files locations. First of time use cli prompt ask to you define this folders. When you need to change that locations add this parameters and cli ask you again. |
| `--clearAllState`      | `string` | This parameter is clear all local config, createTemplateLocal, Files paths etc. everything will be reset  |
| `--reducerStateLocator=`      | `string` | Reducer state part locator, default is '//end' string. |
| `--reducerLocator=`      | `string` | Reducer part locator, default is 'default:' string. |
| `--sagaHeaderLocator=`      | `string` | Saga header locator, default is 'function* handler() {' string. |
| `--sagaLocator=`      | `string` | Saga function locator, default is 'export {handler};' string. |


## Templates

If you want to change Action, Reducer, Saga string template you can use 
```
npx @zaferatli/ra --actionName='UPDATE_USER_PROFILE' --dataStatus='false' --requestType='post' --createTemplateLocal

```
After this command, cli tool will be create ra-template folder on root directory. And you change change templates as you wish.

`--createTemplateLocal` 

Parameter overwrite ra-template folder. When you change ra-template/templates you shouldn't use this parameter again.


## Locators Change

This tools works with string replace logic. We give some flag locations, cli create template strings and replace flag locations strings.
Because of that, you may need to change locators. You can change like that.

### Actions

Cli tool add bottom of action.js file. So we don't use any locator on actions.

### Reducer

1) State Part

Default is
`//end`

if you wish to change

```
npx @zaferatli/ra --actionName='UPDATE_USER_PROFILE' --dataStatus='false' --requestType='post' --reducerStateLocator='//notToEndOfState'

```

2) Reducer Part

Default is
`default:`

if you wish to change

```
npx @zaferatli/ra --actionName='UPDATE_USER_PROFILE' --dataStatus='false' --requestType='post' --reducerLocator=' default : '

```

### Saga

1) Function Header Part

Default is
`function* handler() {`

if you wish to change

```
npx @zaferatli/ra --actionName='UPDATE_USER_PROFILE' --dataStatus='false' --requestType='post' --sagaHeaderLocator='function* notHandler(){'

```

2) Saga Function Part

Default is
`export {handler};`

if you wish to change

```
npx @zaferatli/ra --actionName='UPDATE_USER_PROFILE' --dataStatus='false' --requestType='post' --sagaLocator='export {handler};'

```


## Gif
![Example Gif](https://imagedelivery.net/yl5R5Esago2X_W93mb7gzA/f2c83203-2172-4033-ff06-90241c11a900/public)


## License

[MIT](https://choosealicense.com/licenses/mit/)


[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/zaferZ)
