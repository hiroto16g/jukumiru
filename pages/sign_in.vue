<template>
    <div class="sign_in">
        <div class="title">
            ログイン
        </div>

        <div class="items">
            <div class="item">
                <div class="item_name">
                    メールアドレス
                </div>
                <input type="email">
            </div>
            <div class="item">
                <div class="item_name">
                    パスワード
                </div>
                <input type="password">
            </div>
        </div>
        
        <div class="submit">
            <LinkButton text="ログインする" class="--fill" url="/account/test_cd" />
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .sign_in {
        margin: 5vh $margin-side-sp;
        .title {
            font-size: $fos-3l-sp;
            margin-bottom: 10vw;
        }

        .items {
            margin-bottom: 8vw;
            .item {
                margin-top: 7vw;

                .item_name {
                    font-size: $fos-l-sp;
                    margin-bottom: 0.7vw;
                }

                input,
                textarea {
                    border: solid thin $color-normal;
                    border-radius: 1vw;
                    padding: 3vw 3vw 2.8vw;
                    width: 100%;
                    font-size: $fos-2l-sp;
                }

                textarea {
                    height: 10vh;
                }
            }
        }

        .submit {
            text-align: center;

            .link_button {
                font-size: $fos-2l-sp;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .sign_in {
        margin: 100px auto 300px;
        width: 600px;

        .title {
            font-size: $fos-3l-pc;
            margin-bottom: 50px;
        }

        .items {
            margin-bottom: 70px;
            .item {
                margin-top: 30px;

                .item_name {
                    font-size: $fos-ml-pc;
                    margin-bottom: 5px;
                    letter-spacing: 0.04em;
                }

                input,
                textarea {
                    border: solid thin $color-normal;
                    border-radius: 5px;
                    padding: 10px 15px 10px;
                    width: 100%;
                    font-size: $fos-l-pc;
                }

                textarea {
                    height: 100px;
                }
            }
        }

        .submit {
            text-align: center;

            .link_button {
                font-size: $fos-l-pc;
            }
        }
    }
}
</style>


<script>
import LinkButton from '@/components/LinkButton'

export default {
    layout: 'withSearchBar',
    components: {
        LinkButton
    }
}
</script>