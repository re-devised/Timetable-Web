<template>
   <div class="flex flex-col w-16 mx-2 items-center justify-center py-3"> 
        <div class="h-12 flex flex-row items-center justify-center overflow-hidden w-16"><span class="invisible">.</span></div>
        <div class="day-hour h-12 flex flex-row items-center justify-center overflow-hidden w-16 relative" v-for="(dayHourTime, index) in dayHourTimes" :key="index">
            <div class="hidden flex-col items-center justify-center text-xs absolute text-primary-300 day-time">
                <div>{{dayHourTime.from}}</div>
                <div>{{dayHourTime.to}}</div>
            </div>
            <div>{{index + 1}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dayHourTimes: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.day-hour:hover{
    & > .day-time{
        @apply flex;
    }
    & > div:nth-child(2){
        @apply hidden;
    }
}
// .day-hour:not(:has(div.day-time.flex)){
//     @apply text-primary-100;
// }
</style>