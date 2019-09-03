const path = require("path");
const fs = require("mz/fs");
const parseArgs = require("minimist");
const parser = require("./parser");
const genQService = require("./genQService");

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  if (!args._.length) {
    console.log("must specify an input file");
    return;
  }

  // Prepare file names
  const inputFilename = path.resolve(args._[0]);
  const extname = path.extname(inputFilename);
  if (extname !== ".q") {
    console.log("input filename must have .q extension");
    return;
  }
  const dirname = path.dirname(inputFilename);
  const astFilename = path.join(
    dirname,
    path.basename(inputFilename, ".q") + ".ast"
  );
  const gqlFilename = path.join(
    dirname,
    path.basename(astFilename, ".ast") + ".gql"
  );

  // Read input file
  const input = (await fs.readFile(inputFilename)).toString();

  // Parse (i.e., generate an AST)
  const parseResults = await parser.parse(input);
  const ast = parseResults[0];
  console.log("ast", JSON.stringify(ast, null, 2));

  // Persist the AST
  await fs.writeFile(astFilename, JSON.stringify(ast, null, 2));

  // Generate Q service request (GraphQL)
  const gql = await genQService.generate(ast);

  // Persist the GraphQL
  await fs.writeFile(gqlFilename, gql);
};

main();
