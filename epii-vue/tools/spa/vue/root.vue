<template>
  <div>
    <transition mode="out-in">
      <keep-alive>
        <router-view v-if="needKeep" :key="key"></router-view>
      </keep-alive>
    </transition>
    <transition mode="out-in">
      <router-view v-if="!needKeep" :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  login: false,
  computed: {
    key() {
      return this.$route.fullPath;
    }
  },
  name: "root",
  data() {
    return {
      transitionName: "",
      is_loading: true,
      needKeep: ""
    };
  },
  props: {},
  watch: {
    $route(to, from) {
      if (to.matched[0].components.default.keepAlive) {
        this.needKeep = true;
      } else {
        this.needKeep = false;
      }
      if (to.meta.page_next === from.fullPath) {
        to.meta.page_next = null;
        this.transitionName = "slide-right";
        from.meta.page_pre = null;
      } else {
        to.meta.page_pre = from.fullPath;
        this.transitionName = "slide-left";
        from.meta.page_next = to.fullPath;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.is_loading = false;
    }, 3000);
  }
};
</script>
<style scoped="scoped"  >
.view {
  width: 100%;
  position: absolute;
}
.v-enter-active {
  transition: all 0.1s ease;
  transition-delay: 0.1s;
}
.v-leave-active {
  transition: all 0.1s ease;
}
</style> 