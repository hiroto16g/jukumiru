<template>
    <div class="result">
        <div class="content" v-for="(juke, i) in jukes" :key="i" @click="to_juke_page(juke.id)">
            <AvatarImage :src="juke.img" class="--m" />
            <div class="text_info">
                <div class="juku_name">{{ juke.name }}</div>
                <div class="address">{{juke.address }}</div>
                <StarRating :rate="juke.rate" />
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
                    font-size: $fos-ll-sp;
                    margin-bottom: 0.1vw;
                }

                .address {
                    font-size: $fos-m-sp;
                    color: $color-light;
                    margin-bottom: 0.5vw;
                }
            }
        }
    }
}
</style>


<script>
import AvatarImage from '../components/AvatarImage'
import StarRating from '../components/StarRating'

export default {
    layout: 'withSearchBar',
    components: {
        AvatarImage,
        StarRating
    },
    data() {
        return {
            img_src: require('@/assets/img/herts.jpg'),
            jukes: [
                {
                    img: require('@/assets/img/akita.jpg'),
                    name: '洋光塾',
                    address: '秋田県秋田市手形学園町1-1',
                    rate: 4.7,
                    id: 'hiromitu'
                },
                {
                    img: require('@/assets/img/aiu.jpg'),
                    name: '村上塾',
                    address: '秋田県秋田市雄和椿川奥椿岱１９３−２',
                    rate: 4.1,
                    id: 'murakami'
                },
            ]
        }
    },
    methods: {
        to_juke_page(id) {
            console.log(id)
            this.$router.push({path: id})
        }
    }

}
</script>