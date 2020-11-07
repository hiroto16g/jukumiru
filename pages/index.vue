<template>
    <div class="index">
        <LinkButton text="現在地から塾をさがす" class="--fill" url="result" :preprocessing="getLocation" />
    </div>
</template>

<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .index {
        text-align: center;
        
        .link_button {
            font-size: $fos-2l-sp;
            margin-top: 20vh;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .index {
        text-align: center;
        margin-top: 250px;
        
        .link_button {
            font-size: 30px;
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
    },
    data() {
        return {
            latitude: 0,
            longitude: 0,
            city: ''
        }
    },
    methods: {
        getLocation () {
            // if (process.client) {
            //     if (!navigator.geolocation) {
            //         alert('現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。')
            //         return
            //     }

            //     const options = {
            //         enableHighAccuracy: false,
            //         timeout: 5000,
            //         maximumAge: 0
            //     }

            //     navigator.geolocation.getCurrentPosition(this.success, this.error, options)
            // }
        },
        success (position) {
            this.$store.commit('save_geo_location', position.coords.latitude, position.coords.longitude)
            this.$router.push('result')
        },
        error (error) {
            switch (error.code) {
                case 1: //PERMISSION_DENIED
                    alert('位置情報の利用が許可されていません。\n設定を変更してからもう一度ご利用ください')
                    break
                case 2: //POSITION_UNAVAILABLE
                    alert('現在位置が取得できませんでした')
                    break
                case 3: //TIMEOUT
                    alert('タイムアウトになりました')
                    break
                default:
                    alert('現在位置が取得できませんでした')
                    break
                }
            }
    },
    fetch({ redirect }) {
        redirect(301, '/result')
    }
}
</script>