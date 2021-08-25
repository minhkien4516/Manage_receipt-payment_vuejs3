import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";

const error = ref(null);
const isPending = ref(false);

async function signin(email, password) {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    if (!res) throw new Error("Email and Password are not correct....");
    return res;
  } catch (err) {
    console.log(err);
    error.value = err;
  } finally {
    isPending.value = false;
  }
}

export function useSignIn() {
  return {
    error,
    isPending,
    signin,
  };
}
