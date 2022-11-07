<template>
<portal to="modal">
  <div class="fixed w-screen h-screen flex justify-center top-0 left-0 z-20" v-if="isOpened">
    <div class="absolute w-full h-full bg-accent1-100 opacity-70"></div>
    <div class="absolute w-5/6 md:w-1/2 h-auto bg-primary-200 rounded-2xl top-6 flex flex-col justify-center p-8">
      
      <button @click="close" class="absolute right-2 top-2 text-primary-100 null-btn hover:bg-transparent hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <slot></slot>
    </div>
  </div>
</portal>
</template>

<script>
export default {
    data() {
        return {
            isOpened: false
        }
    },
    methods: {
        open(){
            this.isOpened = true
        },
        close(){
            this.isOpened = false
        }
    }
}
</script>