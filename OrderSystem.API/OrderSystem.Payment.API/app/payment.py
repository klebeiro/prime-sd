import time
from app.database import SessionLocal, Order
import threading

def process_payment_in_thread(order_id):
    session = SessionLocal()
    order = session.query(Order).filter_by(id=order_id).first()

    if not order:
        print(f"Pedido com ID {order_id} não encontrado!")
        return

    print(f"Processando pagamento para Order ID: {order_id}...")
    time.sleep(20)  

    order.status = "Pagamento realizado com sucesso"
    session.commit()
    session.close()

    print(f"Pagamento concluído para Order ID {order_id}")

def process_payment(order_id):
    payment_thread = threading.Thread(target=process_payment_in_thread, args=(order_id,))
    payment_thread.start()