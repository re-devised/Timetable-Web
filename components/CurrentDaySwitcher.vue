<template>
    <portal to="currentDaySwitcher">
        <div class="w-full md:hidden text-primary-200 flex">
        <div class="p-1 bg-accent1-100 rounded-3xl flex flex-row justify-center items-center">
            <button 
            @click="emitPreviousDay"
            class="null-btn w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:accent1-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            </button>
            <button
            @click="emitCurrentDay" 
            class="uppercase text-xs font-semibold h-8 flex flex-row items-center mx-4">
                {{$t('index.nav.daySwitcherText')}}
            </button>
            <button 
            @click="emitNextDay"
            class="null-btn w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:accent1-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            </button>  
        </div>
        </div>
    </portal>
</template>

<script>
export default {
    methods: {
        emitNextDay(){
            this.$emit('nextDay')
        },
        emitPreviousDay(){
            this.$emit('previousDay')
        },
        emitCurrentDay(){
            this.$emit('currentDay')
        }
    },
}
</script>