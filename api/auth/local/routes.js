var isLoggedIn = require('../middleware').isLoggedIn;
var User = require('../../models/user');

module.exports = function(app, passport) {
    // =============================================================================
    // LOCAL =======================================================================
    // =============================================================================

    app.get('/signup', 
        passport.authenticate('local-signup', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    app.get('/login', 
        passport.authenticate('local-login', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    app.get('/forgot', function(res, req) {
        
    })


    // new account ----------------------------------
    
    app.get('/connect/local', 
        passport.authenticate('local-signup'), 
        function(req, res) { res.json({success:true}); }
    );

    // unlink -----------------------------------
    
    app.get('/unlink/local', isLoggedIn, 
        function(req, res) {
            var user            = req.user;
            user.local.email    = undefined;
            user.local.password = undefined;
            user.save(function(err) {
                if(err)
                    res.json({success:false});
                res.json({success:true});
            });
        }
    );
};