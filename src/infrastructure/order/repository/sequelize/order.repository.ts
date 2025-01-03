import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        }))
      },
      {
        include: [{model: OrderItemModel}],
      }
    );
  }
  
  async update(entity: Order): Promise<void> {
    
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );


    for(const item of entity.items) {
      await OrderItemModel.upsert({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity
      });
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItens: OrderItem[] = [];
    orderModel?.items.forEach(item => {
      const orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      orderItens.push(orderItem);
    })

    const order = new Order(id, orderModel.customer_id, orderItens);
    
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    const orders: Order[] = orderModels.map((orderModel) => {
      const orderItens = orderModel.items?.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
      const order= new Order(orderModel.id, orderModel.customer_id, orderItens);

      return order;
    });

    return orders;
  }
  
}