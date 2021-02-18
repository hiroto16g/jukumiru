<template>
    <div class="account_page">
        <LayoutHeader />

        <div class="profile">
            <AvatarImage src="" class="--m" />
            <div class="name">test_cd塾</div>
            <LinkButton text="設定" class="--outline_calm" :url="'/account/' + 'test_cd' + '/profile'" />
        </div>

        <div class="switch_bar">
            <div class="contents">
                <div class="content" v-for="(c, i) in categories" :key="i" :class="{display: is_display(c.url)}">
                    <LinkContainer :url="'/account/' + 'test_cd' + c.url">
                        {{ c.category }}
                    </LinkContainer>
                </div>
            </div>
        </div>

        <Nuxt />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .account_page {
        margin-bottom: 10vh;

        .profile {
            padding: 5vw $margin-side-sp 0;
            position: relative;
            margin-bottom: 8vw;

            .name {
                font-size: $fos-3l-sp;
                margin: 2vw 0 0.5vw;
            }

            .link_button {
                position: absolute;
                top: 6vw;
                right: $margin-side-sp;
            }
        }

        .switch_bar {
            .contents {
                border-top: solid thin $color-border;
                border-bottom: solid thin $color-border;
                display: flex;
                font-size: $fos-m-sp;
                color: $color-light;
                margin-bottom: 10vw;
                padding-left: $margin-side-sp;

                .content {
                    padding: 3.5vw 3vw;

                    &.display {
                        color: $color-normal;
                        border-bottom: solid 0.5vw $color-normal;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .account_page {
        margin-bottom: 100px;
        
        .profile {
            position: relative;
            margin: 0 auto 30px;
            width: 600px;

            .name {
                font-size: $fos-3l-pc;
                margin: 10px 0 5px;
            }

            .link_button {
                position: absolute;
                top: 10px;
                right: 0;
            }
        }

        .switch_bar {
            border-bottom: solid thin $color-border;
            margin-bottom: 50px;

            .contents {
                width: 600px;
                display: flex;
                justify-content: space-evenly;
                font-size: $fos-l-pc;
                color: $color-light;
                margin: auto;

                .content {
                    padding: 12px 20px;
                    cursor: pointer;

                    &.display {
                        color: $color-normal;
                        border-bottom: solid 2px $color-normal;
                    }

                    &:hover {
                        color: $color-normal;
                        border-bottom: solid 2px $color-normal;
                    }
                }
            }
        }
    }
}
</style>


<script>
import LinkContainer from '@/components/LinkContainer'
import LinkButton from '@/components/LinkButton'
import LayoutHeader from '@/components/LayoutHeader'

export default {
    components: {
        LinkContainer,
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
                    category: 'Q & A',
                    url: '/qa'
                }
            ],
        }
    },
    methods: {
        display_search_wrapper() {
            this.search_flag = true
        },
        hide_search_wrapper() {
            this.search_flag = false
        },
        is_display(url) {
            const _url = 'account' + 'test_cd' + url.replace('/', '')
            return _url == this.$route.path.replace(/\//g, '')
        }
    }
}
</script>