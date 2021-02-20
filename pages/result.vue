<template>
    <div class="result">
        <div class="content" v-for="(val, id) in jukus" :key="id">
            <AvatarImage :src="avatar_imgs[id]" class="--m" @click.native="to_juku_page(id)" />
            <div class="text_info">
                <div class="to_juku_page" @click="to_juku_page(id)">
                    <div class="juku_name">{{ val.name }}</div>
                    <div class="address">{{ val.prefecture + val.city + val.address_line }}</div>
                    <StarRating :rate="val.star_rating.rate" :n_evals="val.star_rating.n_evals" />
                </div>
                <div class="thumbs">
                    <div class="thumb_wrapper" v-for="(thumb, j) in thumbs[id]" :key="j">
                        <img :src="thumb.img" alt="" class="thumb" @click="to_movie_page(id, thumb)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .result {
        margin: 0 $margin-side-sp;

        .content {
            display: flex;
            margin-bottom: 5vw;

            .text_info {
                margin-left: 2vw;

                .juku_name {
                    font-size: $fos-2l-sp;
                    margin-bottom: 0.1vw;
                }

                .address {
                    font-size: $fos-m-sp;
                    color: $color-light;
                    margin-bottom: 0.5vw;
                }

                .thumbs {
                    display: flex;
                    margin-top: 2vw;

                    .thumb {
                        width: 15vw;
                        height: calc(15vw * 4 / 3);
                        object-fit: cover;
                        object-position: center;
                        margin-right: 0.5vw;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .result {
        margin: 0;

        .content {
            display: flex;
            margin: 0 auto 40px;
            width: 463px;

            .avatar_image {
                cursor: pointer;
            }

            .text_info {
                margin-left: 10px;
                cursor: pointer;

                .juku_name {
                    font-size: $fos-l-pc;
                    margin-bottom: 3px;
                }

                .address {
                    font-size: $fos-m-pc;
                    color: $color-light;
                    margin-bottom: 2px;
                }

                .thumbs {
                    display: flex;
                    margin-top: 5px;

                    .thumb {
                        width: 70px;
                        height: calc(70px * 4 / 3);
                        object-fit: cover;
                        object-position: center;
                        margin-right: 3px;
                    }
                }
            }
        }
    }
}
</style>


<script>
import AvatarImage from '../components/AvatarImage'
import StarRating from '../components/StarRating'

import firebase from '@/plugins/firebase'

export default {
    layout: 'withSearchBar',
    components: {
        AvatarImage,
        StarRating
    },
    data() {
        return {
            avatar_imgs: {},
            thumbs: {},
        }
    },
    computed: {
        jukus() {
            return this.$store.state.result.jukus
        },
        ids() {
            return this.$store.state.result.ids
        }
    },
    methods: {
        to_juku_page(id) {
            this.$store.commit('juku/init', {
                juku: this.jukus[id],
                avatar_img: this.avatar_imgs[id],
                thumbs: this.thumbs[id],
                id: id
            })
            this.$router.push('/' + id)
        },
        to_movie_page(id, thumb) {
            this.$store.commit('juku/init', {
                juku: this.jukus[id],
                avatar_img: this.avatar_imgs[id],
                thumbs: this.thumbs[id],
                id: id
            })
            this.$store.commit('short_movie/init', {
                bg_img: thumb.img
            })
            this.$router.push('/' + id + '/shortMovie/' + thumb.name)
        }
    },
    mounted() {
        this.$store.commit('result/get_basic_jukus_info')

        const storage = firebase.storage().ref()

        // テスト用
        var test = {
            juku_cd: "khjkhjkhjkhkj",
            title: "テストタイトル",
            text: "テスト本文",
        }
        this.$store.dispatch('juku/select_juku_fee', test)

        this.ids.map(id => {
            storage.child('avatar_imgs/' + id + '.jpg').getDownloadURL().then(url => {
                this.$set(this.avatar_imgs, id, url)
            })

            storage.child('thumbnails/' + id).listAll().then(result => {
                let thumbs = []
                result.items.forEach(item => {
                    let thumb = {}
                    item.getDownloadURL().then(url => {
                        this.$set(thumb, 'img', url)
                        let name = item.location.path.split('/').slice(-1)[0].split('.')[0]
                        this.$set(thumb, 'name', name)
                    })
                    thumbs.push(thumb)
                })
                this.$set(this.thumbs, id, thumbs)
            })
        })
    }

}
</script>