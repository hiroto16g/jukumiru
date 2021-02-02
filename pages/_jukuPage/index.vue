<template>
    <div class="jp__index">
        <div class="items">
            <div class="wrapper" v-for="(i, j) in items" :key="j">
                <div class="title">{{ i.title }}</div>
                <div class="text">{{ i.text }}</div>
            </div>
        </div>
        <div class="thumbs">
            <div class="thumb" v-for="(thumb, i) in thumbs" :key="i" @click="to_movie_page(thumb)">
                <img :src="thumb.img" alt="" class="thumb__img">
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__index {
        margin: 0 auto;

        .thumbs {
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;
            margin-bottom: 5vw;
            
            .thumb {
                .thumb__img {
                    width: 25vw;
                    height: calc(25vw * 4 / 3);
                    object-fit: cover;
                    margin-right: 0.5vw;
                }

                &:first-child {
                    margin-left: $margin-side-sp;
                }
            }
        }

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
    .jp__index {
        margin: 0 auto;
        width: 600px;

        .thumbs {
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;
            margin-bottom: 30px;
            
            .thumb {
                .thumb__img {
                    width: 140px;
                    height: calc(140px * 4 / 3);
                    object-fit: cover;
                    margin-right: 1px;
                }

                &:first-child {
                    margin-left: 0px;
                }
            }
        }

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
        this.items = require('@/assets/' + this.$store.state.juku.id + '/info.json')
    }
}
</script>