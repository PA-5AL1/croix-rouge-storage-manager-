const products: Products = new InMemoryProductRepository();

describe('Add product', () => {
   

    beforeAll(async() => {
    });

    it('Should add a new product', async () => {
        const newProduct =  Product.new("Vitel", 1, 'Food');
        const addedProduct = products.save(newProduct);
        const product = products.find(addedProduct.id);
        expect(product.id).toBe(product.addedProduct.id);
    });
});
