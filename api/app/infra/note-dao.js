const noteConverter = row => ({
    id: row.note_id,
    postDate: new Date(row.note_post_date),
    url: row.note_url,
    description: row.note_description,
    allowComments: row.note_allow_comments == 'true' ? true : false,
    likes: row.likes,
    comments: row.comments,
    userId: row.user_id,
});

const commentConverter = row => ({
    date: row.comment_date,
    text: row.comment_text,
    userName: row.user_name
})

const maxRows = 12;

class NoteDao {

    constructor(db) {
        this._db = db;
    }

    listAllFromUser(userName, page) {

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  p.*,
                        (SELECT COUNT(c.comment_id) 
                            FROM comment as c 
                            WHERE c.note_id = p.note_id
                         ) as comments, 

                        (SELECT COUNT(l.like_id) 
                            FROM like as l 
                            WHERE l.note_id = p.note_id
                        ) as likes 
                FROM note AS p
                        JOIN
                        user AS u ON p.user_id = u.user_id
                WHERE u.user_name = ?
                ORDER BY p.note_post_date DESC
                ${limitQuery} ;
                `,
                [userName],
                (err, rows) => {
                    const notes = rows.map(noteConverter)
                    if (err) {
                        console.log(err);
                        return reject('Can`t list notes');
                    }
                    console.log('notes retornadas');
                    resolve(notes);
                });
        });
    }

    add(note, user_id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO note (
                    note_post_date,
                    note_url,
                    note_description,
                    note_allow_comments,
                    user_id
                ) values (?,?,?,?,?)
            `,
                [
                    new Date(),
                    note.url,
                    note.description,
                    note.allowComments,
                    user_id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t add note');
                    }
                    resolve(this.lastID);
                });
        });
    }

    findById(id) {

        return new Promise((resolve, reject) => this._db.get(`
            SELECT  p.*, 
                    (SELECT COUNT(c.comment_id) 
                        FROM comment as c 
                        WHERE c.note_id = p.note_id
                    ) as comments, 
                    (SELECT COUNT(l.like_id) 
                        FROM like as l 
                        WHERE l.note_id = p.note_id
                    ) as likes 
            FROM note AS p
            WHERE p.note_id = ?
            ORDER BY p.note_post_date DESC;
            `,
            [id],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find note');
                }
                if (row) {
                    resolve(noteConverter(row));
                } else {
                    resolve(null);
                }
            }
        ));
    }

    remove(id) {
        return new Promise((resolve, reject) => this._db.run(
            `DELETE FROM note where note_id = ?`,
            [id],
            err => {
                if (err) {
                    console.log(err);
                    return reject('Can`t remove note');
                }
                resolve();
            }
        ));
    }

    addComment(text, noteId, userId) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                    INSERT INTO comment (
                        comment_date, 
                        comment_text, 
                        note_id,
                        user_id
                    ) values (?,?,?, ?)
                `,
                [
                    new Date(),
                    text,
                    noteId,
                    userId,
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t add comment');
                    }
                    resolve(this.lastID);
                });
        });
    }

    getCommentsFromNote(noteId) {

        return new Promise((resolve, reject) => {
            this._db.all(
                `
                SELECT 
                    c.comment_date, c.comment_text, u.user_name 
                FROM comment as c 
                    JOIN user as u ON u.user_id = c.user_id 
                WHERE c.note_id = ? 
                ORDER BY c.comment_date DESC  
                `,
                [noteId],
                (err, rows) => {

                    if (err) {
                        console.log(err);
                        return reject('Can`t load comments');
                    }
                    const comments = rows.map(commentConverter);
                    return resolve(comments);
                }
            );

        });
    }

    findCommentById(commentId) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                SELECT 
                    c.comment_date, c.comment_text, u.user_name 
                FROM comment as c 
                    JOIN user as u ON u.user_id = c.user_id 
                WHERE c.comment_id = ?
                `,
                [commentId],
                (err, row) => {
                    console.log(row);
                    if (err) {
                        console.log(err);
                        return reject('Can`t load comment');
                    }
                    return resolve(commentConverter(row));
                }
            );

        });
    }

    likeById(noteId, userId) {
        
        return new Promise((resolve, reject) => this._db.run(
            `
            INSERT OR IGNORE INTO like 
                (note_id, user_id) 
            VALUES 
                (?, ?) 
            `,
            [noteId, userId],
            function(err) {
                if (err) {
                    console.log(err);
                    return reject('Cant like note');
                }
                resolve(!!this.changes);
            }
        ));

    }
}

module.exports = NoteDao;