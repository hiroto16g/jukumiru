<template>
    <div class="star_rating">
        <div class="some_eval" v-if="n_evals">
            <div class="no_color">★★★★★</div>
            <div class="with_color" :style="width">★★★★★</div>
            <div class="star_rate">
                {{ display_val }}
            </div>
        </div>
        <div class="none_eval" v-else>
            まだ評価がありません
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

        .none_eval {
            color: $color-light;
            padding: 0.3vw 0;
            font-size: $fos-s-sp;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .star_rating {
        position: relative;
        z-index: 0;
        display: inline-block;
        white-space: nowrap;
        color: #CCCCCC;

        .some_eval {
            .no_color, .with_color {
                font-size: $fos-l-pc;
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
                left: 115px;
                top: 50%;
                transform: translate(0, -50%);
                font-size: $fos-m-pc;
                color: $color-normal;
            }
        }

        .none_eval {
            color: $color-light;
            padding: 3px 0;
        }
    }
}
</style>


<script>
export default {
    props: {
        rate: {
            require: true,
            default: null,
            type: Number
        },
        n_evals: {
            require: true,
            default: 0,
            type: Number
        },
        display: {
            require: true,
            default: 'n_evals',
            type: String
        }
    },
    computed: {
        width() {
            return {width: String(this.rate * 20) + '%'}
        },
        display_val() {
            return this.display == 'n_evals' ? '(' + this.n_evals + ')' : this.rate
        }
    }
}
</script>