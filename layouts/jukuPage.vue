<template>
    <div class="juku_page">
        <div class="profile">
            <AvatarImage :src="img" class="--l" />
            <LinkButton text="お申し込み" class="--fill" @click.native="to_enrollment" />
            <div class="text_profile">
                <div class="name">{{ name }}</div>
                <div class="address">{{ address }}</div>
                <StarRating :rate="rate" />
                <div class="bio">{{ bio }}</div>
            </div>
        </div>

        <div class="switch_bar">
            <div class="content" v-for="(c, i) in categories" :key="i" @click="click_category(c.url)" :class="{display: display_content == c.url}">
                {{ c.category }}
            </div>
        </div>

        <Nuxt />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .juku_page {
        .profile {
            padding: 8vw $margin-side-sp 0;
            position: relative;
            margin-bottom: 8vw;

            .link_button {
                position: absolute;
                right: 4vw;
                top: 16.5vw;
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
</style>


<script>
import AvatarImage from '@/components/AvatarImage'
import StarRating from '@/components/StarRating'
import LinkButton from '@/components/LinkButton'
export default {
    components: {
        AvatarImage,
        StarRating,
        LinkButton
    },
    data() {
        return {
            img: this.$store.state.juku.img,
            name: this.$store.state.juku.name,
            address: this.$store.state.juku.address,
            rate: this.$store.state.juku.rate,
            id: this.$store.state.juku.id,
            bio: this.$store.state.juku.bio,
            categories: [
                {
                    category: '動画',
                    url: '/' + this.$store.state.juku.id
                },
                {
                    category: '基本情報',
                    url: '/' + this.$store.state.juku.id + '/' + 'info'
                },
                {
                    category: '料金',
                    url: '/' + this.$store.state.juku.id + '/' + 'fee'
                },
                {
                    category: 'レビュー',
                    url: '/' + this.$store.state.juku.id + '/' + 'review'
                }
            ]
        }
    },
    computed: {
        display_content() {
            return this.$route.path
        }
    },
    methods: {
        click_category(url) {
            this.$router.push(url)
        },
        to_enrollment() {
            this.$router.push('/enrollment')
        }
    }
}
</script>