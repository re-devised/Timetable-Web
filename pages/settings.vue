<template>
    <div class="w-full h-full flex flex-col items-center px-10" v-if="isLoaded">

        <div class="border-2 border-accent1-200 rounded-full py-2 px-8 m-2 mb-6 mt-16 md:mt-2 flex flex-row items-center justify-center">
            <h2 class="uppercase text-lg font-bold">{{selectedSetting ? $t(`settings.heading.${selectedSetting}`) : $t('settings.heading.main')}}</h2>
        </div>
    
        <form class="w-max max-w-sm flex flex-col justify-center items-start text-primary-200 font-semibold">

            <div 
            v-if="!selectedSetting"
            class="mt-10 mb-5 border-t-2 border-accent1-200 flex justify-center items-center w-full text-accent1-200 font-bold py-1">
                {{$t('settings.heading.general')}}
            </div>

            <div 
            v-if="!selectedSetting ||  selectedSetting == 'teachernames'"
            class="py-2 flex justify-center items-center">
                <div class="relative inline-block w-10 mr-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="settings.teacherNames" @change="updateSettingsInConfig"
                    name="toggleTeacherNames" id="toggleTeacherNames" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-primary-200 appearance-none cursor-pointer"/>
                    <label for="toggleTeacherNames" class="toggle-label block overflow-hidden h-6 rounded-full bg-accent1-200 cursor-pointer"></label>
                </div>
                <label for="toggleTeacherNames">{{$t('settings.teacherNames')}}</label>
            </div>

            <div
            v-if="!selectedSetting ||  selectedSetting == 'currentsubject'"
            class="py-2 flex justify-center items-center">
                <div class="relative inline-block w-10 mr-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="settings.currentSubject" @change="updateSettingsInConfig"
                    name="toggleCurrentSubject" id="toggleCurrentSubject" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-primary-200 appearance-none cursor-pointer"/>
                    <label for="toggleCurrentSubject" class="toggle-label block overflow-hidden h-6 rounded-full bg-accent1-200 cursor-pointer"></label>
                </div>
                <label for="toggleCurrentSubject">{{$t('settings.currentSubject')}}</label>
            </div>

            <div 
            v-if="!selectedSetting ||  selectedSetting == 'language'"
            class="py-2 w-full">
                <v-select :options="languages" label="full" 
                @input="changeLang" v-model="settings.language"
                    class="settings-select">
                    <template v-slot:no-options="{ searching }">
                        <template v-if="searching">
                        {{$t('settings.select.searchNotFound')}}
                        </template>
                    </template>
                </v-select>
            </div>



            <div 
            v-if="!selectedSetting"
            class="mt-10 mb-5 border-t-2 border-accent1-200 flex justify-center items-center w-full text-accent1-200 font-bold py-1">
                {{$t('settings.heading.timespans')}}
            </div>


            <div 
            v-if="!selectedSetting ||  selectedSetting == 'timespans'"
            class="py-2 flex flex-col justify-center items-center w-full">
                
                <timespan-setting 
                    v-for="(timespan,index) in dayHourTimes" 
                    :key="index"
                    :timespan="timespan"
                    :index="index"
                    @timespanUpdate="updateTimespanInConfig"
                    @timespanRemove="removeTimespanInConfig"
                />

                <timespan-setting 
                    v-if="timespanCreationMode"
                    :index="dayHourTimes.length"
                    @timespanUpdate="updateTimespanInConfig"
                    @timespanRemove="removeTimespanInConfig"
                />

                <div class="flex justify-center items-center p-2 mt-4">
                    <button @click.prevent="enterTimeSpanCreationMode"
                    class="h-6 w-6 rounded-full border-2 border-accent1-200 text-lg flex flex-row items-center justify-center
                    focus:outline-none hover:bg-primary-200 hover:border-primary-200 hover:text-accent1-100
                    ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>
            </div>





            <div 
            v-if="!selectedSetting"
            class="mt-10 mb-5 border-t-2 border-accent1-200 flex justify-center items-center w-full text-accent1-200 font-bold py-1">
                {{$t('settings.heading.experimental')}}
            </div>
            
            <div 
            v-if="!selectedSetting ||  selectedSetting == 'freehourwidgets'"
            class="py-2 flex justify-center items-center">
                <div class="relative inline-block w-10 mr-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="settings.freeHourWidgets" @change="updateSettingsInConfig"
                    name="toggleFreeHourWidgets" id="toggleFreeHourWidgets" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-primary-200 appearance-none cursor-pointer"/>
                    <label for="toggleFreeHourWidgets" class="toggle-label block overflow-hidden h-6 rounded-full bg-accent1-200 cursor-pointer"></label>
                </div>
                <label for="toggleFreeHourWidgets">{{$t('settings.freeHourWidgets.toggle')}}</label>
            </div>
            <div 
            v-if="!selectedSetting ||  selectedSetting == 'textwidget'"
            class="py-2 flex flex-col justify-center items-center w-full" style="min-width:250px">
                <input
                class="bg-white border-2 border-transparent appearance-none rounded-lg text-sm
                w-full py-2 px-4 placeholder-primary-100 leading-tight focus:outline-none 
                focus:bg-white focus:border-primary-200 disabled:opacity-40"
                id="textFreeHourTextWidget"
                maxlength="20"
                type="text"
                v-model="widgets.text"
                :placeholder="$t('settings.freeHourWidgets.textWidget')"
                @change="updateSettingsInConfig"
                :disabled="!settings.freeHourWidgets"
                />
            </div>
            
        </form>

    </div>
    <loading-screen v-else />
</template>


<script>
import LoadingScreen from '~/components/LoadingScreen'
import TimespanSetting from '~/components/TimespanSetting'
import ls from 'local-storage'
import 'vue-select/dist/vue-select.css';

export default {
    transition: 'transition',
    components: {
        LoadingScreen,
        TimespanSetting
    },
    data() {
        return {
            settings: {
                teacherNames: true,
                currentSubject: true,
                freeHourWidgets: false,
                language: {"full" : "English", "acronym" : "en"}
            },
            widgets:{
                text: ""
            },
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
            languages: [
                {"full" : "English", "acronym" : "en"},
                {"full" : "Deutsch", "acronym" : "de"}
            ],
            timespanCreationMode: false,
            selectedSetting: undefined,
            isLoaded: false
        }
    },
    created() {
        this.selectedSetting = this.$route.query.setting
        if(this.$route.query.language){
            var languageFromQueryInLanguages = this.languages.find(x => x.acronym == this.$route.query.language)
            if(languageFromQueryInLanguages){
                this.settings.language = languageFromQueryInLanguages
                this.changeLang()
            }
        }
    },
    mounted() {
        var settingsInConfig = ls.get('settings')
        if(settingsInConfig) this.settings = settingsInConfig
        else ls.set('settings', this.settings)

        this.$i18n.locale = this.settings.language.acronym

        var widgetsInConfig = ls.get('widgets')
        if(widgetsInConfig) this.widgets = widgetsInConfig
        else ls.set('widgets', this.widgets)

        var timespansInConfig = ls.get('timespans')
        if(timespansInConfig) this.dayHourTimes = timespansInConfig
        else ls.set('timespans', this.dayHourTimes)

        this.isLoaded = true
    },
    methods: {
        updateSettingsInConfig(){
            if(!this.settings.freeHourWidgets) this.resetWidgets()
            ls.set('settings', this.settings)
            this.settings = ls.get('settings')
            ls.set('widgets', this.widgets)
            this.widgets = ls.get('widgets')
        },
        updateTimespanInConfig([timespanInput, index]){
            var updatedDayHourTimes = this.dayHourTimes
            updatedDayHourTimes[index] = timespanInput
            ls.set('timespans', updatedDayHourTimes)
            this.dayHourTimes = ls.get('timespans')
            this.timespanCreationMode = false
        },
        removeTimespanInConfig(index){
            var updatedDayHourTimes = this.dayHourTimes
            updatedDayHourTimes.splice(index, 1)
            ls.set('timespans', updatedDayHourTimes)
            this.dayHourTimes = ls.get('timespans')
            this.timespanCreationMode = false
        },
        enterTimeSpanCreationMode(){
            this.timespanCreationMode = true
        },
        resetWidgets(){
            this.widgets.text = ""
        },
        changeLang() {
            if(this.settings.language != null){
                this.updateSettingsInConfig()
                this.$i18n.locale = this.settings.language.acronym
            }
        }
    }
}
</script>

<style lang="scss">
.toggle-checkbox:checked {
  @apply right-0 border-primary-200;
}
.toggle-checkbox:checked + .toggle-label {
  @apply bg-primary-200;
}


.settings-select .vs__search::placeholder,
.settings-select .vs__dropdown-toggle {
    @apply bg-white border-2 border-transparent appearance-none rounded-lg text-sm 
        w-full h-full py-2 px-3 placeholder-primary-100 focus:border-primary-200 focus:outline-none disabled:opacity-40;
    min-width: 250px;
    & > * {
        @apply text-primary-100;
    }
}

.settings-select .vs__dropdown-menu {
  @apply bg-white rounded-lg p-1 mt-1;
  & > * {
    @apply text-primary-100 py-1 px-2 hover:text-primary-200 rounded-md hover:bg-primary-100;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.settings-select .vs__selected {
  @apply text-primary-200 h-full m-0;
}
.settings-select .vs__search {
  @apply text-primary-200 h-full pl-1 m-0;
}
.settings-select .vs__clear{
    visibility: hidden;
}
.settings-select .vs__open-indicator {
    @apply p-0 mr-1;
}
.settings-select .vs__actions{
    @apply p-0;
}
</style>