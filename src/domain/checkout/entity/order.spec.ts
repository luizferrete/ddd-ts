import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", ()  => {
        expect(() => {
            new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", ()  => {
        expect(() => {
            new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when order has no itens", ()  => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrow("Items are required");
    });

    it("should calculate total of the order", ()  => {
        const item1 = new OrderItem("1", "Abc", 100, "p1", 2);
        const item2 = new OrderItem("2", "Panela", 200, "p2", 2);
        const order = new Order("123", "123", [item1]);
        expect(order.total()).toBe(200);

        const order2 = new Order("456", "567", [item1, item2]);
        expect(order2.total()).toBe(600);
    });


    it("should throw error if the item quantity is greater than 0", ()  => {
        expect(() => {
            const item1 = new OrderItem("1", "Abc", 100, "p1", 0);
            const order = new Order("123", "123", [item1]);
        }).toThrow("Quantity must be greater than 0");
    });
});