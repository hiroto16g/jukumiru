<template>
    <div class="jp__index">
        <div class="thumb" v-for="(thumb, i) in thumbs" :key="i" @click="to_movie_page">
            <img :src="thumb" alt="" class="thumb__img">
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__index {
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        
        .thumb {
            .thumb__img {
                width: 35vw;
                height: calc(35vw * 4 / 3);
                object-fit: cover;
                margin-right: 0.5vw;
            }

            &:first-child {
                margin-left: $margin-side-sp;
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
        to_movie_page() {
            this.$router.push('/hiromitu/shortMovie/sample')
        }
    }
}
</script>