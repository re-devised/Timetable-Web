<template>
    <portal to="currentLayoutSwitcher">
        <div class="w-full md:hidden text-primary-200 flex">
        <div class="p-1 bg-accent1-100 rounded-3xl flex flex-row justify-center items-center">
            <button 
            @click="emitLayoutSwitch"
            class="null-btn w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:accent1-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
            </button>
        </div>
        </div>
    </portal>
</template>

<script>
export default {
    methods: {
        emitLayoutSwitch(){
            this.$emit('layoutSwitch')
        },
    },
}
</script>