<template>
    <div class="inquiry">
        <div class="title">
            {{ $store.state.juku.juku.name }}へのお問い合わせ
        </div>

        <div class="items">
            <div class="item">
                <div class="item_name">
                    お名前
                </div>
                <input type="text" v-model="user_nm">
            </div>
            <div class="item">
                <div class="item_name">
                    メールアドレス
                </div>
                <input type="email" v-model="user_email">
            </div>
            <div class="item">
                <div class="item_name">
                    お申し込み内容
                </div>
                <textarea id="inquiry_content" v-model="note"></textarea>
            </div>
        </div>
        
        <div class="submit">
            <LinkButton text="この内容で問い合わせる" class="--fill" :url="'/' + $store.state.juku.id" @click.native="send_qa_mail" />
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .inquiry {
        margin: 5vh $margin-side-sp;
        .title {
            font-size: $fos-3l-sp;
            margin-bottom: 10vw;
        }

        .items {
            margin-bottom: 8vw;
            .item {
                margin-top: 7vw;

                .item_name {
                    font-size: $fos-l-sp;
                    margin-bottom: 1.3vw;
                }

                input,
                textarea {
                    border: solid thin $color-normal;
                    border-radius: 1vw;
                    padding: 3vw 3vw 2.8vw;
                    width: 100%;
                    font-size: $fos-l-sp;
                }

                textarea {
                    height: 40vw;
                }
            }
        }

        .submit {
            text-align: center;

            .link_button {
                font-size: $fos-2l-sp;
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .inquiry {
        margin: 100px auto 300px;
        width: 600px;

        .title {
            font-size: $fos-3l-pc;
            margin-bottom: 50px;
        }

        .items {
            margin-bottom: 70px;
            .item {
                margin-top: 30px;

                .item_name {
                    font-size: $fos-ml-pc;
                    margin-bottom: 5px;
                    letter-spacing: 0.04em;
                }

                input,
                textarea {
                    border: solid thin $color-normal;
                    border-radius: 5px;
                    padding: 10px 15px 10px;
                    width: 100%;
                    font-size: $fos-ml-pc;
                }

                input {
                    height: 45px;
                }

                textarea {
                    height: 200px;
                }
            }
        }

        .submit {
            text-align: center;

            .link_button {
                font-size: $fos-2l-pc;
            }
        }
    }
}
</style>


<script>
import LinkButton from '@/components/LinkButton'

import firebase from '@/plugins/firebase'

export default {
    components: {
        LinkButton
    },
    data(){
        return {
            user_nm: "",
            user_email: "",
            note: "",
        }
    },
    methods: {
        send_qa_mail(){
            var input_params = {
                juku_nm: this.$store.state.juku.juku.name,
                juku_email: this.$store.state.juku.juku.email,
                user_nm: this.user_nm,
                user_email: this.user_email,
                note: this.note,
            }
            this.$store.dispatch('juku/send_qa_mail', input_params)
        }
    },
    beforeMount() {
        if (!this.$store.state.juku.id) {
            const storage = firebase.storage().ref()

            this.$store.commit('result/get_basic_jukus_info')

            const id = this.$route.path.split('/')[1]

            storage.child('avatar_imgs/' + id + '.jpg').getDownloadURL().then(url => {
                this.$store.commit('juku/set_img', url)
            })

            storage.child('thumbnails/' + id).listAll().then(result => {
                result.items.forEach(item => {
                    item.getDownloadURL().then(url => {
                        let thumb = {}
                        this.$set(thumb, 'img', url)
                        let name = item.location.path.split('/').slice(-1)[0].split('.')[0]
                        this.$set(thumb, 'name', name)
                        this.$store.commit('juku/set_thumbs', thumb)
                    })
                })
            })

            this.$store.commit('juku/set_juku', this.$store.state.result.jukus[id])
            this.$store.commit('juku/set_id', id)
        }
    }
}
</script>