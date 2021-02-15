<template>
    <div class="base_textarea">
        <textarea :value="value" @keyup="$emit('keyup', $event.target.value)"></textarea>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .base_textarea {
        textarea {
            border: solid thin $color-normal;
            border-radius: 1vw;
            padding: 3vw 3vw 2.8vw;
            width: 100%;
            font-size: $fos-l-sp;
            height: 10vh;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .base_textarea {
        textarea {
            border: solid thin $color-normal;
            border-radius: 5px;
            padding: 10px 15px 10px;
            width: 100%;
            font-size: $fos-ml-pc;
            height: 100px;
        }
    }
}
</style>


<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    model: {
        prop: 'value',
        event: 'keyup'
    }
}
</script>