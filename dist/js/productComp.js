const product = {
    props: ['product'],
    template: `
        <div class="product_card">
            <img class="product_card-img" :src="product.imgUrl" :alt="product.title" width="360" height="420">
            <div class="product_card-text">
                <a class="box_title" href="#">{{ product.title }}</a>
                <p class="box_text">{{ product.text }}</p>
            </div>
            <p class="box_price">{{ product.price }}$</p>
            <div class="black">
                <p class="black_link" @click="$parent.addProduct(product)">
                    Add to Cart
                </p>
            </div>
        </div>
    `
};

const products = {
    components: {product},
    data() {
        return {
            products: [],
            filtered: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let i = 0; i <= 5; i++) {
                    this.products.push(data[i]);
                    this.filtered.push(data[i]);
                }
            }); 
    },
    methods: {
        filter(value) {
            const regExp = new RegExp(value, 'ig');
            
            this.filtered = this.products.filter(prod => {
                return regExp.test(prod.title);
            });
        },
        addProduct(el) {
            let find = this.$parent.goods.find(prod => prod.id == el.id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .then(data => {
                        
                        if (data.result === 1) {
                            find.quantity++;
                        }             
                    });
            } else {
                let cartProduct = Object.assign({quantity: 1}, el);
                this.$parent.postJson('/api/cart', cartProduct)
                    .then(data => {
                        if(data.result === 1){
                            this.$parent.goods.push(cartProduct);

                        }
                    })
            }
        },
    },
    template: `
        <div class="products_cards row flex-wrap">
            <product v-for="item of filtered"
            :key="item.id"
            :product="item">
            </product>
        </div>
    ` 
}