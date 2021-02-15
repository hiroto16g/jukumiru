<template>
    <div class="account_index">
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
    .account_index {
        .container {
            margin: 0 $margin-side-sp;

            .display_with_title_and_error {
                margin-bottom: 7vw;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .account_index {
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

export default {
    layout: 'accountPage',
    components: {
        BaseInput,
        BaseTextarea,
        DisplayWithTitleAndError
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
                data: '手形学園町1-1',
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