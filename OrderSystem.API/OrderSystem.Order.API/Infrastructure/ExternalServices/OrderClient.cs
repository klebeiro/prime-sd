using Grpc.Net.Client;
using SendOrderGRPC;

public class OrderClient
{
    // Função assíncrona para enviar o pedido via gRPC
    public async Task<OrderResponse> SendOrderAsync(int id, double valor, string descricao, string status)
    {
        // Permite conexões HTTP (sem SSL)
        var handler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
        };

        // Cria o canal de comunicação com o servidor gRPC (ajuste a URL e porta conforme necessário)
        using var channel = GrpcChannel.ForAddress("http://notification_api:50051", new GrpcChannelOptions { HttpHandler = handler });
        var client = new OrdergRPCService.OrdergRPCServiceClient(channel);

        // Cria a mensagem com os dados do pedido
        var request = new OrderRequest
        {
            Id = id,
            Value = valor,
            Description = descricao,
            Status = status
        };

        try
        {
            // Faz a chamada assíncrona ao método EnviarPedido
            var response = await client.SendOrderAsync(request);

            // Verifica a resposta
            return response;
        }
        catch (Exception ex)
        {
            return new OrderResponse { Success = false, Message = ex.Message };
        }
    }
}