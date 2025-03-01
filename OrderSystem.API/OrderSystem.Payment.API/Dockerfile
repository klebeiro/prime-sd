FROM python:3.10
WORKDIR /app

# Copia o arquivo de dependências
COPY requirements.txt ./

# Garante que o pip está atualizado antes da instalação
RUN pip install --upgrade pip

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código-fonte
COPY . .

# Expõe a porta (caso seja necessário, se sua aplicação rodar em um servidor)
EXPOSE 8000

# Comando para rodar o arquivo Python principal (main.py)
CMD ["python", "main.py"]