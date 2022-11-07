<template>
    <div class="min-w-30 h-12 relative">
        <slot name="dateTimeCurrentSubjectVisualizer"/>

        <div class="relative h-full w-full overflow-hidden grid grid-cols-3 auto-rows-fr py-1" 
        :class="{'border-l-2 border-primary-200 text-sm' : !subjectInformation || subjectInformation.name == 'Freistunde'}">
            
            <div v-if="subjectInformation && subjectInformation.name != 'Freistunde'" 
            class="col-span-2 flex flex-row items-center">
                {{subjectInformation.name}}</div>

            <div v-if="subjectInformation && subjectInformation.name != 'Freistunde'" 
            class="col-span-1 text-xs font-thin flex flex-row items-center justify-end">
                {{subjectInformation.room}}</div>
            
            <div v-if="subjectInformation && subjectInformation.name != 'Freistunde' && showTeacherNames" 
            class="col-span-3 text-xs flex flex-row items-center">
                {{subjectInformation.teacher}}</div>
            
            <div v-if="showFreeHourWidgets &&  (!subjectInformation || subjectInformation.name == 'Freistunde')"
            class="col-span-3 flex flex-row items-center justify-center w-full h-full p-1">
                <slot name="widget"/>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        subject: {
            type: String,
            required: false 
        },
        allSubjects: {
            type: Array,
            required: true
        },
        showTeacherNames: {
            type: Boolean,
            default: true
        },
        showFreeHourWidgets: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        subjectInformation(){
            return this.allSubjects.find(subject => subject._id == this.subject)
        },
    }
}
</script>