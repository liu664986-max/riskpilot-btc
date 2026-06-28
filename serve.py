#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class LocalServer(ThreadingHTTPServer):
    def server_bind(self):
        self.socket.bind(self.server_address)
        self.server_name = self.server_address[0]
        self.server_port = self.server_address[1]


def main():
    server = LocalServer(("0.0.0.0", 8080), SimpleHTTPRequestHandler)
    print("Serving RiskPilot BTC at http://127.0.0.1:8080")
    server.serve_forever()


if __name__ == "__main__":
    main()
