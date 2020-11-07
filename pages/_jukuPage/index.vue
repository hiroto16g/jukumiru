<template>
    <div class="jp__index">
        <div class="thumb" v-for="(thumb, i) in thumbs" :key="i" @click="to_movie_page(thumb)">
            <img :src="thumb.img" alt="" class="thumb__img">
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__index {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        
        .thumb {
            width: calc((100% - 0.5% * 2) / 3);
            height: calc(((100vw - 0.5vw * 2) / 3) * 4 / 3);
            margin-bottom: 0.5vw;

            .thumb__img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &::after {
            content: '';
            width: calc((100% - 0.5% * 2) / 3);
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .jp__index {
        display: flex;
        width: 602px;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 auto;
        
        .thumb {
            .thumb__img {
                width: 200px;
                height: calc(200px * 4 / 3);
                object-fit: cover;
                cursor: pointer;
            }
        }

        &::after {
            content: '';
            width: 200px;
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
        to_movie_page(thumb) {
            this.$store.commit('short_movie/init', {
                bg_img: thumb.img
            })
            this.$router.push('/' + this.$store.state.juku.id + '/shortMovie/' + thumb.name)
        }
    }
}
</script>