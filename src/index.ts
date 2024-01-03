import cac from 'cac';
import { autoCodeView } from './autoCodeView';

export { autoCodeView };

const pkg = require('../package.json');
const cli = cac();

cli
  .command('cr <prNumber>', 'Code Review a pull request.')
  .option('--zhinang-token <string>', 'Choose a zhinang token')
  .option('--github-token <string>', 'Choose a github token')
  .option('--owner <string>', 'Choose a owner')
  .option('--repo <string>', 'Choose a repo')
  .action(async (prNumber, options) => {
    const prUrl = `https://github.com/${options.owner}/${options.repo}/pull/${prNumber}`;
    console.log('prUrl: ', prUrl);

    if (prNumber) {
      process.env.PR_NUMBER = prNumber;
    }

    if (options.zhinangToken) {
      process.env.ZHINANG_TOKEN = options.zhinangToken;
    }

    if (options.owner) {
      process.env.OWNER = options.owner;
    }

    if (options.repo) {
      process.env.REPO = options.repo;
    }

    try {
      await autoCodeView(prNumber);
    } catch (error) {
      console.error('autoCodeView error: ', error);
    }
  });

cli.help();
cli.version(pkg.version);
cli.parse();

// const parsed = cli.parse();
// console.log(JSON.stringify(parsed, null, 2));
