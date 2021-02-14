<template>
    <div class="enrollment">
        <div class="title">
            {{ $store.state.juku.juku.name }}へのお申し込み
        </div>

        <div class="items">
            <div class="item">
                <div class="item_name">
                    お申し込み内容
                </div>
                <select v-model="course">
                    <option disabled value="">コースを選択</option>
                    <option v-for="option in course_options" v-bind:value="option.value" v-bind:key="option.text">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <div class="item">
                <div class="item_name">
                    お名前
                </div>
                <input type="text" v-model="user_nm">
            </div>
            <div class="item">
                <div class="item_name">
                    学年
                </div>
                <select name="" id="" v-model="school_grade">
                    <option disabled value="">学年を選択</option>
                    <option v-for="option in school_grade_options" v-bind:value="option.value" v-bind:key="option.text">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <div class="item">
                <div class="item_name">
                    保護者の方のお名前
                </div>
                <input type="text" v-model="parent_nm">
            </div>
            <div class="item">
                <div class="item_name">
                    保護者の方のメールアドレス
                </div>
                <input type="email" v-model="parent_email">
            </div>
        </div>
        
        <div class="submit">
            <LinkButton text="この内容で申し込む" class="--fill" :url="'/' + $store.state.juku.id" @click.native="send_introduction_mail" />
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
                    font-size: $fos-ml-pc;
                    height: 45px;
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
    data(){
        return {
            course: "",
            course_options: [
                { value: '普通授業', text: '普通授業' },
                { value: '夏期講習', text: '夏期講習' },
                { value: '資料請求', text: '資料請求' }
            ],
            course: "",
            user_nm: "",
            school_grade: "",
            school_grade_options: [
                { value: '高校1年生', text: '高校1年生' },
                { value: '高校2年生', text: '高校2年生' },
                { value: '高校3年生', text: '高校3年生' }
            ],
            parent_nm: "",
            parent_email: "",
        }
    },
    methods: {
        send_introduction_mail(){
            var input_params = {
                juku_nm: this.$store.state.juku.juku.name,
                juku_email: this.$store.state.juku.juku.email,
                course: this.course,
                user_nm: this.user_nm,
                school_grade: this.school_grade,
                parent_nm: this.parent_nm,
                parent_email: this.parent_email,
            }
            this.$store.dispatch('juku/send_introduction_mail', input_params)
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