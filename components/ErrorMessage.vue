<template>
    <div class="error_message">
        {{ error_message }}
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .error_message {
        font-size: $fos-ms-sp;
        color: $color-error;
    }
}

@media screen and (min-width: $min-width-pc) {
    .error_message {
        font-size: $fos-ms-pc;
        color: $color-error;
    }
}
</style>


<script>
export default {
    props: {
        error_message: {
            type: String,
            required: false
        }
    }
}
</script>