<template>
    <div class="layout_header">
        <div class="fixed_wrapper">
            <div class="logo">
                <nuxt-link to="/">
                    <img src="@/assets/img/logo.svg" alt="">
                </nuxt-link>
            </div>
            <div class="search_wrapper" :class="{display: search_flag}">
                <form action="/">
                    <input type="search" name="search" class="input_search" placeholder="地名・塾名・志望校で検索" v-model="search_keyword">
                </form>
                <div class="cancel sp" @click="hide_search_wrapper">キャンセル</div>
            </div>
            <div class="search_icon sp" @click="display_search_wrapper">
                <img src="@/assets/icons/search.svg" alt="">
            </div>
            <div class="sign_in_btn">
                <LinkButton text="塾の方" class="--outline" url="/sign_in" />
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .layout_header {
        padding-top: 10vh;

        .fixed_wrapper {
            position: fixed;
            display: flex;
            top: 0;
            width: 100%;
            align-items: center;
            padding: 1.5vw 3vw 1vw;
            border-bottom: solid thin $color-border;
            z-index: 9999;
            background: white;

            .logo {
                a {
                    img {
                        height: 9vw;
                    }
                }
            }

            .search_wrapper {
                display: none;
                width: 100%;
                background: white;
                padding: 1.5vw 3vw 1vw;
                position: relative;
                border-bottom: solid thin $color-border;

                .input_search {
                    font-size: 16px;
                    padding: 3vw;
                    width: 78%;
                    border-radius: 2.5vw;
                    border: none;
                    background: #f0f0f0;
                    outline: none;
                    appearance: none;

                    &::placeholder {
                        font-size: 16px;
                        color: $color-light;
                    }
                }

                .cancel {
                    font-size: 3.4vw;
                    position: absolute;
                    top: 50%;
                    right: 3vw;
                    transform: translate(0, -50%);
                }

                &.display {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                }
            }

            .search_icon {
                margin-left: auto;

                img {
                    width: 6vw;
                    color: $color-light;
                    margin-top: 1vw;
                }
            }

            .sign_in_btn {
                margin-left: 5vw;
            }
        }

        
    }
}

@media screen and (min-width: $min-width-pc) {
    .layout_header {
        padding-top: 140px;

        .fixed_wrapper {
            position: fixed;
            display: flex;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            width: calc(100% - 20px);
            align-items: center;
            padding: 15px 10px;
            border-bottom: solid thin $color-border;
            z-index: 9999;
            background: white;

            .logo {
                margin-right: auto;
                img {
                    width: 120px;
                }
            }

            .search_wrapper {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 50%;
                max-width: 500px;

                .input_search {
                    font-size: 16px;
                    padding: 15px 20px;
                    width: 100%;
                    border-radius: 10px;
                    border: none;
                    background: #f0f0f0;

                    &::placeholder {
                        font-size: 16px;
                        color: $color-light;
                    }
                }
            }
        }
    }
}
</style>


<script>
import LinkButton from '@/components/LinkButton'

export default {
    components: {
        LinkButton
    },
    data() {
        return {
            search_keyword: '',
            search_flag: false
        }
    },
    methods: {
        display_search_wrapper() {
            this.search_flag = true
        },
        hide_search_wrapper() {
            this.search_flag = false
        }
    }
}
</script>