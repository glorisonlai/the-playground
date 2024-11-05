import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    secret_key_ = os.environ['FLASK_SECRET']
    secret_key = secret_key_ if secret_key_ else 'dev'
    db_host_ = os.environ['DB_HOST']
    db_host = db_host_ if db_host_ else 'localhost'

    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = secret_key
    SQLALCHEMY_DATABASE_URI = db_host


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True

