<template>
    <div :class="{'editor-show': editorMode}" class="hidden action-area absolute p-1 rounded-tr-lg rounded-bl-lg top-0 right-0 bg-primary-200">
        <div v-if="editorMode" class="flex flex-row">
            <button @click="emitLeaveEditorMode"
                class="flex items-center justify-center focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <button @click="emitUpdateDay"
                class="flex items-center justify-center focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </button>
        </div>
        <div v-else class="flex flex-row">
            <button @click="emitDeleteDay"
                class="flex items-center justify-center focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <button @click="emitEnterEditorMode"
                class="flex items-center justify-center focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
        </div>
    </div>

    
</template>

<script>
export default {
    props: {
        editorMode: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    methods: {
        emitUpdateDay(){
            this.$emit('updateDay')
        },
        emitDeleteDay(){
            this.$emit('deleteDay')
        },
        emitLeaveEditorMode(){
            this.$emit('leaveEditorMode')
        },
        emitEnterEditorMode(){
            this.$emit('enterEditorMode')
        }
    }
}
</script>

<style>
.editor-show{
    display: flex !important;
}
</style>