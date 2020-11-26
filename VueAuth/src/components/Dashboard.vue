<template>
    <div>    
        <h2 style="color:black;">Dashboard</h2>    
        <h1>{{ user.name }}</h1>
        <!-- <p>Name: {{ user.name }}</p>     -->
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    
    export default {    
        name: "Dashboard",
        data() {    
            return {   
                user:[]
            }    
        },
        methods: {    
            
            getUserData: function() {    
                // let self = this    
                // axios.get("http://localhost:8081/")    
                //     .then((response) => {    
                //         console.log(response)    
                //         self.$set(this, "user", response.data)    
                //     })        
                this.user= auth2.currentUser.get().getBasicProfile()
            }    
        },    
        mounted() {    
            this.getUserData()    
        }    
    }
</script>
