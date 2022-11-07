<template>
    <div class="flex flex-row justify-center items-center my-1 w-full">
        <div class="mr-4 w-8 flex justify-center items-center">{{index + 1}}.</div>
        <input
            class="bg-white border-2 border-transparent appearance-none rounded-lg text-sm
            w-min flex-grow py-2 px-4 text-primary-200 placeholder-primary-100 leading-tight focus:outline-none 
            focus:bg-white focus:border-primary-200 disabled:opacity-40"
            type="time"
            v-model="timespanInput.from"
            @change="updateTimespan"
        />
        <div class="mx-2">-</div>
        <input
            class="bg-white border-2 border-transparent appearance-none rounded-lg text-sm
            w-min flex-grow py-2 px-4 text-primary-200 placeholder-primary-100 leading-tight focus:outline-none 
            focus:bg-white focus:border-primary-200 disabled:opacity-40"
            type="time"
            v-model="timespanInput.to"
            @change="updateTimespan"
        />
        <div class="ml-4 w-8 flex justify-center items-center">
            <button class="null-btn" @click.prevent="removeTimespan">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timespanInput: {
                from: "00:00",
                to: "00:00"
            }
        }
    },
    props: {
        timespan: {
            type: Object
        },
        index: {
            type: Number,
            default: 0
        }
    },
    mounted(){
        if(this.timespan){
            this.timespanInput.from = this.timespan.from
            this.timespanInput.to = this.timespan.to
        }
    },
    methods: {
        updateTimespan(){
            var timespanInput = this.timespanInput
            if(timespanInput.from == "") timespanInput.from = "00:00"
            if(timespanInput.to == "") timespanInput.to = "00:00"
            this.$emit('timespanUpdate', [timespanInput, this.index])
        },
        removeTimespan(){
            this.$emit('timespanRemove', this.index)
        }
    }
}
</script>