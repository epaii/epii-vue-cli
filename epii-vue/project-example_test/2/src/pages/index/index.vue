<template>
	<epii-loading>
    <div>
        <div>{{title}} </div>
        <button @click="submit"> alert</button>
        <br>
        <a href="/#/index.html/a">spa-test</a>  
        <br> 
        <a href="index.html/#/a">mpa-test</a>   
    </div>
	</epii-loading>
</template>

<script>
	export default {
		data() {
			return {
				title: "主要功能:  1、Eapp 的基础实现 2、页面基础加载epii-loading 3、软件更新功能 4、config配置 "
			}
		},
		mounted() {
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
 
