import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

export default {
  write: (text) => {
    clear();
    console.log(
    chalk.yellow(
        figlet.textSync(text, { horizontalLayout: 'full' })
    )
    );
  },
};