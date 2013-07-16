module.exports = function(app, config) {

    require('./api.js')(app, config);

    app.get('/', function(req, res){
        res.render('pyos', {
            title : 'Woofeque'
        });
    });


}