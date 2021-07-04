let main = new Vue({
    el: '.app',
    data: {
        products: [],
        filtered: [],
        goods: [],
        dataErr: false,
        data_sey: 'Hello'
    },
    components: {products, cart, filter_el},
    methods: {
        getJson(url) {
            return fetch(url)
                    .then(result => result.json())
                    .catch(err => {
                        console.log(err);
                        this.dataErr = true;
                    });
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(err => {
                    this.dataErr = true;
                    console.log(err)
              });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(err => {
                    this.dataErr = true;
                    console.log(err)
              });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) 
            }).then(result => result.json())
              .catch(err => console.log(err));
        }
    }
})
