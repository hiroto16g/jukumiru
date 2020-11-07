<template>
    <div class="with_search_bar">
        <LayoutHeader />
        <Nuxt />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .with_search_bar {}
}

@media screen and (min-width: $min-width-pc) {
    .with_search_bar {}
}
</style>


<script>
import LinkButton from '@/components/LinkButton'
import LayoutHeader from '@/components/LayoutHeader'

export default {
    name: "with_search_bar",
    components: {
        LinkButton,
        LayoutHeader
    },
    data() {
        return {
            search_keyword: '',
            search_flag: false
        }
    },
    computed: {
        path() {
            return this.$route.path.slice(1)
        }
    },
    methods: {
        display_search_wrapper() {
            this.search_flag = true
        },
        hide_search_wrapper() {
            this.search_flag = false
        }
    }
}
</script>