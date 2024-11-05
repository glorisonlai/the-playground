from . import db

class BooksModel(db.Model):
    __tablename__ = 'books'

    name = db.Column(db.String(), primary_key=True)
    preview = db.Column(db.String())
    tags = db.relationship('tags', backref = 'books', lazy = 'dynamic')

    def __init__(self, name, preview):
        self.name = name
        self.preview = preview

    def __repr__(self):
        return f'<id {self.name}>'

class TagsModel(db.Model):
    __tablename__ = 'tags'

    name = db.Column(db.String(), db.ForeignKey('books.name'), primary_key=True)
    tag = db.Column(db.String(), primary_key=True)

    def __repr__(self):
        return f'<Tag {self.tag}>'


