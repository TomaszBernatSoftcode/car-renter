Vue.component('vehicle-card', {
    template: html`
        <v-card
            max-width="250"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
    
            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
    
            <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>
    
                <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
    
            <v-card-actions>
                <v-btn
                    color="orange"
                    text
                >
                    Zarezerwuj
                </v-btn>
            </v-card-actions>
        </v-card>
    `,
    props: {
    },
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