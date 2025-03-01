using System.Net;
using System.Text;
using System.Xml;

namespace OrderSystem.Order.API.Infrastructure.ExternalServices
{
    public class RpcClient
    {
        private readonly string _url;

        public RpcClient(string url)
        {
            _url = url;
        }

        // Chamada no padrão XML/HTTP para o server RPC que executa o método para atualizar status de pagamento
        public async Task Call(string method, params object[] parameters)
        {
            var xmlRequest = new XmlDocument();
            xmlRequest.LoadXml($"<?xml version='1.0'?>" +
                $"<methodCall><methodName>{method}</methodName><params>" +
                $"{string.Join("", Array.ConvertAll(parameters, p => $"<param><value><string>{p}</string></value></param>"))}" +
                $"</params></methodCall>");

            using var httpClient = new HttpClient();
            var content = new StringContent(xmlRequest.OuterXml, Encoding.UTF8, "text/xml");

            await httpClient.PostAsync(_url, content).ConfigureAwait(false);
        }
    }
}
