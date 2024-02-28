<template>
    <input @input="debounceSearch" type="search" placeholder="Search" class="icons_search" />
</template>

<script>
import debounce from 'debounce';
import { defineComponent } from 'vue';

export default defineComponent({

    name: 'Search',

    props: {},

    data() {

        return {



        }

    },

    computed: {},

    watch: {},

    methods: {
        debounceSearch: debounce(e => {
            const { value } = e.target;

            const searchURL = new URL(window.location)
            searchURL.searchParams.set('icons', value)
            window.history.pushState({}, '', searchURL);
        }, 500)
    },

    components: {},

    setup() {

        return {



        }

    }

});

</script>

<style scoped>
.icons_search {
    width: 100%;
    border: 1px solid gray;
    outline: none;
    padding: 1rem 1.5rem;
    border-radius: 1.25rem;
    font-size: 20px;
    margin-top: 0.5rem
}
</style>