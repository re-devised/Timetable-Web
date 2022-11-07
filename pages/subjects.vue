<template>
    <div class="w-full h-full flex flex-col items-center" v-if="isLoaded">
        <modal
            ref="modal"
        > 
            <form class="w-full max-w-sm">
                <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                    <label
                    class="block text-primary-100 font-semibold md:text-right max-w-20 mb-1 md:mb-0 pr-4"
                    for="subject-input"
                    >
                    {{$t('subjects.modal.subject')}}*
                    </label>
                </div>
                <div class="md:w-4/5">
                    <input
                    class="bg-gray-200 appearance-none rounded w-full py-2 px-4 text-primary-300 leading-tight focus:outline-none focus:bg-white"
                    id="subject-input"
                    type="text"
                    maxlength="10"
                    v-model="creationForm.name"
                    />
                </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                    <label
                    class="block text-primary-100 font-semibold md:text-right max-w-20 mb-1 md:mb-0 pr-4"
                    for="teacher-input"
                    >
                    {{$t('subjects.modal.teacher')}}
                    </label>
                </div>
                <div class="md:w-4/5">
                    <input
                    class="bg-gray-200 appearance-none rounded w-full py-2 px-4 text-primary-300 leading-tight focus:outline-none focus:bg-white"
                    id="teacher-input"
                    type="text"
                    maxlength="12"
                    v-model="creationForm.teacher"
                    />
                </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                    <label
                    class="block text-primary-100 font-semibold md:text-right max-w-20 mb-1 md:mb-0 pr-4"
                    for="room-input"
                    >
                    {{$t('subjects.modal.room')}}
                    </label>
                </div>
                <div class="md:w-4/5">
                    <input
                    class="bg-gray-200 appearance-none rounded w-full py-2 px-4 text-primary-300 leading-tight focus:outline-none focus:bg-white"
                    id="room-input"
                    type="text"
                    maxlength="4"
                    v-model="creationForm.room"
                    />
                </div>
                </div>

                
                <div class="md:flex md:items-center">
                <div class="md:w-1/5"></div>
                <div class="md:w-4/5">
                    <button
                    @click="currentEditSubjectId != '' ? updateSubject() : createSubject()"
                    class="shadow bg-primary-100 hover:bg-primary-300 focus:shadow-outline focus:outline-none text-white font-semibold py-2 px-4 rounded"
                    type="button"
                    >
                    {{$t('subjects.modal.submit')}}
                    </button>
                </div>
                </div>
            </form>
        </modal>

      <div class="border-2 border-accent1-200 rounded-full py-2 px-8 m-2 mb-8 mt-16 md:mt-2 flex flex-row items-center justify-center">
        <h2 class="uppercase text-lg font-bold">{{$t('subjects.heading.main')}}</h2>
        <button 
        @click="$refs.modal.open()"
        class="h-8 w-28 ml-4 rounded-lg border-2 border-primary-100 text-lg flex flex-row items-center justify-center
        focus:outline-none hover:bg-primary-200 hover:border-primary-200 hover:text-accent1-100
        ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
        
        <transition-group name="fade2" tag="div" class="flex flex-row flex-wrap justify-center">
        <subject-piece 
            v-for="subject in subjects"
            :key="subject._id"
            :subject="subject"
            @deleteSubject="deleteSubject"
            @editSubject="openEditModal"
        />
        </transition-group>

    </div>
    <loading-screen v-else />
</template>


<script>
import SubjectPiece from '~/components/SubjectPiece'
import Modal from '~/components/Modal'
import LoadingScreen from '~/components/LoadingScreen'
import ls from 'local-storage'
import { mapState } from 'vuex'

export default {
    transition: 'transition',
    components: {
        SubjectPiece,
        Modal,
        LoadingScreen
    },
    data() {
        return {
            creationForm: {
               name: "",
               room: "",
               teacher: "" 
            },
            currentEditSubjectId : "",
            isLoaded: false
        }
    },
    computed: {
        ...mapState({
            subjects: state => state.subjects.subjects,
        }),
    },
    async created() {
        this.$store.dispatch('subjects/fetchSubjects')
    },
    mounted() {
        var settingsInConfig = ls.get('settings')
        if(settingsInConfig) this.$i18n.locale = settingsInConfig.language.acronym  

        this.isLoaded = true
    },
    methods: {
        async createSubject(){
            await this.$store.dispatch("subjects/createSubject", this.creationForm)
            this.clearCreationForm()
            this.$refs.modal.close()
        },
        async deleteSubject(subjectId){
            await this.$store.dispatch("subjects/deleteSubject", subjectId)
        },
        async updateSubject(){
            await this.$store.dispatch("subjects/updateSubject", [this.currentEditSubjectId, this.creationForm])
            this.clearCreationForm()
            this.$refs.modal.close()
        },
        openEditModal(subject){
            this.currentEditSubjectId = subject._id
            this.creationForm.name = subject.name
            this.creationForm.room = subject.room
            this.creationForm.teacher = subject.teacher
            this.$refs.modal.open()
        },
        clearCreationForm(){
            this.creationForm.name = ""
            this.creationForm.room = ""
            this.creationForm.teacher = ""
            this.currentEditSubjectId = ""
        }
    }
}
</script>