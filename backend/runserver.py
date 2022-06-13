from os import getenv
from RestAPI import app    # Imports the code from RestAPI/__init__.py


if __name__ == '__main__':
    HOST = getenv('SERVER_HOST', '0.0.0.0')

    try:
        PORT = int(getenv('SERVER_PORT', '3000'))
    except ValueError:
        PORT = 3000
    app.debug = True
    app.run(HOST, PORT)