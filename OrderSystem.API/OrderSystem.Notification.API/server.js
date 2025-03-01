const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const WebSocket = require('ws');
const http = require('http');

const PROTO_PATH = './order.proto';

// Carrega o proto corretamente
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const OrdergRPCService = protoDescriptor.OrdergRPCService;

// Lista de clientes WebSocket conectados
const clients = new Set();

// Implementação do serviço gRPC
function enviarPedido(call, callback) {
  const req = call.request;
  console.log("Novo pedido recebido:", req);
  
  // Mensagem de notificação WebSocket
  const message = JSON.stringify({
    type: "NEW_ORDER",
    orderId: req.id,
    value: req.value,
    description: req.description,
    status: req.status,
    message: "Novo pedido recebido!"
  });

  // Enviar para todos os clientes WebSocket conectados
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  // Responder para o cliente gRPC (C#)
  callback(null, { success: true, message: "Pedido recebido com sucesso!" });
}

// Criando o servidor HTTP para WebSockets
const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });

// Gerenciar conexões WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Cliente WebSocket desconectado");
  });
});

// Criando um servidor gRPC apenas com HTTP/2
function main() {
  const grpcServer = new grpc.Server();
  grpcServer.addService(OrdergRPCService.service, { SendOrder: enviarPedido });

  grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Erro ao iniciar o servidor gRPC:", err);
      return;
    }
    console.log(`Servidor gRPC rodando em HTTP/2 na porta ${port}`);
    grpcServer.start();
  });

  // Iniciar o servidor HTTP (WebSocket) na porta 8080
  httpServer.listen(3000, "0.0.0.0", () => {
    console.log("Servidor WebSocket rodando na porta 8080");
  });
}

main();
