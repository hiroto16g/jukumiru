<template>
    <div class="link_container" @click="jump">
        <slot></slot>
    </div>
</template>


<style lang="scss">
.link_container {
}

@media screen and (max-width: $max-width-sp) {
    .link_container {
    }
}

@media screen and (min-width: $min-width-pc) {
    .link_container {
        cursor: pointer;
    }
}
</style>


<script>
export default {
    props: {
        url: {
            require: true,
            default: '/',
            type: String
        },
        preprocessing: {
            require: false,
            type: Function
        },
        postprocessing: {
            require: false,
            type: Function
        }
    },
    methods: {
        jump() {
            if (this.preprocessing) {
                this.preprocessing()
            }

            this.$router.push(this.url)

            if (this.postprocessing) {
                this.postprocessing()
            }
        }
    }
}


</script>