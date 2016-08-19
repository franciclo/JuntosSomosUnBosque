var isLoggedIn = require('../middleware').isLoggedIn;

module.exports = function(app, passport) {
    
    // =============================================================================
    // FACEBOOK ====================================================================
    // =============================================================================

    app.get('/auth/facebook', 
        passport.authenticate(
            'facebook', 
            { scope : 'email' }
        )
    );

    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    // new account -------------------------------

    app.get('/connect/facebook', 
        passport.authorize(
            'facebook', 
            { scope : 'email' }
        )
    );

    app.get('/connect/facebook/callback', 
        passport.authorize('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    // unlink -------------------------------

    app.get('/unlink/facebook', isLoggedIn, 
        function(req, res) {
            var user            = req.user;
            user.facebook.token = undefined;
            user.save(function(err) {
                if(err)
                    res.json({success:false});
                res.json({success:true});
            });
        }
    );
    
};