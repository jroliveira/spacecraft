define([
    'exports',
    'fs',
    'express',
    'module',
    'path'
], function (
    exports,
    fs,
    express,
    module,
    path
) {
    
    var dirname = path.dirname(module.uri);
    var path = path.join(dirname, '/../../../client/img/');
        
    exports.base64 = function (req, res) {
        var imagePath = path + req.params.image.replace('_', '/');
        
        fs.readFile(imagePath, 'binary', function(err, data){
            if (err) {
                res.json(500, { error: err });
                console.log(err);
            } else {
                var base64Image = new Buffer(data, 'binary').toString('base64');
                
                res.json(200, { base64 : base64Image });            
            }
        });
    };

});