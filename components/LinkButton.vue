<template>
    <button class="link_button" @click="jump">{{ text }}</button>
</template>


<style lang="scss">
.link_button {
    display: inline-block;
    border: none;
    background: white;

    &.--fill {
        background: $color-brand;
        color: white;
    }

    &.--outline {
        border: solid thin $color-brand;
        color: $color-brand;
    }

    &.--outline_calm {
        border: solid thin $color-light;
        color: $color-normal;
    }

    &.--outline_alert {
        border: solid thin $color-alert;
        color: $color-alert;
    }
}

@media screen and (max-width: $max-width-sp) {
    .link_button {
        border-radius: 8vw;
        padding: 0.5em 4vw;
    }
}

@media screen and (min-width: $min-width-pc) {
    .link_button {
        border-radius: 80px;
        padding: 0.7em 1.3em;
        cursor: pointer;
    }
}
</style>


<script>
export default {
    props: {
        text: {
            require: true,
            default: 'link button',
            type: String
        },
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