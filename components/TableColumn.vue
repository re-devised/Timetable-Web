<template>
  <transition name="fade" mode="out-in">
  <div
    class="inline-flex flex-col md:w-36 w-full justify-center mx-2 bg-primary-100 rounded-lg text-primary-300 p-3 relative"
    :class="{'bg-accent1-200' : editorMode}"
  >
      <table-column-actions 
        :editorMode="editorMode"
        @leaveEditorMode="leaveEditorMode"
        @enterEditorMode="enterEditorMode"
        @updateDay="emitUpdateDay"
        @deleteDay="emitDeleteDay"
      />

      <div v-if="editorMode" class="w-full h-12 overflow-hidden font-bold">
        <input class="bg-transparent focus:outline-none border-0" placeholder="weekday" type="text" name="dayName" id="dayName" v-model="editedDayName">
      </div>
      <div v-else class="h-12 overflow-hidden font-bold w-32">{{day ? day.name : ""}}</div>

      <div v-if="editorMode">
        <div 
          class="w-full h-12 py-2"
          v-for="(n, index) in (day && day.subjects.length > dayHourTimes.length ? day.subjects : dayHourTimes.length)"
          :key="index"
        >
          <v-select :options="allSubjects" label="name" v-model="editedTableSubjects[index]"
            class="style-chooser">
              <template v-slot:no-options="{ searching }">
                <template v-if="searching">
                  {{$t('settings.select.searchNotFound')}}
                </template>
              </template>
            </v-select>
        </div>  
      </div>
        
      <div v-else>
        <table-subject 
          v-for="(subject, index) in day.subjects"
          :key="index"
          :subject="subject"
          :allSubjects="allSubjects"
          :showTeacherNames="settings.teacherNames"
          :showFreeHourWidgets="settings.freeHourWidgets"
          :class="{'text-primary-100' : settings.currentSubject && isDateDayEqualsDayName && currentDateTimeSubject == index}"
        >

          <template v-slot:dateTimeCurrentSubjectVisualizer>
            <transition name="fade2" mode="out-in">
              <div v-if="settings.currentSubject && isDateDayEqualsDayName && currentDateTimeSubject == index"
              class="bg-primary-300 w-full h-full px-5 box-content rounded-md transform -translate-x-1/2 absolute top-0 left-1/2" />
            </transition>
          </template>

          <template v-slot:widget>
            <div v-if="freeHourWidgetsAtDay.find(widget => widget.subjectPosition == index) && 
            freeHourWidgetsAtDay.find(widget => widget.subjectPosition == index).widget == 'clock'" class="font-semibold w-min">{{dateTime}}&nbsp;Uhr</div>
            <div v-if="freeHourWidgetsAtDay.find(widget => widget.subjectPosition == index) && 
            freeHourWidgetsAtDay.find(widget => widget.subjectPosition == index).widget == 'date'" class="font-semibold w-min">{{dateDate}}</div>
            <div v-if="freeHourWidgetsAtDay.find(widget => widget.subjectPosition == index) && 
            freeHourWidgetsAtDay.find(widget => widget.subjectPosition == index).widget == 'text'" class="font-semibold w-min">{{widgetsInConfig.text}}</div>
          </template>           

        </table-subject>
      </div>


  </div>  
  </transition>
</template>

<script>
import TableSubject from '~/components/TableSubject'
import TableColumnActions from '~/components/TableColumnActions'
import 'vue-select/dist/vue-select.css';
import Vue from 'vue'
import ls from 'local-storage'

export default {
  components: { 
    TableSubject,
    TableColumnActions,
  },
  data() {
    return {
      editedTableSubjects: [],
      editedDayName: "",
      editorMode: false,
      settings: {
        teacherNames: true,
        currentSubject: true,
        freeHourWidgets: false
      },
    }
  },
  props: {
      day: {
        type: Object,
      },
      allSubjects: {
        type: Array,
        required: true
      },
      mode: {
        type: String,
        default: "present"
      },
      dateDay: {
        type: Number,
        default: 1
      },
      dateTime: {
        type: String,
        default: "00:00"
      },
      dateDate: {
        type: String,
        default: "01.01.1970"
      },
      dayHourTimes: {
        type: Array,
      },
      shuffledFreeHourWidgetTimePeriods: {
        type: Array,
        default: []
      },
      widgetsInConfig: {
        type: Object,
        default: {}
      },
  },
  computed: {
    isDateDayEqualsDayName(){
      var isDateDayEqualsDayName = false
      switch(this.day.name){
        case "Montag":
          if(this.dateDay == 1) isDateDayEqualsDayName = true
          break;
        case "Dienstag":
          if(this.dateDay == 2) isDateDayEqualsDayName = true
          break;
        case "Mittwoch":
          if(this.dateDay == 3) isDateDayEqualsDayName = true
          break;
        case "Donnerstag":
          if(this.dateDay == 4) isDateDayEqualsDayName = true
          break;
        case "Freitag":
          if(this.dateDay == 5) isDateDayEqualsDayName = true
          break;
        case "Samstag":
          if(this.dateDay == 6) isDateDayEqualsDayName = true
          break;
        case "Sonntag":
          if(this.dateDay == 7) isDateDayEqualsDayName = true
          break;
      }
      return isDateDayEqualsDayName
    },
    currentDateTimeSubject(){
      return this.dayHourTimes.findIndex(x => {
        var dayHourFromTimeSplit = x.from.split(':')
        var dayHourToTimeSplit = x.to.split(':')
        var dateTimeSplit = this.dateTime.split(':')
        var previousDayHourTime = this.dayHourTimes[this.dayHourTimes.findIndex(y => y.from == x.from)-1]

        //Cutting away all the "0" before Numbers like "07" to "7"
        dayHourFromTimeSplit = this.sliceNullsFromTime(dayHourFromTimeSplit)
        dayHourToTimeSplit = this.sliceNullsFromTime(dayHourToTimeSplit)
        dateTimeSplit = this.sliceNullsFromTime(dateTimeSplit)
        var previousDayHourToTimeSplit = previousDayHourTime ? this.sliceNullsFromTime(previousDayHourTime.to.split(':')) : undefined

        //testing if current time is bigger than the ending of time of the last subject (if there is no last subject then use beginning of self)
        //and testing if current time is smaller than the ending of self ===> if both of these = current Subject
        if(this.timeArrayToMinutes(dateTimeSplit) >= (previousDayHourToTimeSplit ? this.timeArrayToMinutes(previousDayHourToTimeSplit) : this.timeArrayToMinutes(dayHourFromTimeSplit))
        && this.timeArrayToMinutes(dateTimeSplit) < this.timeArrayToMinutes(dayHourToTimeSplit) ){
          return true
        }else return false
      })
    }, 
    freeHourWidgetsAtDay(){
      return this.shuffledFreeHourWidgetTimePeriods.filter(y => y.day == this.day.name)
    },
  },
  created(){
    if(this.mode == 'create') this.editorMode = true
    this.editedDayName = this.day ? this.day.name : ""
  },
  mounted(){
    var settings = ls.get('settings')
    if(settings) this.settings = settings
  },
  methods: {
    emitUpdateDay(){
      var dayId = this.day ? this.day._id : undefined
      this.$emit('updateDay', [dayId, {
        'subjectIds': this.getToIdConvertedEditedTableSubjects(), 
        'name': this.editedDayName
      }])
      this.leaveEditorMode()
    },
    emitDeleteDay(){
      this.$emit('deleteDay', this.day._id)
    },
    getToIdConvertedEditedTableSubjects(){
      do{
        if(this.editedTableSubjects[this.editedTableSubjects.length - 1] == null) this.editedTableSubjects.pop()
      }while(this.editedTableSubjects[this.editedTableSubjects.length - 1] == null)

      return this.editedTableSubjects.map(x => {
        if(x == null) return null
        if(typeof x == 'object') return x._id
        else return x
      })
    },
    enterEditorMode(){
      this.$emit('enterEditorMode')
      this.setEditedTableSubjectsToDaySubjects()
      this.editorMode = true
    },
    leaveEditorMode(){
      this.$emit('leaveEditorMode')
      this.setEditedTableSubjectsToDaySubjects()
      this.editorMode = false
    },
    setEditedTableSubjectsToDaySubjects(){
      if(this.day){
        for(var i in this.day.subjects){
          Vue.set(this.editedTableSubjects, i, this.allSubjects.find(subject => subject._id == this.day.subjects[i] || undefined))
        }
      }
    },
    sliceNullsFromTime(time){
      if(time[0][0] == "0") time[0] = time[0].slice(1)
      if(time[1][0] == "0") time[1] = time[1].slice(1)
      return time
    },
    timeArrayToMinutes(time){
      return parseInt(time[0])*60 + parseInt(time[1])
    },
  },
}
</script>

<style lang="scss">

div:hover > .action-area{
  &.action-area{
      @apply flex;
  }
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle {
  @apply text-sm bg-accent1-200 h-8 pt-3 rounded-md border-primary-200 flex flex-col justify-center;
  & > * {
    @apply text-primary-100;
    }
}

.style-chooser .vs__dropdown-menu {
  @apply text-xs bg-primary-300 text-accent1-100 min-w-0 rounded-xl p-1 mt-1;
  & > * {
    @apply text-accent1-100 py-1 px-2 hover:text-primary-300 rounded-md hover:bg-primary-100;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.style-chooser .vs__selected {
  @apply text-primary-300 h-full;
}
.style-chooser .vs__clear{
  @apply absolute z-10 top-3 right-0;
}
.style-chooser .vs__open-indicator {
  visibility: hidden;
}
</style>