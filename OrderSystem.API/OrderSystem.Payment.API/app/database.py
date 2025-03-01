from sqlalchemy import create_engine, Column, Integer, String, DECIMAL, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

# Obtendo configurações do ambiente (importante para Docker)
POSTGRES_USER = os.getenv("POSTGRES_USER", "prime")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "prime")
POSTGRES_DB = os.getenv("POSTGRES_DB", "order_system") 
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "postgres")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

# Criando a URL do banco de dados
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Criando o engine e a sessão do SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Order(Base):
    __tablename__ = "Orders"  

    id = Column("Id", Integer, primary_key=True, index=True)  
    price = Column("Price", Integer, nullable=False)
    description = Column("Description", String, nullable=False) 
    status = Column("Status", String, default="Aguardando pagamento", nullable=False)  
    user_id = Column("UserId", Integer, ForeignKey("Users.Id"), nullable=False) 

    User = relationship("User", back_populates="Orders")

    def __init__(self, price, description, user_id, status="Aguardando pagamento"):
        self.price = price
        self.description = description
        self.user_id = user_id
        self.status = status


class User(Base):
    __tablename__ = "Users"  

    id = Column("Id", Integer, primary_key=True, index=True)  
    name = Column("Name", String, nullable=False)  
    email = Column("Email", String, unique=True, nullable=False)
    password = Column("Password", String, nullable=False)

    Orders = relationship("Order", back_populates="User")  

    def __init__(self, name, Email, password):
        self.name = name
        self.email = email
        self.password = password

# Função para criar tabelas automaticamente no banco
def init_db():
    Base.metadata.create_all(bind=engine)

# Executa a criação das tabelas
init_db()
