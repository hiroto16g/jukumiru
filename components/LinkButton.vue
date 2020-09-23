<template>
    <button class="link_button">{{ text }}</button>
</template>


<style lang="scss">
.link_button {
    display: inline-block;
    border: none;
    background: white;

    &.--fill {
        background: $color-brand;
        color: white;
    }

    &.--outline {
        border: solid thin $color-brand;
        color: $color-brand;
    }
}

@media screen and (max-width: $max-width-sp) {
    .link_button {
        border-radius: 8vw;
        padding: 0.5em 4vw;
    }
}
</style>


<script>
export default {
    props: {
        text: {
            require: true,
            default: 'button',
            type: String
        }
    }
}
</script>