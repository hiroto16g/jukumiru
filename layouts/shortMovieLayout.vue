<template>
    <div class="">
        <Nuxt />
    </div>
</template>


<script>
import firebase from '@/plugins/firebase'

export default {
    data() {
        return {
            storage: null
        }
    },
    methods: {
        set_movie(movie_dir) {
            movie_dir.child('video.mp4').getDownloadURL().then(url => {
                this.$store.commit('short_movie/set_movie', url)
            })
        },
        set_text(movie_dir) {
            movie_dir.child('text.txt').getDownloadURL().then(url => {
                this.$store.dispatch('short_movie/get_text', url)
            })
        }
    },
    mounted() {
        const storage = firebase.storage().ref()
        const route_params = this.$route.params
        const id = route_params.jukuPage
        const movie_name = route_params.pathMatch

        this.storage = storage

        if (!this.$store.state.juku.id) {
            this.$store.commit('result/get_basic_jukus_info')

            storage.child('avatar_imgs/' + id + '.jpg').getDownloadURL().then(url => {
                this.$store.commit('juku/set_img', url)
            })
            
            storage.child('thumbnails/' + id).listAll().then(result => {
                result.items.forEach(item => {
                    item.getDownloadURL().then(url => {
                        let thumb = {}
                        this.$set(thumb, 'img', url)
                        let name = item.location.path.split('/').slice(-1)[0].split('.')[0]
                        this.$set(thumb, 'name', name)

                        this.$store.commit('juku/set_thumbs', thumb)

                        if (name == movie_name) {
                            this.$store.commit('short_movie/set_bg_img', url)
                        }
                    })
                })
            })

            this.$store.commit('juku/set_juku', this.$store.state.result.jukus[id])
            this.$store.commit('juku/set_id', id)
        }

        if (!this.$store.state.short_movie.movie) {
            const movie_dir = storage.child('videos/' + id + '/' + movie_name)
            this.set_movie(movie_dir)
            this.set_text(movie_dir)
        }
    },
    watch: {
        '$route'(to, from) {
            const id = to.params.jukuPage
            const movie_name = to.params.pathMatch

            const thumb = this.$store.state.juku.thumbs.filter(thumb => thumb.name == movie_name)[0]
            this.$store.commit('short_movie/bg_img', thumb.img)

            const movie_dir = this.storage.child('videos/' + id + '/' + movie_name)
            this.set_movie(movie_dir)
            this.set_text(movie_dir)
        }
    }
}
</script>