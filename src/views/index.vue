<template>
  <div class="home">User Profile</div>
  <div class="mt-6" v-if="user">Name: {{ user.displayName }}</div>
</template>

<script>
import { useUser } from "@/composable/useUser";
export default {
  name: "Home",
  components: {},
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();

    return { user };
  },
};
</script>
