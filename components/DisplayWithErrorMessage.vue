<template>
    <div class="display_with_error_message">
        <slot></slot>
        <ErrorMessage :error_message="error_message" />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .display_with_error_message {
        .error_message {
            margin-top: 1vw;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .display_with_error_message {
        .error_message {
            margin-top: 5px;
        }
    }
}
</style>


<script>
import ErrorMessage from '@/components/ErrorMessage'

export default {
    components: {
        ErrorMessage
    },
    props: {
        error_message: {
            type: String,
            required: false
        }
    }
}
</script>