from xmlrpc.server import SimpleXMLRPCServer
from app.payment import process_payment
import threading

def run_server():
    server = SimpleXMLRPCServer(("0.0.0.0", 8000), allow_none=True)
    server.register_function(process_payment, "ProcessPayment")
    
    print("Servidor XML-RPC de Pagamentos rodando na porta 8000...")
    server.serve_forever()