<template>
    <div class="display_with_title_and_error">
        <div class="title">
            {{ title }}
        </div>
        <slot></slot>
        <ErrorMessage :error_message="error_message" />
    </div>
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .display_with_title_and_error {
        .title {
            font-size: $fos-l-sp;
            margin-bottom: 0.7vw;
        }

        .error_message {
            margin-top: 1vw;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .display_with_title_and_error {
        .title {
            font-size: $fos-ml-pc;
            margin-bottom: 5px;
        }

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
        title: {
            type: String,
            required: true,
            default: 'default title'
        },
        error_message: {
            type: String,
            required: false
        }
    }
}
</script>