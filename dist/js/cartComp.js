const cartBox = {
    props: ['good'],
    template: `
        <div class="cart_box row">
            <img class="cart_box-img" :src="good.imgUrl" :alt="good.title">
            <div class="cart_box-content">
                <p class="cart_box-brand">{{ good.title }}</p>
                <p class="cart_box-category">T-SHIRT</p>
                <ul class="cart_box-values">
                    <li>Price:<span class="cart_box-item price">{{ good.price * good.quantity }}$</span></li>
                    <li>Color:<span class="cart_box-item color">Red</span></li>
                    <li>Size:<span class="cart_box-item size">XL</span></li>
                    <li>Quantity:<span class="cart_box-item">{{ good.quantity }}</span></li>
                </ul>

                <button class="cart_box-close" @click="$parent.removeProduct(good)">
                    &#10005;
                </button>
            </div>
        </div>
    `
};

const cart = {
    components: {'cart-item': cartBox},
    data() {
        return {
            goods: [],
        }
    },
    methods: {
        removeProduct(el) {
            this.$parent.deleteJson(`/api/cart/${el.id}`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.goods.find(prod => prod.id == +el.id);
    
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.goods.splice(this.goods.indexOf(find), 1);

                        }
                    } else {
                        console.error('Error');
                    }
                })
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
        .then(data => {
            for (const el of data.contents) {
                this.goods.push(el);
            }
        }); 
    },
    template: `
        <div class="cart_content">
            <p class="no-goods" v-if="!goods.length">Корзина пуста</p>
            <cart-item v-for="item of goods" :good="item"></cart-item>
            <div class="cart_content-btns row">
                <a href="#" @click.prevent="goods = []" class="btn btn_black">CLEAR SHOPPING CART</a>
                <a href="catalog.html" class="btn btn_black">CONTINUE SHOPPING</a>
            </div>
        </div>
    `
}