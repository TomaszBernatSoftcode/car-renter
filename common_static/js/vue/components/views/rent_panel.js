Vue.component('rent-panel', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-content>
            <!-- onging rent -->
            <v-container>
                <v-parallax 
                    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" 
                    dark 
                    height="500"
                >
                    <v-row
                        align="center"
                        justify="center"
                    >
                        <v-col class="text-center" cols="12">
                            <h1 class="display-1 font-weight-thin mb-4">Wypożyczalnia Rent&Go</h1>
                            <div class="d-flex justify-center">
                                <h4 class="subheading" style="max-width: 384px;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. 
                                    Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. 
                                    Quisque semper justo at risus.
                                </h4>
                            </div>
                      </v-col>
                    </v-row>
                </v-parallax>
            </v-container>
            <!-- historic rents -->
            <v-container>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" 
                        cols="12" sm="6" md="4" lg="3" 
                        v-for="offer in latestOffers"
                        :key="'offer-' + offer.id"
                    >
                        <vehicle-card
                            :title="getVehicleTitle(offer)"
                            :sub-title="offer.car_details.car.type"
                            :details="compressVehicleDetails(offer)"
                            :is-reservation-btn-enabled="false"
                        ></vehicle-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    `,
    props: {
        isUserFetched: {
            type: Boolean,
            required: true
        }
    },
    data: function () {
        return {
            ongoingRent: {},
            historicRents: []
        }
    },
    computed: {},
    watch: {},
    created: function () {
        this.$root.$emit('fetchUserFromSession')
        this.fetchOngoingRent()
        this.fetchHistoricRents()
    },
    methods: {
        fetchOngoingRent: function () {
            return this.$http.get(Urls['inner_api:offers']())
                .then(function (response) {
                    this.latestOffers = response.data.results
                })
                .catch(function (error) {
                    console.log(error.message)
                })
        },
        fetchHistoricRents: function () {
            return this.$http.get(Urls['inner_api:cars_latest_locations']())
                .then(function (response) {
                    this.vehiclesPosition = response.data.results
                })
                .catch(function (error) {
                    console.log(error.message)
                })
        },
        endOngingRent: function (vehicle) {
            // Musi zakonczyc bierzace wypozyczenie
            // musi zfetchowac na nowo ongoing rents
            return vehicle.car_details.car.brand + ' ' + vehicle.car_details.car.model
        },
    },
});
