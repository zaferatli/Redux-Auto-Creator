import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import ModuleDir from './getModuleDir.js';

const __dirname = fs.realpathSync(ModuleDir.get('@zaferatli/ra'));
const get = () => {
    const dir = path.resolve(path.join('./', 'ra-redux'))
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    copy('actions.js')
    copy('reducer.js')
    copy('sagas.js')
};


const copy = (name) => {
    const dir = path.resolve(path.join('./', 'ra-redux'))
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.copyFile(__dirname+'/example/redux/'+name, './ra-redux/'+name, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    })
    
};
export default {get};