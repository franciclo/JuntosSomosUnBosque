var isLoggedIn = require('../middleware').isLoggedIn;

module.exports = function(app, passport) {
    
    // =============================================================================
    // GOOGLE ======================================================================
    // =============================================================================

    app.get('/auth/google', 
        passport.authenticate(
            'google', 
            { scope : ['profile', 'email']}
        )
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    // new account ---------------------------------

    app.get('/connect/google', 
        passport.authorize(
            'google', 
            { scope : ['profile', 'email'] }
        )
    );

    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );

    // unlink ---------------------------------

    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            if(err)
                res.json({success:false});
            res.json({success:true});
        });
    });
};