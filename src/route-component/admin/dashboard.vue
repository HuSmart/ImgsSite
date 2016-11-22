<template>
    <div id="dashboard">
        <div class="page-header">
            <h1>Filmy</h1>
        </div>
        <div class="row">
            <div class="col-md-4 dashboard-number">
                <router-link to="/category" tag="h1">{{numbers.categories}}</router-link>
                <p>{{'number of categories'}}</p>
            </div>
            <div class="col-md-4 dashboard-number">
                <router-link to="/album" tag="h1">{{numbers.albums}}</router-link>
                <p>{{'number of albums'}}</p>
            </div>
            <div class="col-md-4 dashboard-number">
                <h1>{{numbers.photos}}</h1>
                <p>{{'number of photos'}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Category from '../../model/Categories.js'
    import Album from '../../model/Album.js'

    export default {
        data(){
            return {
                numbers: {
                    categories:0,
                    albums:0,
                    photos:0
                },
                categories:[]
            }
        },
        mounted(){
            Promise.all([
                Category.loadIfNotInit()
                    .then(() => Category.dump()),
                Album.loadIfNotInit()
                    .then(() => Album.dump())
            ])
            .then( ([categories, albums]) =>   {
                this.numbers.categories = categories.length
                this.numbers.albums = albums.length
                this.numbers.photos = albums.map(album => album.photos.length).reduce( (a, b) => a + b)
            })
        }
    }
</script>
<style scoped>
    .dashboard-number {
        text-align: center;
        padding: 5px 0;
        border-right: 1px solid #CCC;
    }
    
    .dashboard-number:last-child {
        border-right: none;
    }
    
    .dashboard-number h1 {
        font-size: 5rem;
    }
    
    .dashboard-number p {
        font-size: 1.7rem;
    }
</style>