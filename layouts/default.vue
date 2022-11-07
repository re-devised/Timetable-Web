<template>
  <div>
    <portal-target name="modal" />
   
    <div class="p-4 flex flex-row w-full justify-center items-center absolute z-10" v-if="isIntroductionMode">
      <introduction-switcher v-if="showDotIcon" @exitIntroductionMode="exitIntroductionMode" />
    </div>

    <div class="p-4 flex flex-row w-full  md:w-min justify-center md:justify-start items-center absolute z-10" v-else>
      <dot-nav v-if="showDotIcon" :windowWidth="windowWidth"/>
      <portal-target class="ml-1" name="currentDaySwitcher" />
      <portal-target class="ml-1" name="currentLayoutSwitcher" />
    </div>
    
    <Nuxt :class="cssClass" :windowWidth="windowWidth" id="main-section"/>
  </div>
</template>

<script>
import DotNav from '~/components/DotNav'
import IntroductionSwitcher from '~/components/IntroductionSwitcher'
import ls from 'local-storage'

export default {
  data() {
    return {
      cssClass: `text-primary-200 font-body text-base relative 
      min-h-screen min-w-screen h-full w-full flex flex-col justify-center 
      px-2 lg:px-20 py-8 overflow-x-auto box-border`,
      showDotIcon: false,
      windowWidth: 100,
      isIntroductionMode: false
    }
  },
  mounted() {
    this.showDotIcon = true
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()

    var isIntroductionModeInConfig = ls.get('isIntroductionMode')
    if(isIntroductionModeInConfig == undefined || isIntroductionModeInConfig == true){
      this.isIntroductionMode = true
      this.$router.push('/introduction')
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    updateWindowWidth(event) {
      this.windowWidth = window.innerWidth;
    },
    exitIntroductionMode(){
      this.isIntroductionMode = false
      ls.set('isIntroductionMode', false)
    }
  },
  components: {
    DotNav,
    IntroductionSwitcher
  },
}
</script>

<style>

html {
  @apply bg-background h-full w-full overflow-auto;
}

body { 
  height: 100%; 
  width: 100%;
}

.transition-enter-active, .transition-leave-active { 
  transition: all 0.5s ease; 
}

.transition-enter, .transition-leave-to { 
  opacity: 0; 
  transform: translateX(-2em);
}
</style>
