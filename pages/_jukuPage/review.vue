<template>
    <div class="jp__review">
        <!-- <div class="n_reviews">
            2件のレビュー
        </div> -->
        <div class="reviews">
            <div class="review" v-for="(r, i) in reviews" :key="i">
                <div class="title">
                    {{ r.title }}
                </div>
                <StarRating :rate="r.star_rating" n_evals="1" display="rate" />
                <div class="status">
                    入塾時の学年：{{ r.status }}
                </div>
                <div class="text">
                    {{ r.text }}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__review {
        margin: 0 $margin-side-sp 10vh;

        .n_reviews {
            color: $color-light;
            font-size: $fos-s-sp;
            margin-bottom: 8vw;
        }

        .reviews {
            color: $color-normal;

            .review {
                margin-bottom: 8vw;

                .title {
                    font-size: $fos-l-sp;
                    margin-bottom: 0.3vw;
                }

                .status {
                    color: $color-light;
                    margin-top: 0.8vw;
                }

                .text {
                    font-size: $fos-m-sp;
                    margin: 2vw 4vw 0;
                    line-height: 1.7;
                    letter-spacing: 0.06em;
                }
            }

            
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .jp__review {
        margin: auto;
        width: 600px;

        .n_reviews {
            color: $color-light;
            font-size: $fos-s-pc;
            margin-bottom: 50px;
        }

        .reviews {
            color: $color-normal;

            .review {
                margin-bottom: 30px;

                .title {
                    font-size: $fos-l-pc;
                    margin-bottom: 3px;
                }

                .status {
                    color: $color-light;
                    margin-top: 5px;
                }

                .text {
                    font-size: $fos-m-pc;
                    margin: 10px 20px 0;
                    line-height: 1.7;
                    letter-spacing: 0.06em;
                }
            }
        }
    }
}
</style>


<script>
import StarRating from '@/components/StarRating'

export default {
    layout: 'jukuPage',
    components: {
        StarRating
    },
    data() {
        return {
            reviews: null
        }
    },
    methods: {
    },
    mounted() {
        this.reviews = require('@/assets/' + this.$store.state.juku.id + '/review.json')
    }
}
</script>