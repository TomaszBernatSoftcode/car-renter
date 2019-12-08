Vue.component('renter-panel', {
    template: html`
        <v-container
            class="fill-height"
            fluid
        >
            <v-row>
                <!-- Nawigacja menu modeli -->
                <v-col cols="3">
                    <vehicle-models-navigation></vehicle-models-navigation>
                </v-col>
                
                <v-col cols="1"></v-col>
                
                <!-- Karty i wyszukiwarka -->
                <v-col cols="8">
                    <vehicles-cards-container></vehicles-cards-container>
                </v-col>
            </v-row>
        </v-container>
    `,
    data: function() {
        return {
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {

    },
});