export const state = () => ({
    lat: 0,
    lon: 0
})

export const mutations = {
    save_geo_location(state, lat, lon) {
        state.lat = lat
        state.lon = lon
    }
}