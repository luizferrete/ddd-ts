import { Product } from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", ()  => {
        expect(() => {
            new Product("", "Panela", 100);
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", ()  => {
        expect(() => {
            new Product("123", "", 100);
        }).toThrow("Name is required");
    });

    it("should throw error when price is negative", ()  => {
        expect(() => {
            new Product("123", "Panela", -1);
        }).toThrow("Price value can't be negative");
    });

    it("should change name", ()  => {
        const product = new Product("123", "Panela", 100);
        product.changeName("Frigideira");
        expect(product.name).toBe("Frigideira");
    });

    it("should change price", ()  => {
        const product = new Product("123", "Panela", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});
