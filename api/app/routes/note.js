const { noteAPI } = require('../api'),
    path = require('path'),
    { wrapAsync, auth } = require('../infra')

module.exports = app => {

    app.route('/:userName/notes')
        .get(wrapAsync(noteAPI.list));
    
    app.route('/notes/upload')
        .post(auth, app.get('upload').single('imageFile'), wrapAsync(noteAPI.addUpload))

    app.route('/notes/:noteId')
        .post(auth, wrapAsync(noteAPI.add))
        .delete(auth, wrapAsync(noteAPI.remove))
        .get(wrapAsync(noteAPI.findById));

   
    app.route('/notes/:noteId/like')
        .post(auth, wrapAsync(noteAPI.like));
};