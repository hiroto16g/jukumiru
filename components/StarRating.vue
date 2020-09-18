<template>
    <div class="star_rating">
        <div class="no_color">★★★★★</div>
        <div class="with_color" :style="width">★★★★★</div>
        <div class="star_rate">
            {{ rate }}
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .star_rating {
        position: relative;
        z-index: 0;
        display: inline-block;
        white-space: nowrap;
        color: #CCCCCC;

        .no_color, .with_color {
            content: '★★★★★';
            font-size: $fos-m-sp;
        }

        .with_color {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            overflow: hidden;
            white-space: nowrap;
            color: #ffcf32;
        }

        .star_rate {
            position: absolute;
            left: 20vw;
            top: 0;
            font-size: $fos-m-sp;
            color: $color-normal;
        }
    }
}

</style>


<script>
export default {
    props: {
        rate: {
            require: true,
            default: 100,
            type: Number
        }
    },
    computed: {
        width() {
            return {width: String(this.rate * 20) + '%'}
        }
    }
}
</script>