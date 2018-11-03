const shortner = require('../../shortner');
const get_all_urls = [];


module.exports = function(app, passport){  
    app.get('/:shortcode', (req, res) => {
        console.log(req.params.shortcode);
        let URL = shortner.expand(req.params.shortcode);
        res.redirect(URL);    
    });
    
    app.post('/shorten', function(req, res){
        let url = req.body.url;
        let shortcode = shortner.shorten(url);
        res.send(shortcode);       
        // var fullUrl = req.protocol + '://' + req.get('host') + '/'+ shortcode;
        get_all_urls.push(shortcode);
    });

    
    app.get("/url/all", function(req,res){
        console.log("Get All url");
        return res.send(get_all_urls);
    });

    app.delete("/delete/url", function(req,res){
        console.log("deleting a url");
        var fullUrl = req.protocol + '://' + req.get('host') + '/'+ get_all_urls[0];
        console.log(fullUrl);
        var array = get_all_urls; 
        var search_term = get_all_urls[0];

        for (var i=array.length-1; i>=0; i--) {
            if (array[i] === search_term) {
                array.splice(i, 1);
                // break;       //<-- Uncomment  if only the first term has to be removed
            }
        }
        return res.send(array);
    });
};  

