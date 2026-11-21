from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
server = ThreadingHTTPServer(('0.0.0.0', 3000), SimpleHTTPRequestHandler)
print("Server running on http://localhost:3000", flush=True)
server.serve_forever()
