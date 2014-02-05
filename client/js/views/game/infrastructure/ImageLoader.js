define([
    'jquery'
], function (
    $
) {
    
    var images = {};
        
    return {
        
        load: function (image, onsuccess) {
            var defer = $.Deferred();
            
            if (images[image]) {
                onsuccess(images[image]);
                
                defer.resolve();
            } else {
                $.ajax({
                    cache: false,
                    type: 'GET',
                    url: '/api/images/' + image,
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (data) {
                        images[image] = 'data:image/png;base64,' + data.base64;
                        
                        onsuccess(images[image]);
                        
                        defer.resolve();
                    },
                    error: function (err) {
                        console.log('Error occurred while loading the image. ' + err);
                        
                        defer.resolve();
                    }
                });
            }
            
            return defer.promise();
        }
           
    };

});