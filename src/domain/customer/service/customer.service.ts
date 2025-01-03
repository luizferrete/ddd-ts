import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import Address from "../value-objects/address";
import Customer from "../entity/customer";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class CustomerService {
    constructor(private readonly eventDispatcher?: EventDispatcherInterface) {}

    createCustomer(id: string, name: string): Customer {
        const customer = new Customer(id, name);
        
        if(this.eventDispatcher)
            this.eventDispatcher.notify(new CustomerCreatedEvent({}));
        
        return customer;
    }

    updateCustomerAddress(customer: Customer, address: Address): Customer {
        customer.changeAddress(address);

        if(this.eventDispatcher)
            this.eventDispatcher.notify(new CustomerAddressChangedEvent({id: customer.id, name: customer.name, address: address}));

        return customer;
    }
}