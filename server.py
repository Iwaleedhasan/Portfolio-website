from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
server = ThreadingHTTPServer(('127.0.0.1', 3000), SimpleHTTPRequestHandler)
print("Server running on http://127.0.0.1:3000", flush=True)
server.serve_forever()
