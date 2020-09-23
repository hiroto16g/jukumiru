<template>
    <div class="jp__fee">
        <div class="wrapper">
            <div class="corse_name">
                夏期講習
            </div>
            <div class="text">
                1万円～3万円
            </div>
        </div>

        <div class="wrapper">
            <div class="corse_name">
                普通授業
            </div>
            <div class="text">
                1コマ当たり2千～5千円
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

            .corse_name {
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
</style>


<script>
export default {
    layout: 'jukuPage',
    data() {
        return {
            thumbs: this.$store.state.juku.thumbs
        }
    },
    methods: {
    }
}
</script>