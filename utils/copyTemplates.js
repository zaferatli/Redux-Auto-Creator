import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import ModuleDir from './getModuleDir.js';

const __dirname = fs.realpathSync(ModuleDir.get('@zaferatli/ra'));
const get = () => {
    const dir = path.resolve(path.join('./', 'ra-template'))
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    copy('action.hbs')
    copy('reducer.hbs')
    copy('reducerDataless.hbs')
    copy('reducerState.hbs')
    copy('reducerStateDataless.hbs')
    copy('sagaDetail.hbs')
    copy('sagaDetailDataless.hbs')
    copy('sagaHeader.hbs')
};


const copy = (name) => {
    const dir = path.resolve(path.join('./', 'ra-template'))
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.copyFile(__dirname+'/template/'+name, './ra-template/'+name, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    })
    
};
export default {get};