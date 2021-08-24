const { CommentDao, NoteDao } = require('../infra');

const userCanComment = userId => note => 
    note.allowComments || note.userId === userId;

const api = {};

api.add = async (req, res) => {
    
    const { noteId } = req.params;
    const { commentText } = req.body;

    const commentDao = new CommentDao(req.db);
    const noteDao = new NoteDao(req.db);

    const note = await noteDao.findById(noteId);
    const canComment = userCanComment(req.user.id)(note);
    
    if(canComment) {
        const commentId = await commentDao.add(commentText, note.id, req.user.id);
        const comment = await commentDao.findById(commentId);
        console.log(`Comment added`, comment);
        res.json(comment);
    } else {
        res.status(403).json({ message: 'Forbiden'});
    }
};

api.listAllFromNote = async (req, res) => {

    const { noteId } = req.params;
    console.log(`Get comments from note ${noteId}`);
    const comments = await new CommentDao(req.db).listAllFromNote(noteId);
    res.json(comments);
}

module.exports = api;