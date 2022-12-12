function parse(args, argsWithValues = []) {
    const temp = [];
  
    if (args.length > 0) {
      args.map(item=>{
          temp.push({KEY:item.replace('--','').split('=')[0], VALUE:item.replace('--','').split('=')[1]})
      })
    }
  
    return temp;
  }
  
  export default {parse};
  