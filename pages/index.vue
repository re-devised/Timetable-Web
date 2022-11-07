<template>
    <div v-if="isLoaded">
      <div class="flex items-start flex-row min-w-full w-max h-full justify-start lg:justify-center mt-16 md:mt-0">
        
        <day-hour-column :dayHourTimes="dayHourTimes"/>

        <div  :class="{'w-max flex-row' : smallScreenLayout == 'multiple'}" class="flex items-start w-full md:flex-row md:w-max"> 
          <table-column 
            v-for="(day, index) in days"
            :key="day._id"
            v-show="windowWidth >= 768 || smallScreenLayout == 'multiple' || index == smallScreenCurrentDay"
            :id="'tableColumn-' + index"
            :day=day
            :allSubjects="subjects"
            @updateDay="updateDay"
            @deleteDay="deleteDay"
            :dateDay="dateDay"
            :dateTime="dateTime"
            :dateDate="dateDate"
            :dayHourTimes="dayHourTimes"
            :shuffledFreeHourWidgetTimePeriods="shuffledFreeHourWidgetTimePeriods"
            :widgetsInConfig="widgetsInConfig"
          />
        </div>


        <current-layout-switcher
          @layoutSwitch="switchSmallScreenLayout"
        />

        <current-day-switcher 
          @nextDay="editCurrentDay(1)"
          @previousDay="editCurrentDay(-1)"
          @currentDay="setCurrentDayToDateDay"
        />

        <!--------------------------------- CREATION PART----------------------->
        <creation-table-column 
          :subjects="subjects"
          :dayHourTimes="dayHourTimes"
          @createDay="createDay"
          @enterDayCreationMode="smallScreenCurrentDay = -1"
          @leaveDayCreationMode="smallScreenCurrentDay = 0"
        /> 

      </div>
    </div>
    <loading-screen v-else/>
</template>

<script>
import TableColumn from '~/components/TableColumn'
import LoadingScreen from '~/components/LoadingScreen'
import CreationTableColumn from '~/components/CreationTableColumn'
import CurrentDaySwitcher from '~/components/CurrentDaySwitcher'
import CurrentLayoutSwitcher from '~/components/CurrentLayoutSwitcher'
import DayHourColumn from '~/components/DayHourColumn'
import { mapState } from 'vuex'
import ls from 'local-storage'
import animateScrollTo from 'animated-scroll-to';

//TODO: Selector, so dass nur die Fächer von einem bestimmten Lehrer eingeblendet werden, die anderen die opacity runter stellen
//TODO: Error handling Server (Socket hang up)


export default {
  transition: 'transition',
  components:{
    TableColumn,
    CreationTableColumn,
    LoadingScreen,
    CurrentDaySwitcher,
    CurrentLayoutSwitcher,
    DayHourColumn
  },
  data() {
    return {
      isLoaded: false,
      windowWidth: 100,
      smallScreenCurrentDay: 1,
      smallScreenLayout: 'multiple',
      dateDay: 0,
      dateTime: '00:00',
      dateDate: '01.01.1970',
      dayHourTimes: [
        {'from' : '07:55', 'to' : '08:40'},
        {'from' : '08:40', 'to' : '09:25'},
        {'from' : '09:30', 'to' : '10:15'},
        {'from' : '10:40', 'to' : '11:25'},
        {'from' : '11:25', 'to' : '12:10'},
        {'from' : '12:15', 'to' : '13:00'},
        {'from' : '13:05', 'to' : '13:50'},
        {'from' : '14:05', 'to' : '14:50'},
        {'from' : '14:55', 'to' : '15:30'},
        {'from' : '15:30', 'to' : '16:15'},
      ],
      freeHourWidgets: [
        "clock",
        "date"
      ],
      widgetsInConfig: {},
      shuffledFreeHourWidgetTimePeriods: []
   }
  },
  computed: {
    ...mapState({
      subjects: state => state.subjects.subjects,
      days: state => state.days.days
    }),
    freeHourTimePeriods(){
      var arrayLocations = []
      for(const day of this.days){
        for(const [index, subject] of day.subjects.entries()){
          if(subject == null) arrayLocations.push({"day" : day.name, "subjectPosition" : index})
        }
      }
      return arrayLocations
    }
  },
  created() {
    this.updateDateDay()
    this.updateDateTime()
    this.updateDateDate()
    setInterval(this.updateDateDay, 1000);
    setInterval(this.updateDateTime, 1000);
    setInterval(this.updateDateDate, 1000);
  },
  async mounted() {
    await this.$store.dispatch('subjects/fetchSubjects')
    await this.$store.dispatch('days/fetchDays')
    this.shuffleWidgetsForFreeHourTimePeriods()

    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()

    var smallScreenLayoutInConfig = ls.get('smallScreenLayout')
    if(smallScreenLayoutInConfig) this.smallScreenLayout = smallScreenLayoutInConfig

    var settingsInConfig = ls.get('settings')
    if(settingsInConfig) this.$i18n.locale = settingsInConfig.language.acronym  

    var widgetsInConfig = ls.get('widgets')
    if(widgetsInConfig){
      this.widgetsInConfig = widgetsInConfig
      if(this.widgetsInConfig.text) this.freeHourWidgets.push("text")
    }

    var timespansInConfig = ls.get('timespans')
    if(timespansInConfig) this.dayHourTimes = timespansInConfig
    else ls.set('timespans', this.dayHourTimes)

    //set the day shown in smallscreen to current day if it is smaller than the days that are registered
    if(this.dateDay <= this.days.length){
      this.smallScreenCurrentDay = this.dateDay - 1
      this.scrollToCurrentDayTableColumn(1500)
    }
    
    this.isLoaded = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    async updateDay(updateInfo){
      await this.$store.dispatch("days/updateDay", updateInfo)
    },
    async deleteDay(dayId){
      await this.$store.dispatch("days/deleteDay", dayId)
        .then(_ => this.smallScreenCurrentDay -= 1)
    },
    async createDay(creationData){
      await this.$store.dispatch("days/createDay", creationData[1])
        .then(_ => this.smallScreenCurrentDay = this.days.length - 1)
    },
    editCurrentDay(amount){
      if(amount + this.smallScreenCurrentDay > this.days.length - 1) this.smallScreenCurrentDay = 0
      else if(amount + this.smallScreenCurrentDay < 0) this.smallScreenCurrentDay = this.days.length - 1
      else this.smallScreenCurrentDay += amount

      this.scrollToCurrentDayTableColumn()
    },
    setCurrentDayToDateDay(){
      this.smallScreenCurrentDay = this.dateDay - 1
      this.scrollToCurrentDayTableColumn()
    },
    scrollToCurrentDayTableColumn(speed){
      var tableColumn = document.querySelector('#tableColumn-' + this.smallScreenCurrentDay)
      if(tableColumn){
        var scrollValue = tableColumn.offsetLeft - this.windowWidth/2 + tableColumn.offsetWidth/2
        var scrollSpeed = speed ? speed : 500

        if(tableColumn.offsetLeft < (this.windowWidth/2 - tableColumn.offsetWidth/2)) scrollValue = 0
        animateScrollTo([scrollValue, 0], {
          minDuration: scrollSpeed,
          elementToScroll: document.querySelector('#main-section')
        });
      }
    },
    updateWindowWidth(event) {
      this.windowWidth = window.innerWidth;
    },
    switchSmallScreenLayout(){
      this.smallScreenLayout = this.smallScreenLayout == 'single' ? 'multiple' : 'single'
      ls.set('smallScreenLayout', this.smallScreenLayout)
    },
    updateDateDay(){
      const day = new Date().getDay()
      if(day == 0) this.dateDay = 7
      else this.dateDay = day
    },
    updateDateTime(){
      const today = new Date()
      this.dateTime = this.addZeroToDate(today.getHours()) + ":" + this.addZeroToDate(today.getMinutes())
    },
    updateDateDate(){
      const today = new Date()
      this.dateDate = this.addZeroToDate(today.getDate()) + "." + this.addZeroToDate(today.getMonth() + 1) + "." + today.getFullYear()
    },
    addZeroToDate(date){
      return date.toString().length == 1 ? "0" + date.toString() : date.toString()
    },
    shuffleWidgetsForFreeHourTimePeriods(){
      var shuffledFreeHourWidgetTimePeriods = []
      var usedArrayPositions = []
      for(var widget of this.freeHourWidgets){
        if(shuffledFreeHourWidgetTimePeriods.length <= this.freeHourWidgets.length){
          var randomArrayPosition = Math.floor(Math.random() * this.freeHourTimePeriods.length)
          while(usedArrayPositions.find(x => x == randomArrayPosition) != undefined){
            randomArrayPosition = Math.floor(Math.random() * this.freeHourTimePeriods.length)
          }
          var randomFreeHourTimePeriod = this.freeHourTimePeriods[randomArrayPosition]
          usedArrayPositions.push(randomArrayPosition)

          randomFreeHourTimePeriod.widget = widget
          shuffledFreeHourWidgetTimePeriods.push(randomFreeHourTimePeriod)
        }
      }
      this.shuffledFreeHourWidgetTimePeriods = shuffledFreeHourWidgetTimePeriods
    }
  }
};
</script>
