import { Product } from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], increasePercent: number): void {
        products.forEach(product => product.changePrice(product.price * (1+(increasePercent/100))));
    }

}