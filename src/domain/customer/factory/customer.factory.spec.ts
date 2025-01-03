import Address from "../value-objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });


    it("should create a customer with address", () => {
        const address = new Address("Street", 1, "123123", "São Paulo");
        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    });
});