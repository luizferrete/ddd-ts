import Address from "../entity/address";
import Customer from "../entity/customer";
import CustomerAddressChangedEvent from "../event/@shared/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/@shared/customer/customer-created.event";
import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface";

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