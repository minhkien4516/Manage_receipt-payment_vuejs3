<template>
  <form @submit.prevent="onSubmit">
    <div class="row mt-8">
      <div class="bg-white rounded-lg py-4">
        <div class="container mx-auto px-8">
          <div class="row">
            <label for="total" class="flex items-end">
              <div class="w-10 text-right leading-10 mr-4 pb-1">
                <span
                  class="
                    inline-block
                    px-1
                    text-dark
                    border border-dark
                    rounded
                    text-sm
                  "
                >
                  USD
                </span>
              </div>
              <div class="flex flex-col border-b border-gray-100 pb-1">
                <span class="font-semibold text-xs text-dark">Total</span>
                <input
                  id="total"
                  class="text-4xl text-dark w-full outline-none mt-1"
                  type="text"
                  placeholder="0"
                  v-model="total"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="category" class="flex items-center">
              <div
                class="
                  flex
                  items-center
                  flex-none
                  w-10
                  text-right
                  leading-10
                  mr-4
                "
              >
                <span
                  class="
                    inline-block
                    ml-auto
                    text-dark
                    w-8
                    h-8
                    rounded-full
                    bg-blue-300
                  "
                ></span>
              </div>
              <div class="flex-1 border-b border-gray-100 py-3">
                <input
                  id="category"
                  class="text-xl text-dark w-full outline-none"
                  type="text"
                  placeholder="Select a category"
                  v-model="category"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="note" class="flex items-center">
              <div
                class="
                  flex
                  items-center
                  flex-none
                  w-10
                  text-right
                  leading-10
                  mr-4
                "
              >
                <span class="flex-none w-10 mr-4">
                  <i class="t2ico t2ico-document text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 border-b border-gray-100 py-3">
                <input
                  id="note"
                  class="text-dark w-full outline-none"
                  type="text"
                  placeholder="Note"
                  v-model="note"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="time" class="flex items-center">
              <div class="flex-none w-10 mr-4">
                <span class="flex items-center justify-end text-dark">
                  <i class="t2ico t2ico-calendar text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 py-2 border-b border-gray-100">
                <div class="text-dark w-full">{{ new Date() }}</div>
              </div>
            </label>
          </div>
          <div class="row">
            <label for="wallet" class="flex items-center">
              <div class="flex-none w-10 mr-4">
                <span class="flex items-center justify-end text-dark">
                  <i class="t2ico t2ico-wallet text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 py-2">
                <div class="text-dark w-full">My Wallet</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- MoreDetails -->

    <div class="row mt-8" v-if="!isMoreDetails">
      <button
        @click="isMoreDetails = true"
        class="bg-white rounded-lg py-3 w-full font-semibold text-primary"
      >
        More Details
      </button>
    </div>

    <!-- UpgradeDetails -->
    <template v-if="isMoreDetails">
      <div class="row mt-8">
        <div class="bg-white rounded-lg py-4">
          <div class="container mx-auto px-8">
            <div class="row">
              <label for="location" class="flex items-center">
                <div
                  class="
                    flex
                    items-center
                    flex-none
                    w-10
                    text-right
                    leading-10
                    mr-4
                  "
                >
                  <span class="flex-none w-10 mr-4">
                    <i class="t2ico t2ico-location text-2xl"></i>
                  </span>
                </div>
                <div class="flex-1 border-b border-gray-100 py-3">
                  <input
                    id="location"
                    class="text-dark w-full outline-none"
                    type="text"
                    placeholder="Select a location"
                    v-model="location"
                  />
                </div>
              </label>
            </div>
            <div class="row">
              <label for="withPerson" class="flex items-center">
                <div class="flex-none w-10 mr-4">
                  <span class="flex items-center justify-end text-dark">
                    <i class="t2ico t2ico-users text-2xl"></i>
                  </span>
                </div>
                <div class="flex-1 py-2">
                  <div class="text-dark w-full">
                    <input
                      id="withPerson"
                      class="text-dark w-full outline-none"
                      type="text"
                      placeholder="With Person"
                      v-model="person"
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- Uploaded photo -->
      <div class="row mt-8">
        <div class="bg-white rounded-lg py-4">
          <div class="container mx-auto px-8">
            <div class="row">
              <label for="file" class="flex items-center text-primary">
                <div class="flex-none w-10 mr-4">
                  <span class="flex items-center justify-end">
                    <i class="t2ico t2ico-camera text-2xl"></i>
                  </span>
                </div>
                <div class="flex-1 py-2">
                  <div class="w-full font-semibold">Upload photos</div>
                  <input
                    id="file"
                    type="file"
                    class="w-0 h-0 overflow-hidden absolute"
                    @change="onChangeFile"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="text-red my-3">{{ errorFile }}</div>
      </div>
    </template>
  </form>
</template>
<script>
import { ref } from "vue";
import { useUser } from "../composable/useUser";
import useCollection from "@/composable/useCollection";
import useStorage from "@/composable/useStorage";
export default {
  setup() {
    const { error, addRecord } = useCollection("transaction");
    const { getUser } = useUser();
    const isMoreDetails = ref(false);
    const { uploadFile, url } = useStorage("transaction");

    const total = ref(null);
    const category = ref("");
    const note = ref("");
    const time = ref(new Date());
    const file = ref(null);
    const errorFile = ref(null);
    const location = ref("");
    const person = ref("");

    function onChangeFile(event) {
      const selected = event.target.files[0];
      console.log(selected);
      const typeFile = ["image/png", "image/jpg", "image/jpeg"];
      if (selected && typeFile.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
        errorFile.value = "Please select a file png or jpg.";
      }
    }

    async function onSubmit() {
      if (file.value) await uploadFile(file.value);
      const { user } = getUser();
      const transaction = {
        total: parseInt(total.value),
        category: category.value,
        note: note.value,
        time: time.value,
        userId: user.value.uid,
        location: location.value,
        person: person.value,
        thumbnail: url.value,
      };

      await addRecord(transaction);
    }
    return {
      onSubmit,
      isMoreDetails,
      total,
      category,
      note,
      time,
      error,
      onChangeFile,
      errorFile,
      location,
      person,
    };
  },
};
</script>
