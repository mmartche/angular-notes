const { NoteDao, UserDao } = require('../infra')
    , jimp = require('jimp')
    , path = require('path')
    , fs = require('fs')
    , unlink = require('util').promisify(fs.unlink);

const api = {}

const userCanDelete = user => note => note.userId == user.id;

const defaultExtension = '.jpg';

api.list = async (req, res) => {
    console.log('####################################');
    const { userName } = req.params;
    const { page } = req.query;
    const user = await new UserDao(req.db).findByName(userName);
    if(user) {
        console.log(`Listing notes`);
        const notes = await new NoteDao(req.db)
            .listAllFromUser(userName, page);
        res.json(notes);
    } else {
        res.status(404).json({ message: 'User not found'});
    }
    
}

api.add = async (req, res) => {
    console.log('####################################');
    console.log('Received JSON data', req.body);
    const note = req.body;
    note.file = '';
    const id = await new NoteDao(req.db).add(note, req.user.id);
    res.json(id);
};

api.addUpload = async (req, res) => {

        console.log('upload complete');
        console.log('Note data', req.body);
        console.log('File info', req.file);

        const image = await jimp.read(req.file.path);

        await image
            .cover(460, 460)
            .autocrop()
            .write(req.file.path);  
                
        const note = req.body;
        note.url = path.basename(req.file.path);
        await new NoteDao(req.db).add(note, req.user.id);
        res.status(200).end();       
};

api.findById = async (req, res) => {
    const { noteId } = req.params;
    console.log('####################################');
    console.log(`Finding note for ID ${noteId}`)
    const note = await new NoteDao(req.db).findById(noteId);
    if(note) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note does not exist'})
    }  
};

api.remove = async (req, res) => {
    const user = req.user;
    const { noteId } = req.params;
    const dao = new NoteDao(req.db);
    const note = await dao.findById(noteId);
    if(!note) {
        const message = 'Note does not exist';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanDelete(user)(note)) {
        await dao.remove(noteId)
        console.log(`Note ${noteId} deleted!`);
        res.status(200).end();
    } else {
        console.log(`
            Forbiden operation. User ${user.id} 
            can delete note from user ${note.userId}
        `);
        res.status(403).json({ message: 'Forbidden'});
    }
};

api.like = async (req, res) => {
    const { noteId } = req.params;
    const dao = new NoteDao(req.db);
    const liked = await dao.likeById(noteId, req.user.id);
    if(liked) {
        console.log(`User ${req.user.name} liked note ${noteId}`);
        return res.status(201).end();
    }
    return res.status(304).end();
};

module.exports = api;