import ProductInterface from "./product.interface";

export class ProductB implements ProductInterface{

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    validate(): boolean {
        if(this._id.length === 0) {
            throw Error("Id is required");
        }

        if(this._name.length === 0) {
            throw Error("Name is required");
        }

        if(this._price < 0) {
            throw Error("Price value can't be negative");
        }

        return true;
    }

    get name(): string {
        return this._name;
    }

    changeName(newName: string): void {
        this._name = newName;
        this.validate();
    }


    get price(): number {
        return this._price * 2;
    }

    get id(): string {
        return this._id;
    }

    changePrice(newPrice: number): void {
        this._price = newPrice;
        this.validate();
    }
}