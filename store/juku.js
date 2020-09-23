export const state = () => ({
    img: require('@/assets/img/akita.jpg'),
    name: '洋光塾',
    address: '秋田県秋田市手形学園町1-1',
    rate: 4.7,
    id: 'hiromitu',
    bio: 'ひろみつ塾です！進学校から中堅校まで、幅広くお任せください！',
    thumbs:[
        require('@/assets/img/3d.png'),
        require('@/assets/img/biseki.png'),
        require('@/assets/img/flow.png'),
        require('@/assets/img/kondo.png'),
        require('@/assets/img/napo.jpg'),
    ]
})

export const mutations = {
    save_geo_location(state, lat, lon) {
        state.lat = lat
        state.lon = lon
    }
}