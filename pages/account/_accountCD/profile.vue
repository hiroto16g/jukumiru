<template>
    <div class="account_profile">
        <div class="account_profile__header">
            <LinkButton text="キャンセル" url="./" class="--outline_calm cancel" />
            <div class="text">設定</div>
            <LinkButton text="保存する" url="./" class="--fill save" />
        </div>
        <div class="container">
            <DisplayWithTitleAndError :title="account_name.title" :error_message="account_name.em">
                <BaseInput v-model="account_name.data"></BaseInput>
            </DisplayWithTitleAndError>

            <DisplayWithTitleAndError :title="prefecture.title" :error_message="prefecture.em">
                <BaseInput v-model="prefecture.data"></BaseInput>
            </DisplayWithTitleAndError>

            <DisplayWithTitleAndError :title="city.title" :error_message="city.em">
                <BaseInput v-model="city.data"></BaseInput>
            </DisplayWithTitleAndError>

            <DisplayWithTitleAndError :title="address_line.title" :error_message="address_line.em">
                <BaseInput v-model="address_line.data"></BaseInput>
            </DisplayWithTitleAndError>

            <DisplayWithTitleAndError :title="building_name.title" :error_message="building_name.em">
                <BaseInput v-model="building_name.data"></BaseInput>
            </DisplayWithTitleAndError>

            <DisplayWithTitleAndError :title="bio.title" :error_message="bio.em">
                <BaseTextarea v-model="bio.data"></BaseTextarea>
            </DisplayWithTitleAndError>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .account_profile {
        padding-top: 20vw;

        .account_profile__header {
            position: fixed;
            top: 0;
            left: 0;
            padding: 4.5vw 0 4vw;
            text-align: center;
            width: 100%;
            font-size: $fos-l-sp;
            background: #fff;
            border-bottom: solid thin $color-border;

            .cancel,
            .save {
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                font-size: $fos-m-sp;
            }

            .cancel {
                left: 2vw;
            }

            .save {
                right: 2vw;
            }
        }

        .container {
            margin: 0 $margin-side-sp;

            .display_with_title_and_error {
                margin-bottom: 7vw;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .account_profile {
        padding-top: 100px;

        .account_profile__header {
            position: fixed;
            top: 0;
            left: 0;
            padding: 15px 0;
            text-align: center;
            width: 100%;
            font-size: $fos-l-pc;
            background: #fff;
            border-bottom: solid thin $color-border;

            .cancel,
            .save {
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                font-size: $fos-ms-pc;
            }

            .cancel {
                left: 10px;
            }

            .save {
                right: 10px;
            }
        }
        .container {
            max-width: 768px;
            width: 80%;
            margin: 0 auto;

            .display_with_title_and_error {
                margin-bottom: 30px;
            }
        }
    }
}
</style>


<script>
import BaseInput from '@/components/BaseInput'
import BaseTextarea from '@/components/BaseTextarea'
import DisplayWithTitleAndError from '@/components/DisplayWithTitleAndError'
import LinkButton from '@/components/LinkButton'

export default {
    components: {
        BaseInput,
        BaseTextarea,
        DisplayWithTitleAndError,
        LinkButton
    },
    data() {
        return {
            avatar_img: {
                title: '',
                data: '',
                em: ''
            },
            account_name: {
                title: '塾名',
                data: 'test_cd塾',
                em: 'テストエラー'
            },
            prefecture: {
                title: '都道府県',
                data: '秋田県',
                em: ''
            },
            city: {
                title: '市区町村',
                data: '秋田市',
                em: ''
            },
            address_line: {
                title: '町名などの住所',
                data: '手形学園町1-1',
                em: ''
            },
            building_name: {
                title: '建物名',
                data: '朝日ビルディング1階',
                em: ''
            },
            bio: {
                title: '塾紹介文',
                data: 'test_1塾です',
                em: ''
            },
            tel: {
                title: '',
                data: '',
                em: ''
            },
            email: {
                title: '',
                data: 'flythenuggets@gmail.com',
                em: ''
            }
        }
    },
    computed: {
    }
}
</script>