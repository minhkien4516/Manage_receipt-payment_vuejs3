<template>
  <div class="mt-8">
    <div class="container mx-auto px-8">
      <!-- Start:Form-->
      <form
        class="flex flex-col justify-start space-y-6"
        @submit.prevent="onSubmit"
      >
        <div class="row">
          <label class="flex flex-col" for="fullName">
            <span class="font-semibold">Full Name</span>
            <input
              id="fullName"
              type="text"
              placeholder="iMoney...."
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
              v-model="fullName"
            />
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="email">
            <span class="font-semibold">Email Name</span>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com..."
              class="px-4 py-3 rounded-lg border-gray-100 mt-1"
              autocomplete="username"
              v-model="email"
            />
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="password">
            <span class="font-semibold">Password</span>
            <input
              id="password"
              type="password"
              placeholder="Example@123"
              class="px-4 py-3 rounded-lg border-gray-100 mt-1"
              autocomplete="current-password"
              v-model="password"
            />
          </label>
        </div>
        <div class="row">
          <button
            v-if="!isPending"
            class="
              py-3
              text-center
              w-full
              bg-primary
              text-white
              font-bold
              rounded-lg
            "
            type="submit"
          >
            Sign Up
          </button>
          <button
            v-else-if="isPending"
            class="
              py-3
              text-center
              w-full
              text-white
              font-bold
              rounded-lg
              bg-gray-800
              cursor-not-allowed
            "
            disabled
            type="button"
          >
            Loading.....
          </button>
        </div>
      </form>

      <!-- Start:Error-->
      <div v-if="error" class="text-left mt-4 text-red">
        <span>{{ error }}</span>
      </div>
      <!-- Start:Direction -->
      <div class="w-full text-center mt-6">
        <span class="font-semibold">I'm already a member.</span>
        <span class="ml-1">
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="text-primary font-bold"
            >Sign In</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignUp } from "@/composable/useSignUp";
export default {
  setup() {
    const { error, isPending, signup } = useSignUp();
    const router = useRouter();
    const fullName = ref("");
    const email = ref("");
    const password = ref("");

    async function onSubmit() {
      await signup(email.value, password.value, fullName.value);
      if (!error.value) router.push({ name: "Login", params: {} });
    }

    return {
      onSubmit,
      fullName,
      email,
      password,
      error,
      isPending,
    };
  },
};
</script>
