<template>
    <div class="with_search_bar">
        <div class="search_head">
            <div class="back"></div>
            <input type="text" class="input_search" placeholder="地名・塾名・志望校で検索">
            <div class="cancel">キャンセル</div>
        </div>
        <Nuxt />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .with_search_bar {
        padding-top: 100px;
        .search_head {
            position: fixed;
            display: flex;
            top: 0;
            width: 100vw;
            justify-content: space-around;
            align-items: center;
            padding: 3vw;

            .back {
                width: 3vw;
                height: 3vw;
                border-top: solid 0.5vw $color-light;
                border-left: solid 0.5vw $color-light;
                transform: rotate(-45deg);
                margin-right: 2vw;
            }

            .input_search {
                font-size: 3.6vw;
                padding: 3vw;
                width: 70vw;
                border-radius: 2.5vw;
                border: none;
                background: #f0f0f0;

                &::placeholder {
                    font-size: 3.6vw;
                    color: $color-light;
                }
            }

            .cancel {
                font-size: 3.4vw;
                margin-left: 1vw;
            }
        }
    }
}
</style>