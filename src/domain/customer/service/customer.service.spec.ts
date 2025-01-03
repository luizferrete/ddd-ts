import Address from "../value-objects/address";
import SendConsoleLogWhenAddressChangedHandler from "../event/handler/send-console-log-when-address-changed.handler";
import SendConsoleLogHandler from "../event/handler/send-console-log.handler";
import CustomerService from "./customer.service";
import EventDispatcher from "../../@shared/event/event-dispatcher";

describe("Customer service unit tests", () => {
    it("should create a customer", () => {
        const customerService = new CustomerService();
        const customer =  customerService.createCustomer("c1", "Customer 1");

        expect(customer.id).toBe("c1");
        expect(customer.name).toBe("Customer 1");
    });

    it("should emit event when customer created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const spyNotify = jest.spyOn(eventDispatcher, "notify");
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const customerService = new CustomerService(eventDispatcher);

        customerService.createCustomer("c1", "Customer 1");

        expect(spyNotify).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should update customer address", () => {
        //Arrange
        const customerService = new CustomerService();
        const customer =  customerService.createCustomer("c1", "Customer 1");
        const address = new Address("street", 123, "zipcode", "city");
        
        //Act
        customerService.updateCustomerAddress(customer, address);

        //Assert
        expect(customer.Address).toBe(address);
    });

    it("should emit event when customer address changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const spyNotify = jest.spyOn(eventDispatcher, "notify");
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const customerService = new CustomerService(eventDispatcher);

        const customer =  customerService.createCustomer("c1", "Customer 1");
        const address = new Address("street", 123, "zipcode", "city");

        customerService.updateCustomerAddress(customer, address);

        expect(spyNotify).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalled();
    });
});