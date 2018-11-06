const shortner = require('../../shortner');
const fs = require('fs')
const get_all_urls = [];


module.exports = function(app, passport){  
    app.get('/:shortcode', (req, res) => {
        // console.log(req.params.shortcode);
        let URL = shortner.expand(req.params.shortcode);
        res.redirect(URL);    
    });

    app.post('/shorten', function (req, res) {
        let url = req.body.url;
        let shortcode = shortner.shorten(url);
    
        /* As we are not using any database, it is good to persist the data in a file and read it when necessary */
        // fs.appendFile("urls.txt", '\n'+ shortcode, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // }); 
        get_all_urls.push(shortcode);
    })

    
    app.get("/url/all", function(req,res){
        console.log("Get All url");
        // fs.readFile('urls.txt',  "utf8",  function(err, data) {
        //     // console.log(get_all_urls);
        //     if(data){
        //         return res.send(data.split('\n').filter(v=>v!=''));
        //     }
        // });
        return res.send(get_all_urls);
    });

    app.delete("/delete/:url", function(req,res){

        // fs.readFile('urls.txt',  "utf8",  function(err, data) {
        //     if(data){
        //         array = data.split('\n').filter(v=>v!='');
        //         console.log(data, 'kkk');
        //         var search_term = req.body.url;
                
        //         for (var i = 0; i < array.length; i++) {
        //             if (array[i] === search_term) {
        //                 array.splice(i, 1);
                    
        //                 fs.writeFile('urls.txt',  array.join("\n"), function(){
        //                     console.log('done');
        //                 });
        //                 // array.join('\n');
        //             }
        //         }
                
        //         console.log(array, 'hi');
        //         return res.send(array);
        //     }
        // });

        console.log("deleting a url");
        var fullUrl = req.protocol + '://' + req.get('host') + '/'+ get_all_urls[0];
        console.log(get_all_urls);
        var array = get_all_urls; 
        var search_term = req.body.url;
         for (var i=array.length-1; i>=0; i--) {
            if (array[i] === search_term) {
                array.splice(i, 1);
            }
        }
        return res.send(array);
    });
};  

