<template>
    <div class="short_movie">
        <video :src="video" autoplay playsinline ref="video"></video>

        <div class="control_modal" v-show="is_paused">
            <div class="play_button">
                <img src="@/assets/icons/play_arrow.svg" alt="">
            </div>
        </div>

        <div class="control_panel">
            <div class="play" @click="toggle_play"></div>
        </div>
        
        <div class="juku_info">
            <AvatarImage :src="this.$store.state.juku.img" class="--m" @click.native="to_juku_page" />
            <div class="juku_name" @click="to_juku_page">{{ this.$store.state.juku.name }}</div>
            <LinkButton text="お申し込み" class="--fill" @click.native="to_enrollment" />
        </div>
        <div class="overview">
            {{ overview }}
        </div>
        <div class="thumbs">
            <div class="thumb" v-for="(thumb, i) in thumbs" :key="i" @click="to_movie_page">
                <img :src="thumb" alt="" class="thumb__img">
            </div>
        </div>
        

    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .short_movie {
        margin-bottom: 20vh;
        video {
            width: 100vw;
        }

        .control_modal {
            background: $color-modal;
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: calc(100vw * 16 / 9);

            .play_button {
                position: absolute;
                left: 50%;
                top: 35vh;
                transform: translate(-50%, 0);

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
                height: calc(100vw * 16 / 9);
                position: absolute;
                top: 0;
                left: 20vw;
            }
        }

        .juku_info {
            display: flex;
            margin: 5vw $margin-side-sp;
            align-items: center;

            .juku_name {
                margin-left: 3vw;
            }

            .link_button {
                margin-left: auto;
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
}
</style>


<script>
import AvatarImage from '@/components/AvatarImage'
import LinkButton from '@/components/LinkButton'

export default {
    components: {
        AvatarImage,
        LinkButton
    },
    data() {
        return {
            video: require('@/assets/video/sample.mp4'),
            is_paused: true,
            overview: '村上塾の最初の動画です！村上塾のことが少しでも皆さんに伝わったらうれしいです！塾を回って解説してくれているのは弊塾の塾長、佐藤洋光（さとうひろみつ）先生です！とっても明るくて面白くて人気の先生です！',
            thumbs: this.$store.state.juku.thumbs,
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
        to_movie_page() {
            this.$router.push('./shortMovie/sample')
        },
        to_enrollment() {
            this.$router.push('/enrollment')
        },
        to_juku_page() {
            this.$router.push('/hiromitu')
        }
    }
}
</script>