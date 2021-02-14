<template>
    <div class="input_one_line">
        <input type="text" @keyup="keyup">
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .input_one_line {
        input {
            border: solid thin $color-normal;
            border-radius: 1vw;
            padding: 3vw 3vw 2.8vw;
            width: 100%;
            font-size: $fos-2l-sp;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .input_one_line {
        input {
            border: solid thin $color-normal;
            border-radius: 5px;
            padding: 10px 15px 10px;
            width: 100%;
            font-size: $fos-l-pc;
        }
    }
}
</style>


<script>
export default {
    methods: {
        keyup() {
            
        }
    }
}
</script>