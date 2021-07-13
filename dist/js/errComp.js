Vue.component('dataprod-err', {
    template: `
        <div class="err">
            <p v-if="$parent.dataErr">Нет данных</p>
        </div>
    `
})