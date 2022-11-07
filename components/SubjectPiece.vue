<template>
    <div class="relative w-36 h-20 m-2 bg-primary-100 rounded-lg p-2 grid grid-cols-3 gap-2 auto-rows-fr before">
        <div class="before-content absolute hidden flex-row justify-center p-2">
            <button @click="emitEditSubject"
                class="pr-2 border-r-1 border-primary-200 flex items-center justify-center w-full h-full focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button @click="emitDeleteSubject"
                class="pl-2 border-l-1 border-primary-200 flex items-center justify-center w-full h-full focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>

        <div class="text-lg font-bold col-span-2 flex items-center">
            {{subject.name}}
        </div>
        <div class="text-md col-span-1 flex items-center justify-end">
            {{subject.room}}
        </div>
        <div class="text-lg col-span-3 flex items-center">
            {{subject.teacher}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        subject: {
            type: Object,
            required: true
        }
    },
    methods: {
        emitDeleteSubject(){
            this.$emit('deleteSubject', this.subject._id)
        },
        emitEditSubject(){
            this.$emit('editSubject', this.subject)
        }
    }
}
</script>

<style lang="scss" scoped>
    .before:hover > .before-content{
        content: "";
        & { @apply bg-accent1-200 opacity-90 w-full h-full absolute rounded-lg     }
        
        &.before-content{
            @apply flex
        }
    }
</style>