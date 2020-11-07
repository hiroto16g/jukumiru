<template>
    <div class="juku_page">
        <LayoutHeader />

        <div class="profile" v-if="juku">
            <AvatarImage :src="img" class="--l" />
            <LinkButton text="お申し込み" class="--fill" :url="'/' + this.id + '/enrollment'" />
            <div class="text_profile">
                <div class="name">{{ juku.name }}</div>
                <div class="address">{{ juku.prefecture + juku.city + juku.address_line }}</div>
                <div class="star_rating_wrapper" v-if="juku.star_rating">
                    <StarRating :rate="juku.star_rating.rate" :n_evals="juku.star_rating.n_evals" />
                </div>
                <div class="bio">{{ juku.bio }}</div>
            </div>
        </div>

        <div class="switch_bar">
            <div class="contents">
                <div class="content" v-for="(c, i) in categories" :key="i" @click="click_category(c.url)" :class="{display: is_display(c.url)}">
                    {{ c.category }}
                </div>
            </div>
        </div>

        <Nuxt />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .juku_page {
        margin-bottom: 10vh;

        .profile {
            padding: 5vw $margin-side-sp 0;
            position: relative;
            margin-bottom: 8vw;

            .link_button {
                position: absolute;
                right: 4vw;
                top: 11.5vw;
                font-size: $fos-ml-sp;
            }

            .text_profile {

                .name {
                    font-size: $fos-3l-sp;
                    margin: 2vw 0 0.5vw;
                }

                .address {
                    color: $color-light;
                    margin-bottom: 0.2vw;
                }

                .bio {
                    margin-top: 3vw;
                }
            }
        }

        .switch_bar {
            .contents {
                border-top: solid thin $color-border;
                border-bottom: solid thin $color-border;
                display: flex;
                justify-content: space-evenly;
                padding: 1vw 0;
                font-size: $fos-l-sp;
                color: $color-light;
                margin-bottom: 10vw;
                .content {
                    padding: 1.3vw 3vw;

                    &.display {
                        color: white;
                        background: $color-normal;
                        border-radius: 5vw;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .juku_page {
        margin-bottom: 100px;

        .fixed_wrapper {
            padding: 15px 20px;
        }
        
        .profile {
            position: relative;
            margin: 0 auto;
            width: 600px;

            .link_button {
                position: absolute;
                right: 0;
                top: 15px;
                font-size: $fos-ml-pc;
            }

            .text_profile {
                border-bottom: solid thin $color-border;
                padding-bottom: 50px;
                .name {
                    font-size: $fos-3l-pc;
                    margin: 10px 0 5px;
                }

                .address {
                    color: $color-light;
                    margin-bottom: 3px;
                }

                .bio {
                    margin-top: 30px;
                }
            }
        }

        .switch_bar {
            border-bottom: solid thin $color-border;
            margin-bottom: 50px;

            .contents {
                width: 600px;
                display: flex;
                justify-content: space-evenly;
                padding: 10px 0;
                font-size: $fos-l-pc;
                color: $color-light;
                margin: auto;

                .content {
                    padding: 8px 20px;
                    cursor: pointer;

                    &.display {
                        color: white;
                        background: $color-normal;
                        border-radius: 50px;
                    }
                }
            }
        }
    }
}
</style>


<script>
import AvatarImage from '@/components/AvatarImage'
import StarRating from '@/components/StarRating'
import LinkButton from '@/components/LinkButton'
import LayoutHeader from '@/components/LayoutHeader'

import firebase from '@/plugins/firebase'

export default {
    components: {
        AvatarImage,
        StarRating,
        LinkButton,
        LayoutHeader
    },
    data() {
        return {
            categories: [
                {
                    category: '動画',
                    url: ''
                },
                {
                    category: '基本情報',
                    url: '/info'
                },
                {
                    category: '料金',
                    url: '/fee'
                },
                {
                    category: 'レビュー',
                    url: '/review'
                }
            ],
            search_keyword: '',
            search_flag: false
        }
    },
    computed: {
        display_content() {
            return this.$route.path
        },
        juku() {
            return this.$store.state.juku.juku
        },
        img() {
            return this.$store.state.juku.img
        },
        id() {
            return this.$store.state.juku.id
        }
    },
    methods: {
        click_category(url) {
            this.$router.push('/' + this.id + url)
        },
        display_search_wrapper() {
            this.search_flag = true
        },
        hide_search_wrapper() {
            this.search_flag = false
        },
        is_display(url) {
            const _url = this.id + url.replace('/', '')
            return _url == this.$route.path.replace(/\//g, '')
        }
    },
    beforeMount() {
        if (!this.$store.state.juku.id) {
            const storage = firebase.storage().ref()

            this.$store.commit('result/get_basic_jukus_info')

            const id = this.$route.path.split('/')[1]

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
                    })
                })
            })

            this.$store.commit('juku/set_juku', this.$store.state.result.jukus[id])
            this.$store.commit('juku/set_id', id)
        }
    },
    watch: {
        '$route'(to, from) {
            console.log('path: ' + to + ': ' + from)
        }
    }
}
</script>