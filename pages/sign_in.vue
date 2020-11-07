<template>
    <div class="sign_in">
        <div class="add_items" @click="add_items">
            <button>add</button>
        </div>
        <div class="inputs">
            <div class="item" v-for="(i, j) in items" :key="j">
                <input type="text" v-model="i.title"><br>
                <textarea name="" id="" cols="30" rows="10" v-model="i.text"></textarea>
            </div>
        </div>
        <div class="save">
            <button @click="save_items">save</button>
        </div>
        {{json}}
        <button @click="generate_qrcord">generate qrcord</button><br>
        <canvas id="qr" :width="canvas_size.width" :height="canvas_size.height"></canvas>
    </div>
</template>


<style>
#qr {
    border: solid thin #ddd;
    margin: 10px;
}
</style>


<script>
import firebase from '@/plugins/firebase'
import axios from 'axios'
import QRCord from 'qrcode'

export default {
    data() {
        return {
            items: [
                {
                    title: '',
                    text: ''
                }
            ],
            item: {
                title: '',
                text: ''
            },
            json: '',
            qr_url: null,
            canvas_size: {
                width: 250,
                height: 250
            },
            logo_size: {
                width: 80,
                height: 80
            }
        }
    },
    methods: {
        add_items() {
            this.items.push(this.item)
        },
        save_items() {
            let save_ref = firebase.storage().ref().child('json_source/test_1/info.json')
            const file = new Blob([JSON.stringify(this.items)], {type: 'application/json'})
            save_ref.put(file).then(snapshot => {
                alert('uploaded')
            })
        },
        async generate_qrcord() {
            await QRCord.toDataURL('192.168.0.23' + this.$route.path, { errorCorrectionLevel: 'H' })
                .then(url => {
                    this.qr_url = url
                })
                .catch(err => {
                    console.error(err)
                })
            this.draw_qrcord()
        },
        draw_qrcord() {
            const canvas = document.getElementById('qr')
            const ctx = canvas.getContext('2d')
            const qr_img = new Image()
            qr_img.src = this.qr_url
            qr_img.onload = () => {
                ctx.drawImage(
                    qr_img,
                    0,
                    0,
                    this.canvas_size.width,
                    this.canvas_size.height
                )
            }

            const logo_img = new Image()
            logo_img.src = require('@/assets/img/logo_icon_white.png')
            logo_img.onload = () => {
                ctx.drawImage(
                    logo_img,
                    (this.canvas_size.width - this.logo_size.width) / 2,
                    (this.canvas_size.height - this.logo_size.height) / 2,
                    this.logo_size.width,
                    this.logo_size.height
                )
            }
        }
    },
    beforeMount() {
        // const storage = firebase.storage().ref()
        // storage.child('json_source/test_1/info.json').getDownloadURL().then(url => {
        //     return axios.get(url)
        // }).then (res => {
        //     this.json = res
        // })
    }
}
</script>