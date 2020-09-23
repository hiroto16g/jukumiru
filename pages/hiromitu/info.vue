<template>
    <div class="jp__info">
        <div class="target_grade wrapper">
            <div class="title">
                対象
            </div>
            <div class="text">
                小学生、中学生、高校生
            </div>
        </div>
        <div class="class_format wrapper">
            <div class="title">
                授業形式
            </div>
            <div class="text">
                個別指導、完全個別指導、映像授業、オンライン授業
            </div>
        </div>
        <div class="class_time wrapper">
            <div class="title">
                授業時間
            </div>
            <div class="text">
                下記からお好きな曜日、時間を選べます！<br>
                (1コマ50分、休憩10分)<br>
                <br>
                火曜日～土曜日<br>
                ・1コマ目：9:00 ~ 9:50 <br>
                ・2コマ目：10:00 ~ 10:50 <br>
                ・3コマ目：11:00 ~ 11:50 <br>
                ・4コマ目：13:00 ~ 13:50 <br>
                ・5コマ目：14:00 ~ 14:50 <br>
                ・6コマ目：15:00 ~ 15:50 <br>
                ・7コマ目：16:00 ~ 16:50 <br>
                ・8コマ目：17:00 ~ 17:50 <br>
                ・9コマ目：18:00 ~ 18:50 <br>
                ・10コマ目：19:00 ~ 19:50
            </div>
        </div>
        <div class="wrapper">
            <div class="title">
                主な講師層
            </div>
            <div class="text">
                秋田大学
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .jp__info {
        margin-bottom: 10vh;
        .wrapper {
            margin: 0 $margin-side-sp 5vw;
            color: $color-normal;

            .title {
                font-size: $fos-l-sp;
                margin-bottom: 1vw;
            }

            .text {
                font-size: $fos-m-sp;
                margin-left: 5vw;
                line-height: 1.5;
            }
        }
    }
}
</style>


<script>
export default {
    layout: 'jukuPage',
    data() {
        return {
            thumbs: this.$store.state.juku.thumbs
        }
    },
    methods: {
    }
}
</script>