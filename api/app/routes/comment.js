const { commentAPI } = require('../api'),
    path = require('path'),
    { wrapAsync, auth } = require('../infra')

module.exports = app => {

    app.route('/notes/:noteId/comments')
        .get(wrapAsync(commentAPI.listAllFromNote))
        .post(auth, wrapAsync(commentAPI.add));
};