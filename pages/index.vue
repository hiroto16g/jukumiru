<template>
    <div class="index">
        <button @click="getLocation" class="find_house">現在地から塾をさがす</button>
    </div>
</template>

<style lang="scss">
    .index {
        text-align: center;
        .find_house {
            border: none;
            background: $color-brand;
            padding: 3vw;
            border-radius: 5vw;
            margin-top: 20vw;
        }
        
    }
</style>

<script>
export default {
    layout: 'withSearchBar',
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
            this.$router.push('result')
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
        return_city(a) {
            this.city = a
        },
        // async get_city_name() {
        //     const url = 'http://geoapi.heartrails.com/api/json?method=getCities'
        //     const res = await this.$axios.$get(url, {
        //         params: {
        //             prefecture: '秋田県'
        //         }
                
        //     })
        //     return {'axios_data': res}
        // }
}
</script>