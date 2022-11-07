<template>
    <div>
        <transition name="right-slide" mode="out-in">

        <table-column
            class="mr-8 md:mr-0 box-border w-min"
            v-if="isCreationMode"
            id="tableColumn-creation"
            mode="create"
            :allSubjects="subjects"
            :dayHourTimes="dayHourTimes"
            @updateDay="emitCreateDay" 
            @leaveEditorMode="leaveDayCreationMode"
        />

        <div v-else class="flex flex-col w-16 items-center justify-center mx-2 py-3 opacity-0 hover:opacity-70" :class="{'opacity-70' : isMobile}"> 
          <div class="h-12 flex flex-row items-center overflow-hidden" v-for="n in 5" :key="n"><span class="invisible">.</span></div>
          
          <div class="h-12 flex items-center justify-center overflow-hidden">
            <button @click="enterDayCreationMode"
            class="flex items-center justify-center focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
   
          <div class="h-12 flex flex-row items-center overflow-hidden" v-for="n in 5" :key="n+10"><span class="invisible">.</span></div>
        </div>

        </transition>
    </div>
</template>

<script>
import mobile from 'is-mobile'
import animateScrollTo from 'animated-scroll-to'
export default {
    props: {
        subjects: {
            type: Array,
            required: true
        },
        dayHourTimes: {
            type: Array
        }
    },
    data() {
        return {
            isCreationMode: false
        }
    },
    computed: {
        isMobile(){return mobile()}
    },
    methods: {
        enterDayCreationMode(){
            this.isCreationMode = true
            this.$emit('enterDayCreationMode')
            this.scrollToCreationTableColumn()
        },
        leaveDayCreationMode(){
            this.isCreationMode = false
            this.$emit('leaveDayCreationMode')
        },
        emitCreateDay(creationData){
            this.$emit('createDay', creationData)
        },
        scrollToCreationTableColumn(){  
            setTimeout(() => {
                var tableColumn = document.getElementById('tableColumn-creation')
                if(tableColumn){
                    animateScrollTo([tableColumn.offsetLeft, 0], {
                        minDuration: 800,
                        elementToScroll: document.querySelector('#main-section')
                    });
                }
            }, 850);
        }
    }
}
</script>

<style lang="scss" scoped>

.right-slide-enter-active,
.right-slide-leave-active {
    transition: all .4s
}

.right-slide-enter,
.right-slide-leave-to {
    opacity: 0;
    transform: translateX(300px);
}
</style>