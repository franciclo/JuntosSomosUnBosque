var isLoggedIn = require('../middleware').isLoggedIn;

module.exports = function(app, passport) {
    
    // =============================================================================
    // TWITTER =====================================================================
    // =============================================================================

    app.get('/auth/twitter', 
        passport.authenticate(
            'twitter', 
            { scope : 'email' }
        )
    );

    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    // new account --------------------------------

    app.get('/connect/twitter', 
        passport.authorize(
            'twitter', 
            { scope : 'email' }
        )
    );

    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    // unlink --------------------------------

    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            if(err)
                res.json({success:false});
            res.json({success:true});
        });
    });
};