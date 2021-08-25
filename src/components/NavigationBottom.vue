<template>
  <footer
    id="footer"
    class="fixed w-full bottom-0 left-0 bg-white pt-4 p-b-safe-4"
  >
    <div class="container mx-auto px-8 h-full">
      <ul class="flex justify-between h-full items-center">
        <li v-for="navItem in navItems" :key="navItem.icon">
          <router-link :to="{ name: navItem.name, params: {} }">
            <i class="t2ico text-2xl" :class="navItem.icon"></i>
          </router-link>
        </li>
      </ul>
    </div>

    <div
      data-circle
      class="top-0 absolute left-1/2 transform -translate-x-1/2"
    ></div>
    <div
      data-circle-inset
      class="
        absolute
        flex
        items-center
        justify-center
        bg-primary
        text-white
        w-12
        h-12
        rounded-full
        cursor-pointer
        -top-6
        left-1/2
        transform
        -translate-x-1/2
      "
      @click="goToRoute"
    >
      <i class="t2ico t2ico-plus"></i>
    </div>
  </footer>
</template>

<script>
import { reactive } from "vue";
import { NAVIGATIONITEMS_OPTIONS } from "../constants";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const navItems = reactive(NAVIGATIONITEMS_OPTIONS);
    function goToRoute() {
      router.push({ name: "NewTransaction", params: {} });
    }
    return { navItems, goToRoute };
  },
};
</script>

<style lang="css" scoped>
footer#footer > div[data-circle] {
  @apply bg-dark-light;
  width: 60px;
  height: 30px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}

footer#footer ul li:nth-child(2) {
  margin-right: 10%;
}
footer#footer ul li:nth-child(3) {
  margin-left: 10%;
}
</style>
