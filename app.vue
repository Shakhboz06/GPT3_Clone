<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <h1>Hello Nuxt</h1>

    <div class="chat" v-for="(item, index) in messages" :key="index"
      style="display: flex; justify-content: flex-start; grid-gap: 5px;">
      <p class="human">{{ item.role }}:</p>
      <p class="message">{{ item.content }}</p>
    </div>
    <!-- <form action=""> -->
    <textarea name="mees" id="kanaverl" @keypress.enter.exact.prevent="SubmitMessage" cols="30" rows="10" placeholder=""
      v-model="message"></textarea>
    <br>
    <button @click.prevent="SubmitMessage">Submit</button>
    <!-- </form> -->

  </div>
</template>

<script setup lang="ts">

let message = ref("");
let messages = ref([
  {
    role: "AI",
    content: "Hello, how can I help you?",
  },
])

const SubmitMessage = async () => {
  if (message.value === "") return;
  
  messages.value.push({ role: "user", content: message.value })
  message.value = ""
  
  const req = await fetch("/api/gpt3", {
    body: JSON.stringify(messages.value.slice(-1)),
    method: "POST",
  })

  if (req.status == 200) {
    const response = await req.json()
    messages.value.push({ role: "AI", content: response.message })
    message.value = ""
  } else {
    console.error("Error:", req.statusText);
  }
}

</script>