var fs = require('fs');

function createFile(pathToCli, pathToComponent, componentName) {
    fs.readFile((pathToCli).replace(/\\/g, '/'), function(err, data) {      
        if (err) throw err;
        fs.writeFile(pathToComponent,
        data.toString().replace(/\[name\]/g, componentName), function (err, file) {
            if (err) throw err;
        });
    });
}

(function() {
    exports.create = create = function(options) {
        var dir = './' + options.componentName; //относительный путь до новой папки компонента
        var path = options.path.split('bin')[0] + '\src'; //абсолютный путь до src
        if (options && options.componentName && typeof options.componentName  ===  'string') {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);

                createFile(path + '\\jsx_templ.txt', dir + '/' + options.componentName + '.jsx', options.componentName);
                createFile(path + '\\css_templ.txt', dir + '/' + options.componentName + '.css', options.componentName);
                createFile(path + '\\package_templ.txt', dir + '/package.json', options.componentName);
            }
            else {
                console.log('Component with this name is already exist!');
            }
        } else {
            throw new Error('No component name defined!');
        }
    };
    }).call(this);