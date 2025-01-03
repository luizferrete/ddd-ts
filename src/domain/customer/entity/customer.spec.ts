import Address from "../value-objects/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", ()  => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", ()  => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrow("Name is required");
    });

    it("should change name", ()  => {
        const customer = new Customer("1", "Luiz");
        customer.changeName("José");
        expect(customer.name).toBe("José");
    });

    it("should throw error when changed name to empty", ()  => {
        const customer = new Customer("1", "Luiz");
        
        expect(() => {
            customer.changeName("");
        }).toThrow("Name is required");
    });

    it("should activate customer", ()  => {
        const customer = new Customer("1", "Luiz");
        const address = new Address("Rua x", 123, "995646", "sarandi");
        customer.Address = address;

        customer.activate();
        
        expect(customer.isActive()).toBe(true);
    });

    it("should be inactive customer without address", ()  => {
        const customer = new Customer("1", "Luiz");
        
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when activating customer without address", ()  => {
        const customer = new Customer("1", "Luiz");
        
        expect(() => {
            customer.activate();
        }).toThrow("Address is required to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Luiz");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
