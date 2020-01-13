Vue.component('renter-panel', {
    template: html`
        <v-container
            class="fill-height"
            fluid
        >
            <v-row>
                <!-- Nawigacja menu modeli -->
                <v-col cols="2">
                    <div>Test</div>
                </v-col>
                
                <v-col cols="1"></v-col>
                
                <!-- Karty i wyszukiwarka -->
                <v-col cols="9">
                    <vehicles-cards-container></vehicles-cards-container>
                </v-col>
            </v-row>
        </v-container>
    `,
    props: {
        isUserFetched: {
            type: Boolean,
            required: true
        }
    },
    data: function() {
        return {
        }
    },
    computed: {
    },
    created: function() {
        this.$root.$emit('fetchUserFromSession')
    },
    watch: {
    },
    methods: {

    },
});