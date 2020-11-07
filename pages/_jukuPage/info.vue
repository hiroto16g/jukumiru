<template>
    <div class="jp__info">
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
    .jp__info {
        margin: 0 auto;

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
                white-space: pre-wrap;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .jp__info {
        margin: 0 auto;
        width: 600px;

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
                white-space: pre-wrap;
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
        this.items = require('@/assets/' + this.$store.state.juku.id + '/info.json')
    }
}
</script>