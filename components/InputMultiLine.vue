<template>
    <div class="input_multi_line">
        <textarea></textarea>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .input_multi_line {
        textarea {
            border: solid thin $color-normal;
            border-radius: 1vw;
            padding: 3vw 3vw 2.8vw;
            width: 100%;
            font-size: $fos-2l-sp;
            height: 10vh;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .input_multi_line {
        textarea {
            border: solid thin $color-normal;
            border-radius: 5px;
            padding: 10px 15px 10px;
            width: 100%;
            font-size: $fos-l-pc;
            height: 100px;
        }
    }
}
</style>


<script>
export default {

}
</script>