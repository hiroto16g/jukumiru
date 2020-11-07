<template>
    <div class="short_movie">
        <div class="video" :style="{'background-image': `url(${bg_image})`}">
            <video :src="movie" playsinline ref="video"></video>

            <div class="control_modal" v-show="is_paused">
                <div class="play_button">
                    <img src="@/assets/icons/play_arrow.svg" alt="">
                </div>
            </div>

            <div class="control_panel">
                <div class="play" @click="toggle_play"></div>
            </div>

            <div class="share" @click="display_modal">
                <img src="@/assets/icons/share_white.svg" alt="">共有
            </div>
        </div>
        
        <div class="others">
            <div class="juku_info">
                <AvatarImage :src="$store.state.juku.img" class="--m" @click.native="to_juku_page" />
                <div class="juku_name" @click="to_juku_page">{{ $store.state.juku.juku.name }}</div>
                <LinkButton text="お申し込み" class="--fill" @click.native="to_enrollment" />
            </div>
            <div class="overview">
                {{ text }}
            </div>
            <div class="thumbs">
                <div class="thumb" v-for="(thumb, i) in thumbs" :key="i" @click="to_movie_page(thumb)">
                    <img :src="thumb.img" alt="" class="thumb__img">
                </div>
            </div>
        </div>

        <div class="modal sp" :class="{display: is_display}" @click.self="hide_modal">
            <div class="modal__wrapper" id="qr_wrapper">
                <div class="qr">
                    <canvas id="qr_canvas" :width="canvas_size.width" :height="canvas_size.height"></canvas>
                </div>
                <div class="link_wrapper">
                    <textarea class="link" id="page_url" :value="page_url" disabled wrap="off"></textarea>
                    <div class="copy" @click="copy_link">コピー</div>
                </div>
                <div class="close" @click="hide_modal"></div>
            </div>
        </div>

        <div class="notif" :class="{isnt_display_notif: isnt_display_notif}">
            リンクをコピーしました
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .short_movie {
        margin-bottom: 20vh;

        .video {
            // background-image: none !important;
            background-size: 100%;
            background-repeat: no-repeat;
            width: 100%;
            height: calc(100vw * 4 / 3);
            position: relative;

            video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .control_modal {
                background: $color-modal;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: calc(100vw * 4 / 3);

                .play_button {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);

                    img {
                        width: 20vw;
                    }
                }

                &.isnt_display {
                    visibility: hidden;
                } 
            }
            
            .control_panel {
                .play {
                    width: 60vw;
                    height: calc(100vw * 4 / 3);
                    position: absolute;
                    top: 0;
                    left: 20vw;
                }
            }

            .share {
                position: absolute;
                bottom: 4vw;
                right: $margin-side-sp;
                background: #0002;
                border-radius: 10vw;
                border: solid 0.5vw white;
                width: 23.4vw;
                height: 10vw;
                z-index: 9999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
                font-size: $fos-l-sp;
                padding: 0 2vw;
                box-shadow: 0 0 15px #0001;

                img {
                    width: 10vw;
                    transform: scale(-1, 1);
                }
            }
        }

        .others {
            .juku_info {
                display: flex;
                margin: 5vw $margin-side-sp;
                align-items: center;

                .juku_name {
                    margin-left: 3vw;
                }

                .link_button {
                    margin-left: auto;
                    font-size: $fos-ml-sp;
                }
            }

            .overview {
                margin: 0 $margin-side-sp 10vw;
                line-height: 1.3;
                letter-spacing: 0.04em;
            }

            .thumbs {
                display: flex;
                overflow-x: scroll;
                overflow-y: hidden;
                
                .thumb {
                    .thumb__img {
                        width: 35vw;
                        height: calc(35vw * 4 / 3);
                        object-fit: cover;
                        margin-right: 0.5vw;
                    }

                    &:first-child {
                        margin-left: $margin-side-sp;
                    }
                }
            }
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: #0005;
            z-index: 9999;
            display: none;

            .modal__wrapper {
                width: 80%;
                height: 95vw;
                background: white;
                border-radius: 1vw;
                margin: auto;
                position: absolute;
                top: 20%;
                left: 50%;
                transform: translate(-50%, 0);
                padding: 5vw 0;

                .qr {
                    #qr_canvas {
                        display: block;
                        margin: 0 auto 3vw;
                    }
                }

                .link_wrapper {
                    width: calc(80%);
                    border: solid thin $color-border;
                    border-radius: 2vw;
                    display: flex;
                    align-items: center;
                    margin: auto;
                    position: relative;

                    .link {
                        width: 70%;
                        font-size: $fos-l-sp;
                        padding: 2.5vw 0 0 4vw;
                        overflow-x: scroll;
                        border: none;
                        position: absolute;
                        top: 0;
                    }

                    .copy {
                        background: $color-normal;
                        color: white;
                        width: 30%;
                        padding: 2.5vw 4vw;
                        margin-left: auto;
                        height: 100%;
                        border-radius: 0 2vw 2vw 0;
                        text-align: center;
                    }
                }

                .close {
                    background: white;
                    position: absolute;
                    bottom: -20vw;
                    left: 50%;
                    transform: translate(-50%, 0);
                    font-size: $fos-l-sp;
                    border-radius: 50%;
                    width: 14vw;
                    height: 14vw;

                    &::before, &::after {
                        background: $color-light;
                        width: 8vw;
                        height: 0.8vw;
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        border-radius: 3vw;
                    }

                    &::before {
                        transform: translate(-50%, -50%) rotate(45deg);
                    }

                    &::after {
                        transform: translate(-50%, -50%) rotate(-45deg);
                    }
                }
            }

            &.display {
                display: block;
            }
        }

        .notif {
            width: 90vw;
            padding: 4vw 6vw;
            border-radius: 2vw;
            background: white;
            position: fixed;
            bottom: 4vw;
            left: 50%;
            transform: translate(-50%, 0);
            box-shadow: 0 0 5px 5px #0002;
            font-size: $fos-ml-sp;

            &.isnt_display_notif {
                display: none;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .short_movie {
        margin-bottom: 50px;

        .video {
            width: calc(100vw - 600px);
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: center center / cover no-repeat;

            &::before {
                content: '';
                background-color: rgba(22,24,35,0.5);
                width: 100%;
                height: 100vh;
                position: absolute;
                backdrop-filter: blur(10px);
            }

            video {
                width: calc(100vh * 9 / 16);
                height: 100vh;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, 0);
            }

            .control_modal {
                background: $color-modal;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, 0);
                width: calc(100vh * 9 / 16);
                height: 100vh;

                .play_button {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);

                    img {
                        width: 90px;
                    }
                }

                &.isnt_display {
                    visibility: hidden;
                } 
            }
            
            .control_panel {
                cursor: pointer;
                
                .play {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, 0);
                    width: calc(100vh * 9 / 16);
                    height: 100vh;
                }
            }
        }

        .others {
            width: 600px;
            height: 100vh;
            overflow-y: scroll;
            position: absolute;
            top: 0;
            right: 0;
            padding: 50px 30px;

            .juku_info {
                display: flex;
                margin-bottom: 20px;
                align-items: center;

                .avatar_image {
                    cursor: pointer;
                }

                .juku_name {
                    margin-left: 10px;
                    cursor: pointer;
                }

                .link_button {
                    margin-left: auto;
                }
            }

            .overview {
                margin-bottom: 40px;
                padding-bottom: 30px;
                border-bottom: solid thin $color-border;
                line-height: 1.3;
                letter-spacing: 0.04em;
            }

            .thumbs {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                
                .thumb {
                    cursor: pointer;

                    .thumb__img {
                        width: 172px;
                        height: calc(172px * 4 / 3);
                        object-fit: cover;
                    }
                }

                &::after {
                    width: 172px;
                    content: '';
                }
            }
        }
    }
}

@media screen and (max-width: 1400px) and (min-width: $min-width-pc) {
    .short_movie {
        .video {
            width: calc(100vw - 600px);
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: center center / cover no-repeat;

            &::before {
                content: '';
                background-color: rgba(22,24,35,0.5);
                width: 100%;
                height: 100vh;
                position: absolute;
                backdrop-filter: blur(10px);
            }

            video {
                width: calc(100vw - 860px);
                height: calc((100vw - 860px) * 16 / 9);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .control_modal {
                background: $color-modal;
                width: calc(100vw - 860px);
                height: calc((100vw - 860px) * 16 / 9);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                .play_button {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);

                    img {
                        width: 90px;
                    }
                }

                &.isnt_display {
                    visibility: hidden;
                } 
            }
            
            .control_panel {
                .play {
                    width: calc(100vw - 860px);
                    height: calc((100vw - 860px) * 16 / 9);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
}
</style>


<script>
import AvatarImage from '@/components/AvatarImage'
import LinkButton from '@/components/LinkButton'
import QRCord from 'qrcode'

export default {
    layout: 'shortMovieLayout',
    components: {
        AvatarImage,
        LinkButton
    },
    data() {
        return {
            is_paused: true,
            is_display: false,
            isnt_display_notif: true,
            qr_url: null,
            page_url: null,
            canvas_size: {
                width: 220,
                height: 220
            },
            logo_size: {
                width: 50,
                height: 50
            }
        }
    },
    computed: {
        bg_image() {
            return this.$store.state.short_movie.bg_img
        },
        thumbs() {
            return this.$store.state.juku.thumbs
        },
        id() {
            return this.$store.state.juku.id
        },
        movie() {
            return this.$store.state.short_movie.movie
        },
        text() {
            return this.$store.state.short_movie.text
        },
        is_Apple() {
            const ua = [
                "iPod",
                "iPad",
                "iPhone"
            ]
            
            for (let i = 0; i < ua.length; i++) {
                if (navigator.userAgent.indexOf(ua[i]) > 0) {
                    return true
                }
            }

            return false
        }
    },
    methods: {
        toggle_play() {
            if (this.$refs.video.paused) {
                this.$refs.video.play()
            } else {
                this.$refs.video.pause()
            }
            this.is_paused = this.$refs.video.paused
        },
        to_movie_page(thumb) {
            this.$router.push('/' + this.id + '/shortMovie/' + thumb.name)
        },
        to_enrollment() {
            this.$router.push('/' + this.id + '/enrollment')
        },
        to_juku_page() {
            this.$router.push('/' + this.$store.state.juku.id)
        },
        display_modal() {
            this.is_display = true
            this.set_page_url()
            this.generate_qrcord()
        },
        hide_modal() {
            this.is_display = false
        },
        copy_link() {
            if (this.is_Apple) {
                const link = document.querySelector('#page_url')
                link.select()
                document.execCommand('copy')
                window.getSelection().removeAllRanges();
            } else {
                if(navigator.clipboard){
                    navigator.clipboard.writeText(this.page_url);
                }
            }
            
            this.hide_modal()
            this.isnt_display_notif = false
            setTimeout(() => {this.isnt_display_notif = true}, 2000)
        },
        set_page_url() {
            this.page_url = location.origin + this.$route.path
        },
        async generate_qrcord() {
            await QRCord.toDataURL(this.page_url, { errorCorrectionLevel: 'H' })
                .then(url => {
                    this.qr_url = url
                })
                .catch(err => {
                    console.error(err)
                })
            this.draw_qrcord()
        },
        draw_qrcord() {
            const wrapper = document.getElementById('qr_wrapper')
            const canvas_size = wrapper.clientWidth * 0.8
            this.canvas_size.width = canvas_size
            this.canvas_size.height = canvas_size

            const canvas = document.getElementById('qr_canvas')
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
    }
}
</script>