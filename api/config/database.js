const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = 
`
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'marcelo', 'marcelo@martche.com.br', '123456', 'Marcelo' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'marcelo')
`;

const NOTE_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS note (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_post_date TIMESTAMP NOT NULL, 
    note_url TEXT NOT NULL, 
    note_description TEXT DEFAULT ('') NOT NULL, 
    note_allow_comments INTEGER NOT NULL DEFAULT (1), 
    note_likes BIGINT NOT NULL DEFAULT (0),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

const COMMENT_SCHEMA =
`
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP NOT NULL,
    comment_text TEXT  DEFAULT (''),
    note_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (note_id) REFERENCES note (note_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    note_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, note_id ),
    FOREIGN KEY (note_id) REFERENCES note (note_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(INSERT_DEFAULT_USER_1);
    db.run(NOTE_SCHEMA);        
    db.run(COMMENT_SCHEMA);     
    db.run(LIKE_SCHEMA);        

    db.each("SELECT * FROM user", (err, user) => {
        console.log('Users');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;