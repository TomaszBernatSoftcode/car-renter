Vue.component('renter-panel', {
    template: html`
        <v-content>
            <v-container fluid>
                <v-row>
                    <!-- Karty i wyszukiwarka -->
                    <v-col cols="12">
                        <v-card
                            loading="areOffersLoading"
                        >
                            <v-container fluid>
                                <v-row>
                                    <v-col
                                        cols="12"
                                    >
                                        <v-text-field
                                            label="Szukaj..."
                                            solo
                                        ></v-text-field>
                                        
                                        <v-spacer />
                                        
                                        <v-btn
                                            color="primary"
                                            @click="showFilterModal()"
                                        >
                                            Filtruj
                                        </v-btn>
                                        <v-menu
                                            bottom
                                            origin="center center"
                                            transition="scale-transition"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    color="primary"
                                                    dark
                                                    v-on="on"
                                                >
                                                    Sortuj
                                                </v-btn>
                                            </template>
                                    
                                            <v-list
                                                style="max-height: 128px;"
                                                class="overflow-y-auto"
                                            >
                                                <v-list-item
                                                    v-for="(item, i) in sortMenuItems"
                                                    :key="i"
                                                    @click="sortVehicles(item.value)"
                                                >
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>    
                                    </v-col>
                                </v-row>
                                <v-divider
                                    class="my-2"
                                ></v-divider>
                                <v-row
                                    align="center"
                                    justify="center"
                                >
                                    <v-col 
                                        :class="'d-flex justify-center'" 
                                        align-self="center" 
                                        cols="12" sm="6" md="4" lg="3" xl="2" 
                                        v-for="offer in offers"
                                        :key="'offer-' + offer.id"
                                    >
                                        <vehicle-card
                                            :title="getVehicleTitle(offer)"
                                            :sub-title="offer.car_details.car.type"
                                            :details="compressVehicleDetails(offer)"
                                        ></vehicle-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
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
    data: function() {
        return {
            offers: [],
            sortMenuItems: [
                {
                    title: "Od najwyższej ceny",
                    value: "highestPrice"
                },
                {
                    title: "Od najniższej ceny",
                    value: "lowestPrice"
                },
                {
                    title: "Od najwyższego przebiegu",
                    value: "highestMileage"
                },
                {
                    title: "Od najniższego przebiegu",
                    value: "lowestMileage"
                },
                {
                    title: "Od najnowszego",
                    value: "newest"
                },
                {
                    title: "Od najstarszego",
                    value: "oldest"
                },
            ],
            areOffersLoading: false,
            refreshTimeout: 10000
        }
    },
    computed: {
    },
    watch: {
        isUserFetched: {
            immediate: true,
            handler: function (newValue, oldValue) {
                if (newValue && !oldValue) {
                    this.fetchOffers()
                    this.refreshOffers()
                }
            }
        }
    },
    created: function () {
        this.$root.$emit('fetchUserFromSession')
    },
    methods: {
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
        fetchOffers: function () {
            this.areOffersLoading = true

            return this.$http.get(Urls['inner_api:offers']())
                .then(function (response) {
                    this.offers = response.data.results
                    return true
                })
                .catch(function (error) {
                    Vue.toasted.error('Błąd: Oferty nie mogły zostać pobrane. Prosimy odświeżyć stornę.')
                    return false
                })
                .finally(function () {
                    this.areOffersLoading = false
                }.bind(this))
        },
        refreshOffers: function () {
            this.fetchOffers().then(function (result) {
                if (result) {
                    setTimeout(this.refreshOffers, this.refreshTimeout)
                }
                else {
                    Vue.toasted.error('Błąd: Oferty nie mogły zostać odświeżone. Prosimy odświeżyć stronę.')
                }
            })
        },
        fetchVehicles: function () {

        },
        sortVehicles: function () {

        },
        showFilterModal: function () {

        }
    },
});