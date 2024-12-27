import EventHandlerInterface from "../../event-handler.interface";
import CustomerAddressChanged from "../customer-address-changed.event";

export default class SendConsoleLogWhenAddressChangedHandler implements EventHandlerInterface<CustomerAddressChanged> {
    handle(event: CustomerAddressChanged): void {
        console.log(`Endereço do cliente ${event.eventData.id} ${event.eventData.name} alterado para: ${event.eventData.address.street} - ${event.eventData.address.number}`);
    }
}