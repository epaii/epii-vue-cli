<template>
    <div>
        
        <button @click="submit"> alert</button>
        <br>
        <a href="/#/index.html/a">spa-test</a>  
        <br> 
        <a href="index.html/#/a">mpa-test</a>   
    </div>
</template>

<script>
	export default {
		data() {
			return {
				 
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.show()
				
			},3000)
			
		},
		methods: {
			submit(){
				 Eapp.ui.alert("alert in Eapp")
			}
		}
	}
</script>
 
