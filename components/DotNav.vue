<template>
    <div class="text-primary-200 bg-accent1-100 rounded-full p-1 h-auto h-max-0 w-max-0 flex flex-row items-center 
    transition-all duration-500 ease-in-out" :class="{'justify-center flex-col w-9' : windowWidth >= 768}">
      <button class="null-btn" @click="toggleMenu">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div v-show="menuOpened" :class="{'flex flex-row justify-center' : windowWidth < 768}">
        <button class="null-btn" v-if="getCurrentPage == 'index'" @click="$router.push('/subjects')">
          <svg xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
        <button class="null-btn" v-if="getCurrentPage == 'subjects'" @click="$router.push('/')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke -linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        </button>
        <button class="null-btn" v-if="getCurrentPage != 'settings'" @click="$router.push('/settings')">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <button class="null-btn" v-if="getCurrentPage == 'settings'" @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg> -->
        </button>
      </div>
    </div>
</template>

<script>
import ls from 'local-storage'
export default {
    data() {
        return {
            menuOpened: true
        }
    },
    props: {
        windowWidth : {
          type: Number,
          default: 100
        }
    },
    mounted() {
      var menuOpenedInConfig = ls.get('menuOpened')
      if(!menuOpenedInConfig) this.menuOpened = false
    },
    computed: {
        getCurrentPage(){
            return this.$nuxt.$route.name
        }
    },
    methods: {
        toggleMenu(){
            this.menuOpened = !this.menuOpened
            ls.set('menuOpened', this.menuOpened)
        }
    }
}
</script>

<style>
    svg:nth-last-of-type(1){
      margin-bottom: 0;
    }
</style>