<!--Album View Component-->


<template>
    <div id="category-albums">

        <router-link :to="`/album/${album._key}`" tag="div" class="album" v-for="album in albums">
            <div class="album-image">
                <img :src="album.photos[0]" alt="">
                <span class="album-title">{{album.title}}</span>
            </div>
        </router-link>
        <span v-if="albums.length == 0" id="empty">No Albums</span>
    </div>
</template>

<script>
    export default {
        props: ['albums']
    }
</script>

<style scoped>
    #category-albums {
        width: 100%;
    }
    
    .album {
        margin-bottom: 10px;
        position: relative;
        cursor: pointer;
    }
    
    .album-image {
        height: 65vw;
    }
    
    .album-image img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    
    .album-title {
        position: absolute;
        left: 1.5rem;
        bottom: 0.8rem;
        color: whitesmoke;
        font-size: 1.4rem;
        text-shadow: 0 0 2px gray;
        font-family: "Lantinghei SC", "Lantinghei TC", Arial, serif;
    }
    
    @media only screen and (min-width: 500px) {
        #category-albums {
            width: 99vw;
            margin: 0 auto;
        }
        #category {
            margin: 0 auto;
            display: block;
            overflow: hidden;
        }
        .album {
            width: 23.95vw;
            height: 23.95vw;
            margin: .4vw;
            float: left;
        }
        .album-image {
            width: 100%;
            height: 100%;
        }
        #category-albums {
            width: 99vw;
            margin: 0 auto;
        }
    }
    
    #empty {
        width: 100%;
        display: block;
        color: #999;
        text-align: center;
        font-family: "Lantinghei SC", "Lantinghei TC", Arial, serif;
        clear: both;
    }
</style>