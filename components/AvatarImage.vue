<template>
    <img :src="src" alt="" class="avatar_image">
</template>


<style lang="scss">
@media screen and (max-width: $max-width-sp) {
    .avatar_image {
        border-radius: 50%;
        object-fit: cover;

        &.--l {
            width: 22vw;
            height: 22vw;
        }

        &.--m {
            width: 10vw;
            height: 10vw;
        }

        &.--s {
            width: 9vw;
            height: 9vw;
        }
    }
}

@media screen and (min-width: $min-width-pc) {
    .avatar_image {
        border-radius: 50%;
        object-fit: cover;

        &.--l {
            width: 80px;
            height: 80px;
        }

        &.--m {
            width: 55px;
            height: 55px;
        }

        &.--s {
            width: 40px;
            height: 40px;
        }
    }
}

</style>


<script>
export default {
    props: {
        src: {
            require: true,
            default: '',
            type: String
        }
    }
}
</script>