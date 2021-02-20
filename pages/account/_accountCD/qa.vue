<template>
    <div class="account_qa">
        <div class="container">
            <div class="item" v-for="(item, i) in items" :key="i">
                <DisplayWithErrorMessage :error_message="item.title.em" class="title">
                    <BaseInput v-model="item.title.data"></BaseInput>
                </DisplayWithErrorMessage>
                <DisplayWithErrorMessage :error_message="item.content.em" class="content">
                    <BaseTextarea v-model="item.content.data"></BaseTextarea>
                </DisplayWithErrorMessage>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .account_qa {
        .container {
            margin: 0 $margin-side-sp;

            .item {
                margin-bottom: 7vw;

                .title {
                    margin-bottom: 2vw;
                }

                .content {
                    margin-left: $margin-side-sp;

                    textarea {
                        font-size: $fos-m-sp;
                        line-height: 1.5;
                        height: 30vw;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .account_qa {
        .container {
            max-width: 768px;
            width: 80%;
            margin: 0 auto;

            .item {
                margin-bottom: 30px;

                .title {
                    margin-bottom: 10px;
                    margin-right: 50%;
                }

                .content {
                    margin-left: 30px;
                    
                    textarea {
                        font-size: $fos-m-pc;
                        line-height: 1.5;
                        height: 150px;
                    }
                }
            }
        }
    }
}
</style>


<script>
export default {
    layout: 'accountPage',
    data() {
        return {
            items: [
                {
                    title:{
                        data: '対象',
                        em: ''
                    },
                    content:{
                        data: '小学生、中学生、高校生',
                        em: ''
                    }
                },
                {
                    title:{
                        data: '授業時間',
                        em: ''
                    },
                    content:{
                        data: '下記からお好きな曜日、時間を選べます！\n(1コマ50分、休憩10分)\n\n火曜日～土曜日\n・1コマ目：9:00 ~ 9:50\n・2コマ目：10:00 ~ 10:50\n・3コマ目：11:00 ~ 11:50',
                        em: ''
                    }
                }
            ]
        }
    },
    computed: {
    }
}
</script>