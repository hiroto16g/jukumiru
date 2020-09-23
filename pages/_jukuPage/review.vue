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
                <StarRating :rate="r.rate" />
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
                    line-height: 1.5;
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
            reviews: [
                {
                    title: 'とても面白い先生でした！',
                    status: '中学3年生',
                    rate: 5,
                    text: '高校受験のために夏休みから通い始めました。学校よりも先生と近くて話しやすくてよかったです！苦手な社会を教えてもらっていたのですが、先生の教え方がうまくて面白くて、今では一番好きな教科です！ありがとうございました！'
                },
                {
                    title: '動画で見た通りでよかった',
                    status: '保護者',
                    rate: 4,
                    text: '塾紹介の動画を拝見して、息子に合ってそうだと思い、入塾させました。申し込みの時にしか塾へ伺っていないので、塾の雰囲気や先生方の教え方が動画の通りなのか少し不安がありましたが、息子の話を聞く限り大丈夫だったようです。まだ入塾してから一か月しかたっていなく、成績の上昇は感じられませんが、期待を込めて星４とさせていただきます'
                }
            ]
        }
    },
    methods: {
    }
}
</script>