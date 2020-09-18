<template>
    <div class="juku_page">
        <div class="profile">
            <AvatarImage :src="img" class="--l" />
            <LinkButton text="お申し込み" class="--fill" />
            <div class="text_profile">
                <div class="name">{{ name }}</div>
                <div class="address">{{ address }}</div>
                <StarRating :rate="rate" />
                <div class="bio">{{ bio }}</div>
            </div>
        </div>

        <div class="switch_bar">
            <div class="content" v-for="(c, i) in categories" :key="i" @click="switch_content(c)" :class="{display: c == display_content}">
                {{ c }}
            </div>
        </div>
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
            border-top: solid thin $color-normal;
            border-bottom: solid thin $color-normal;
            display: flex;
            justify-content: space-evenly;
            padding: 1vw 0;
            font-size: $fos-l-sp;
            color: $color-light;
            
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
            img: require('@/assets/img/akita.jpg'),
            name: '洋光塾',
            address: '秋田県秋田市手形学園町1-1',
            rate: 4.7,
            id: 'hiromitu',
            bio: 'ひろみつ塾です！進学校から中堅校まで、幅広くお任せください！',
            categories: [
                '動画', '基本情報', '料金', 'レビュー'
            ],
            display_content: '動画'
        }
    },
    methods: {
        switch_content(name) {
            this.display_content = name
        }
    }
}
</script>