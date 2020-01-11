Vue.component('landing-page', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-content>
            <!-- intro with register button -->
            <v-container fluid pa-0>
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
            <!-- map with vehicles location -->
            <v-container fluid>
                <vehicles-map
                    :map-height="400"
                    :map-width="600"
                    :zoom="13"
                    :center-point="mapCenterPoint"
                    :markers-positions="vehiclesPosition"
                ></vehicles-map>
            </v-container>
            <!-- pros of account creation -->
            <v-container fluid>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" cols="12" md="4"
                        v-for="(card, index) in infoCards"
                        :key="'card-' + index"
                    >
                        <presentation-text-card
                            :icon-name="card.iconName"
                            :header-text="card.headerText"
                            :main-text="card.mainText"
                        ></presentation-text-card>
                    </v-col>
                </v-row>
            </v-container>
            <!-- register button -->
            <v-container fluid pa-0>
                <v-parallax 
                    src="/media/landing_page/registration_background.jpeg" 
                    dark 
                    height="400"
                >
                    <v-row
                        align="center"
                        justify="center"
                    >
                        <v-col class="text-center" cols="12">
                            <h1 class="display-1 font-weight-thin mb-4">Lorem ipsum dolor sit amet.</h1>
                            <v-btn 
                                class="blue darken-1 mt-5" dark large
                                @click="openRegistrationPage()"    
                            >
                                Utwórz konto
                            </v-btn>
                      </v-col>
                    </v-row>
                </v-parallax>
            </v-container>
            <!-- five newest vehicles -->
            <v-container fluid>
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
    props: {},
    data: function () {
        return {
            latestOffers: [],
            vehiclesPosition: [],
            mapCenterPoint: {
                'lat': 50.675676,
                'lon': 17.921758
            },
            infoCards: [
                {
                    iconName: 'mdi-watch',
                    headerText: 'Postaw na punktualność',
                    mainText: '' +
                        'Show your stuff to the whole community of Endorfine not only to your mum or your friends. ' +
                        'We love making good content viral. ' +
                        'In this moment Endorfine is used by artists who are ' +
                        'not famous but that want to share their works to the world. ' +
                        'Unfortunately with other social networks this is hard, slow and sometime expensive.'
                },
                {
                    iconName: 'mdi-seat',
                    headerText: 'Wybierz wygodę',
                    mainText: '' +
                        'Show your stuff to the whole community of Endorfine not only to your mum or your friends. ' +
                        'We love making good content viral. ' +
                        'In this moment Endorfine is used by artists who are ' +
                        'not famous but that want to share their works to the world. ' +
                        'Unfortunately with other social networks this is hard, slow and sometime expensive.',
                },
                {
                    iconName: 'mdi-currency-usd-off',
                    headerText: 'Zapomnij o utrzymaniu auta',
                    mainText: '' +
                        'Show your stuff to the whole community of Endorfine not only to your mum or your friends. ' +
                        'We love making good content viral. ' +
                        'In this moment Endorfine is used by artists who are ' +
                        'not famous but that want to share their works to the world. ' +
                        'Unfortunately with other social networks this is hard, slow and sometime expensive.',
                }
            ]
        }
    },
    computed: {},
    watch: {},
    created: function () {
        this.fetchLatestOffers()
        this.fetchVehiclesPosition()
    },
    methods: {
        fetchLatestOffers: function () {
            return this.$http.get(Urls['inner_api:offers']())
                .then(function (response) {
                    this.latestOffers = response.data.results
                })
                .catch(function (error) {
                    console.log(error.message)
                })
        },
        fetchVehiclesPosition: function () {
            return this.$http.get(Urls['inner_api:cars_latest_locations']())
                .then(function (response) {
                    this.vehiclesPosition = response.data.results
                })
                .catch(function (error) {
                    console.log(error.message)
                })
        },
        getVehicleTitle: function (vehicle) {
            return vehicle.car_details.car.brand + ' ' + vehicle.car_details.car.model
        },
        compressVehicleDetails: function (offer) {
            return {
                'personCapacity': offer.car_details.car.person_capacity,
                'bootCapacity': offer.car_details.car.boot_capacity,
                'fuelType': offer.car_details.car.fuel_type,
                'gearboxType': offer.car_details.car.gearbox_type,
                'price': offer.value_per_hour
            }
        },
        openRegistrationPage: function () {
            window.open(Urls['registration_page'](), '_self')
        }
    },
});
