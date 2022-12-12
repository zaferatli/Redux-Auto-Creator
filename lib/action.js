import inquirer from 'inquirer';

export default {
  askActionPath: () => {
    const questions = [
      {
        name: 'action',
        type: 'input',
        message: 'Enter you action folder path',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your action folder path';
          }
        }
      },
      {
        name: 'reducer',
        type: 'input',
        message: 'Enter you reducer folder path',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your reducer folder path';
          }
        }
      },
      {
        name: 'saga',
        type: 'input',
        message: 'Enter you saga folder path',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your saga folder path';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  getActionName: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Action ismini giriniz',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Lütfen action ismini giriniz';
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  },
  getReducerName: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Reducer ismini giriniz',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Lütfen Reducer ismini giriniz';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  getDataStatus: () => {
    const questions = [
      {
        name: 'data',
        type: 'input',
        message: 'İstek data alıyor mu? (default false)',
        default: false,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'true yada false olarak değer girin lütfen';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  getRequestType: () => {
    const questions = [
      {
        name: 'type',
        type: 'input',
        message: 'İstek get mi post mu? (Default get)',
        default: 'get',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'İstek tipini giriniz.';
          }
        }
      }
      // {
      //   name: 'password',
      //   type: 'password',
      //   message: 'Enter your password:',
      //   validate: function(value) {
      //     if (value.length) {
      //       return true;
      //     } else {
      //       return 'Please enter your password.';
      //     }
      //   }
      // }
    ];
    return inquirer.prompt(questions);
  },
};