(function() {
    var cli, err, pkg, program;
    program = require("commander");
    pkg = require("../package.json");
    cli = require("./cli");
    program.version(pkg.version)
           .option("-c, --create [create]", "set name of the component to be created.");
    program.on(("--help" || "-h"), function() {
      console.log("Examples:");
      console.log("");
      console.log(" $ " + "cli" + " -create myFirstComponent");
    });

    program.parse(process.argv);
    var action = program.rawArgs[2];
    if (process.argv.length === 4 && (action === '-c' || action === '--create')) {
      try {
        cli.create({
          path: program.rawArgs[1], //path to ./bin/cli
          componentName: program.rawArgs[3] 
        });
      } catch (_error) {
        err = _error;
        console.log(err.toString());
      }
    } else {
      program.help();
    } 
    }).call(this);