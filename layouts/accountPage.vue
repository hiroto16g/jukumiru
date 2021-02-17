<template>
    <div class="account_page">
        <div class="profile">
            <AvatarImage src="" class="--m" />
            <div class="name">test_cd</div>
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
        <!-- <LinkContainer url="/"></LinkContainer>   -->
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
        }

        .switch_bar {
            .contents {
                border-top: solid thin $color-border;
                border-bottom: solid thin $color-border;
                display: flex;
                justify-content: space-evenly;
                font-size: $fos-l-sp;
                color: $color-light;
                margin-bottom: 10vw;
                .content {
                    padding: 3vw 3vw;

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
            margin: 0 auto;
            width: 600px;

            .name {
                font-size: $fos-3l-pc;
                margin: 10px 0 5px;
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
// import LinkContainer from '@/components/LinkContainer'

export default {
    layout: '',
    components: {
        // LinkContainer
    },
    data() {
        return {
            categories: [
                {
                    category: 'プロフィール',
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
            console.log(_url)
            return _url == this.$route.path.replace(/\//g, '')
        }
    }
}
</script>