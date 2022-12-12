#!/usr/bin/env node
import fs from 'fs';
import Configstore from 'configstore';
import Action from './lib/action.js'
import Chalk from './lib/chalk.js'
import Handlebars from 'handlebars'
import ModuleDir from './utils/getModuleDir.js';
import CopyTemplate from './utils/copyTemplates.js';
import CopyExample from './utils/copyExample.js';
import removeOptionsFromArgs from './utils/getParameters.js';
import path from 'path';

const ROOT_DIR = process.cwd();
const [, , ...args] = process.argv;
const cliParameters = removeOptionsFromArgs.parse(args);

const __dirname = fs.realpathSync(ModuleDir.get('@zaferatli/ra'));

const confinJson = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf8'));
const config = new Configstore(confinJson.name);

const resetStatus = cliParameters.filter(item=>item.KEY=='resetPath');
const actionNameParameter = cliParameters.filter(item=>item.KEY=='actionName');
const dataStatusParameter = cliParameters.filter(item=>item.KEY=='dataStatus');
const requestTypeParameter = cliParameters.filter(item=>item.KEY=='requestType');
const reducerStateLocator = cliParameters.filter(item=>item.KEY=='reducerStateLocator')[0] ? cliParameters.filter(item=>item.KEY=='reducerStateLocator')[0].VALUE : '//end' ;
const reducerLocator = cliParameters.filter(item=>item.KEY=='reducerLocator')[0] ? cliParameters.filter(item=>item.KEY=='reducerLocator')[0].VALUE : 'default:' ;
const sagaHeaderLocator = cliParameters.filter(item=>item.KEY=='sagaHeaderLocator')[0] ? cliParameters.filter(item=>item.KEY=='sagaHeaderLocator')[0].VALUE : 'function* handler() {' ;
const sagaLocator = cliParameters.filter(item=>item.KEY=='sagaLocator')[0] ? cliParameters.filter(item=>item.KEY=='sagaLocator')[0].VALUE : 'export {handler};' ;
const createTemplateLocal = cliParameters.filter(item=>item.KEY=='createTemplateLocal');
const clearAllState = cliParameters.filter(item=>item.KEY=='clearAllState');
const createExample = cliParameters.filter(item=>item.KEY=='createExample');

if(clearAllState[0]){
  config.clear()
}

if(createExample[0]){
 await CopyExample.get()
 config.set('sagaFolderPath', './ra-redux/sagas.js');
 config.set('reducerFolderPath', './ra-redux/reducer.js');
 config.set('actionFolderPath', './ra-redux/actions.js');
}

if(createTemplateLocal[0]){
  await CopyTemplate.get()
  config.set('localTemplate', 'true');
}

const fileBaseUrl = config.get('localTemplate') == 'true' ? './ra-template/' : __dirname+'/template/';


if(!config.get('reducerFolderPath') || resetStatus[0]){
  const getFolder = await Action.askActionPath();
  config.set('sagaFolderPath', getFolder.saga);
  config.set('reducerFolderPath', getFolder.reducer);
  config.set('actionFolderPath', getFolder.action);
}

let actionName = [];
if(actionNameParameter[0]){
  actionName['name'] = actionNameParameter[0].VALUE
}else {
  actionName = await Action.getActionName();
}

let getDataStatus = [];
if(dataStatusParameter[0]){
  getDataStatus['data'] = dataStatusParameter[0].VALUE
}else {
  getDataStatus = await Action.getDataStatus();
}

let getRequestType = [];
if(requestTypeParameter[0]){
  getRequestType['type'] = requestTypeParameter[0].VALUE
}else {
  getRequestType = await Action.getRequestType();
}


const addAction = async () => {
  if(config.get('actionFolderPath')){
    const templateFile = fs.readFileSync(`${fileBaseUrl}action.hbs`, {encoding: 'utf8'});
    const template = Handlebars.compile(templateFile.toString());
    const fileContent = template({actionName: actionName.name});
    fs.writeFile(config.get('actionFolderPath'), fileContent,  { flag: "a+" }, (err) => {
      if (err)
      console.log(err);
      else {
      console.log("Action başarıyla eklendi");
      }
    });
  }
};

addAction();



const addReducer = async () => {
  if(config.get('reducerFolderPath')){
    const templateFile = fs.readFileSync(getDataStatus.data!=='false' ? `${fileBaseUrl}reducer.hbs` : `${fileBaseUrl}reducerDataless.hbs` , {encoding: 'utf8'});
    const template = Handlebars.compile(templateFile.toString());
    const fileContent = template({actionName: actionName.name});
    const file = fs.readFileSync(config.get('reducerFolderPath'), {encoding: 'utf8'});
    let newFile = file.replace(reducerStateLocator,fileContent+'\n'+reducerStateLocator)
    fs.writeFile(config.get('reducerFolderPath'), newFile, (err) => {
      if (err)
      console.log(err);
      else {
      addReducerState()
      }
    });
  }
};

const addReducerState = async () => {
  if(config.get('reducerFolderPath')){
    const templateFile = fs.readFileSync(getDataStatus.data!=='false' ? `${fileBaseUrl}reducerState.hbs` : `${fileBaseUrl}reducerStateDataless.hbs`, {encoding: 'utf8'});
    const template = Handlebars.compile(templateFile.toString());
    const fileContent = template({actionName: actionName.name});
    const file = fs.readFileSync(config.get('reducerFolderPath'), {encoding: 'utf8'});
    let newFile = file.replace(reducerLocator,fileContent+'\n'+reducerLocator)
    fs.writeFile(config.get('reducerFolderPath'), newFile, (err) => {
      if (err)
      console.log(err);
      else {
      console.log("Reducer başarıyla eklendi");
      }
    });
  }
};



addReducer();


const addSaga = async () => {
  if(config.get('sagaFolderPath')){
    const templateFile = fs.readFileSync(`${fileBaseUrl}sagaHeader.hbs`, {encoding: 'utf8'});
    const template = Handlebars.compile(templateFile.toString());
    const fileContent = template({actionName: actionName.name});
    const file = fs.readFileSync(config.get('sagaFolderPath'), {encoding: 'utf8'});
    let newFile = file.replace(sagaHeaderLocator,sagaHeaderLocator+fileContent)
    fs.writeFile(config.get('sagaFolderPath'), newFile, (err) => {
      if (err)
      console.log(err);
      else {
        addSagaDetail()
      }
    });
  }
};

const addSagaDetail = async () => {
  if(config.get('sagaFolderPath')){
    const templateFile = fs.readFileSync(getDataStatus.data!=='false' ? `${fileBaseUrl}sagaDetail.hbs` : `${fileBaseUrl}sagaDetailDataless.hbs`, {encoding: 'utf8'});
    const template = Handlebars.compile(templateFile.toString());
    const fileContent = template({actionName: actionName.name, type: getRequestType.type});
    const file = fs.readFileSync(config.get('sagaFolderPath'), {encoding: 'utf8'});
    let newFile = file.replace(sagaLocator,fileContent+sagaLocator)
    fs.writeFile(config.get('sagaFolderPath'), newFile, (err) => {
      if (err)
      console.log(err);
      else {
        console.log("Saga başarıyla eklendi");
      }
    });
  }
};

addSaga()