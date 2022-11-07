<template>
    <div class="text-primary-200 bg-accent1-100 rounded-full p-1 h-auto h-max-0 w-max-0 flex flex-row items-center" >
        <button class="null-btn" :disabled="currentIntoductionRoute == 0" @click="changeCurrentIntroductionRoute(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="null-btn" v-if="currentIntoductionRoute < introductionRoutes.length - 1" @click="changeCurrentIntroductionRoute(1)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button v-else class="null-btn flex items-center justify-center text-sm px-2 font-semibold uppercase" @click="emitExitIntroductionMode">
          Fertig
        </button>
    </div>
</template>

<script>
import ls from 'local-storage'
export default {
    data() {
        return {
            introductionRoutes: [
              'introduction',
              'subjects',
              'settings?setting=timespans',
              ''
            ],
            currentIntoductionRoute: 0
        }
    },
    mounted(){
      var systemLanguage = ((navigator.languages && navigator.languages[0]) || '').substr(0, 2)
      if (systemLanguage) {
        this.$i18n.locale = systemLanguage
        this.introductionRoutes.splice(1, 0, `settings?setting=language&language=${systemLanguage}`)
      }
      else this.introductionRoutes.splice(1, 0, 'settings?setting=language')
    },
    methods: {
        changeCurrentIntroductionRoute(value){
            this.currentIntoductionRoute += value
            this.$router.push('/' + this.introductionRoutes[this.currentIntoductionRoute])
        },
        emitExitIntroductionMode(){
            this.$emit('exitIntroductionMode')
        }
    }
}
</script>