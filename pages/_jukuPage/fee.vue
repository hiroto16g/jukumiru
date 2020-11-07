<template>
    <div class="jp__fee">
        <div class="items">
            <div class="wrapper" v-for="(i, j) in items" :key="j">
                <div class="title">{{ i.title }}</div>
                <div class="text">{{ i.text }}</div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__fee {
        margin-bottom: 10vh;

        .wrapper {
            margin: 0 $margin-side-sp 5vw;
            color: $color-normal;

            .title {
                font-size: $fos-l-sp;
                margin-bottom: 1vw;
            }

            .text {
                font-size: $fos-m-sp;
                margin-left: 5vw;
                line-height: 1.5;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .jp__fee {
        width: 600px;
        margin: auto;

        .wrapper {
            margin: 0 0 30px;
            color: $color-normal;

            .title {
                font-size: $fos-l-pc;
                margin-bottom: 5px;
            }

            .text {
                font-size: $fos-m-pc;
                margin-left: 20px;
                line-height: 1.5;
            }
        }
    }
}
</style>


<script>
export default {
    layout: 'jukuPage',
    data() {
        return {
            items: ''
        }
    },
    methods: {
    },
    mounted() {
        console.log(this.$store.state.juku.id)
        this.items = require('@/assets/' + this.$store.state.juku.id + '/fee.json')
    }
}
</script>