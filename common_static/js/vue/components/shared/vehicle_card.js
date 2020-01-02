Vue.component('vehicle-card', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-card
            v-if="areDetailsCorrect"
            min-width="250"
            max-width="250"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="imagePath"
            >
                <v-card-title>[[ title ]]</v-card-title>
            </v-img>
    
            <v-card-subtitle class="pb-0">[[ subTitle ]]</v-card-subtitle>
    
            <v-card-text class="text--primary">
                <div>
                    <span><v-icon small>mdi-account-supervisor</v-icon>: [[ details.personCapacity ]]</span>
                    <span><v-icon small>mdi-cart-arrow-down</v-icon>: [[ details.bootCapacity ]]L</span>
                    <span><v-icon small>mdi-gas-station</v-icon>: [[ details.fuelType ]]</span>
                    <span><v-icon small>mdi-car-shift-pattern</v-icon>: [[ details.gearboxType ]]</span>
                </div>
                <div>
                    [[ details.price ]] zł/h
                </div>
            </v-card-text>
    
            <v-card-actions
                v-if="isReservationBtnEnabled"
            >
                <v-btn
                    color="green"
                    text
                >
                    Zarezerwuj
                </v-btn>
                <v-btn
                    color="primary"
                    text
                >
                    Sprwadź położenie
                </v-btn>
            </v-card-actions>
        </v-card>
    `,
    props: {
        title:{
            type: String,
            required: true,
        },
        subTitle:{
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
            default: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        },
        details: {
            type: Object,
            required: true,
        },
        isReservationBtnEnabled: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
        }
    },
    computed: {
        areDetailsCorrect: function () {
            // TODO: dodac warunek sprawdzajcy czy zostal przekazany dobry obiekt
            return true
        }
    },
    watch: {
    },
    methods: {
    },
});