<template>
    <div id="album">
        <h1 id="album-title">{{album.title}}</h1>
        <album-info :content="album.content"></album-info>
        <photo-list :photos="album.photos"></photo-list>
    </div>
</template>
<script>
    import AlbumInfo from '../component/AlbumInfo.vue'
    import Album from '../model/Album.js'
    import PhotoList from '../component/PhotosList.vue'

    export default {
        name: 'AlbumPage',
        data(){
            return {
                album: {}
            }
        },
        components:{
            AlbumInfo,
            PhotoList
        },
        mounted(){
            this.$nextTick(function (){
                Album.loadIfNotInit()
                    .then(() => Album.fetch(this.$route.params.key))
                    .then(res => res.getCacheData())
                    .then(album => {
                        this.album = album
                    })
            })
        }
    }
</script>
<style scoped>
    #album {
        width: 100%;
        display: block;
    }
    
    #album-title {
        margin: 0;
        display: block;
        padding: 3px 0 3px 1rem;
        border-left: 5px solid #333;
        font-family: "Lantinghei SC", "Lantinghei TC", Arial, serif;
        background: white;
    }
    
    #back {
        color: #666;
        cursor: pointer;
        padding: 1rem 0 1rem .5rem;
        line-height: 1rem;
        font-family: Arial;
        text-decoration: none;
        display: block;
        background: white;
    }
    
    #back .icon-arrow-left {
        vertical-align: middle;
    }
    
    @media only screen and (min-width: 500px) {
        #album {
            width: 85%;
            margin: 0 auto;
        }
        #back {
            width: 63.75vw;
            display: inline-block;
        }
        #album-title {
            width: 63.75vw;
            display: inline-block;
        }
    }
</style>