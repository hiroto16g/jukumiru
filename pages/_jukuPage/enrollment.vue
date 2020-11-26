<template>
    <div class="enrollment">
        <div class="title">
            洋光塾へのお申し込み
        </div>

        <div class="items">
            <div class="item">
                <div class="item_name">
                    お申し込み内容
                </div>
                <select name="" id="">
                    <option value="">コースを選択</option>
                    <option value="">普通授業</option>
                    <option value="">夏期講習</option>
                    <option value="">資料請求</option>
                </select>
            </div>
            <div class="item">
                <div class="item_name">
                    お子様のお名前
                </div>
                <input type="text">
            </div>
            <div class="item">
                <div class="item_name">
                    学年
                </div>
                <select name="" id="">
                    <option value="">学年を選択</option>
                    <option value="">小学校1年生</option>
                    <option value="">小学校2年生</option>
                    <option value="">小学校3年生</option>
                    <option value="">小学校4年生</option>
                    <option value="">小学校5年生</option>
                    <option value="">小学校6年生</option>
                    <option value="">中学校1年生</option>
                    <option value="">中学校2年生</option>
                    <option value="">中学校3年生</option>
                    <option value="">高校1年生</option>
                    <option value="">高校2年生</option>
                    <option value="">高校3年生</option>
                </select>
            </div>
            <div class="item">
                <div class="item_name">
                    保護者の方のお名前
                </div>
                <input type="text">
            </div>
            <div class="item">
                <div class="item_name">
                    保護者の方のメールアドレス
                </div>
                <input type="email">
            </div>
        </div>
        
        <div class="submit">
            <LinkButton text="この内容で申し込む" class="--fill" :url="'/' + $store.state.juku.id" />
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .enrollment {
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
                    margin-bottom: 0.7vw;
                }

                input,
                textarea {
                    border: solid thin $color-normal;
                    border-radius: 1vw;
                    padding: 3vw 3vw 2.8vw;
                    width: 100%;
                    font-size: $fos-2l-sp;
                }

                textarea {
                    height: 10vh;
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
    .enrollment {
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
                    font-size: $fos-l-pc;
                }

                textarea {
                    height: 100px;
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