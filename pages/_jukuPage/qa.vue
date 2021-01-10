<template>
    <div class="jp__qa">
        <div class="items">
            <div class="wrapper" v-for="(i, j) in items" :key="j">
                <div class="q">{{ i.q }}</div>
                <div class="a">{{ i.a }}</div>
            </div>
        </div>
        <div class="form_button">
            <LinkButton text="塾に問い合わせる" class="--outline" />
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__qa {
        margin: 0 auto;

        .wrapper {
            margin: 0 $margin-side-sp 5vw;
            color: $color-normal;

            .q {
                font-size: $fos-l-sp;
                margin-bottom: 1vw;
            }

            .a {
                font-size: $fos-m-sp;
                margin-left: 10vw;
                line-height: 1.5;
                white-space: pre-wrap;
            }
        }

        .form_button {
            display: flex;
            justify-content: center;
            margin-top: 12vw;

            .link_button {
                font-size: $fos-l-sp;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .jp__qa {
        margin: 0 auto;
        width: 600px;

        .wrapper {
            margin: 0 0 30px;
            color: $color-normal;

            .q {
                font-size: $fos-l-pc;
                margin-bottom: 5px;
            }

            .a {
                font-size: $fos-m-pc;
                margin-left: 50px;
                line-height: 1.5;
                white-space: pre-wrap;
            }
        }

        .form_button {
            display: flex;
            justify-content: center;
            margin-top: 80px;

            .link_button {
                font-size: $fos-l-pc;
            }
        }
    }
}
</style>


<script>
import LinkButton from '@/components/LinkButton'
export default {
    layout: 'jukuPage',
    components: {
        LinkButton
    },
    data() {
        return {
            items: '',
            thumbs: this.$store.state.juku.thumbs
        }
    },
    methods: {
        to_movie_page(thumb) {
            this.$store.commit('short_movie/init', {
                bg_img: thumb.img
            })
            this.$router.push('/' + this.$store.state.juku.id + '/shortMovie/' + thumb.name)
        }
    },
    mounted() {
        this.items = require('@/assets/' + this.$store.state.juku.id + '/qa.json')
    }
}
</script>