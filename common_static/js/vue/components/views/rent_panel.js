Vue.component('rent-panel', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-content>
            <v-container>
                <!-- ongoing rent -->
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" 
                        cols="10" sm="8"
                    >
                        <v-card
                            v-if="isOngoingRentFetched"
                            class="mx-auto"
                        >
                            <v-card-subtitle 
                                class="pb-0"
                            >
                                [[ carName ]]
                            </v-card-subtitle>
                        
                            <v-card-text
                                class="text--primary"
                            >
                                <div>Zadeklarowany moment rozpoczęcia: [[ getFormattedTimestamp(ongoingRent.start_ts) ]]</div>
                                <div>Zadeklarowany moment zakończenia: [[ getFormattedTimestamp(ongoingRent.stop_ts) ]]</div>
                                <div>Cena za godzine: [[ ongoingRent.offer.value_per_hour ]] zł</div>
                                <div>Oferta z dnia: [[ ongoingRent.offer.add_date ]]</div>
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-row
                                    align="center"
                                    justify="center"
                                >
                                    <v-btn
                                        color="primary"
                                        text
                                        @click="endOngoingRent()"
                                    >
                                        Zakończ wypożyczenie
                                    </v-btn>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                        <v-card 
                            v-else
                            :loading="isOngoingRentFetching"
                        >
                            <v-card-title>
                                Brak aktualnego wypożyczenia.
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- divider -->
                <v-divider
                    v-if="!isOngoingRentFetched || !areHistoricRentsFetched"
                    class="my-12"
                ></v-divider>
                <v-divider
                    v-else
                    class="my-2"
                ></v-divider>
                <!-- historic rents -->
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" 
                        cols="10" sm="8"
                    >
                        <v-expansion-panels
                            v-if="areHistoricRentsFetched"
                            multiple
                            focusable
                        >
                            <v-expansion-panel
                                v-for="(rent,i) in historicRents"
                                :key="i"
                            >
                                <v-expansion-panel-header>[[ createCarName(rent.offer.car_details.car) ]]</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div>Zadeklarowany moment rozpoczęcia: [[ getFormattedTimestamp(rent.start_ts) ]]</div>
                                    <div>Zadeklarowany moment zakończenia: [[ getFormattedTimestamp(rent.stop_ts) ]]</div>
                                    <div>Cena za godzine: [[ rent.offer.value_per_hour ]] zł</div>
                                    <div>Oferta z dnia: [[ rent.offer.add_date ]]</div>
                                    <div>Czy zapłacono: [[ getHasPaidLabel(rent.has_paid) ]]</div>
                                    <div>Moment zapłaty: [[ getFormattedTimestamp(rent.payment_timestamp) ]]</div>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                        </v-expansion-panels>
                        <v-card 
                            v-else
                            :loading="areHistoricRentsFetching"
                        >
                            <v-card-title>
                                Brak historycznych wypożyczeń.
                            </v-card-title>
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
        },
        user: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            ongoingRent: {},
            isOngoingRentFetching: false,
            historicRents: [],
            areHistoricRentsFetching: false,
            carLatestGeoLocations: {}
        }
    },
    computed: {
        carName: function () {
            return [
                this.ongoingRent.offer.car_details.car.brand,
                this.ongoingRent.offer.car_details.car.model,
                '-',
                this.ongoingRent.offer.car_details.car.type,
                ', Kolor:',
                this.ongoingRent.offer.car_details.car.color,
                ',',
                this.ongoingRent.offer.car_details.car.average_burning,
                '/ 100km',
                this.getFuelTypeName(this.ongoingRent.offer.car_details.car.fuel_type)
            ].join(' ')
        },
        isOngoingRentFetched: function () {
            return !_.isEmpty(this.ongoingRent)
        },
        areHistoricRentsFetched: function () {
            return !_.isEmpty(this.historicRents)
        },
    },
    watch: {
        isUserFetched: {
            immediate: true,
            handler: function (newValue, oldValue) {
                if (newValue && !oldValue) {
                    this.fetchOngoingRent()
                    this.fetchHistoricRents()
                }
            }
        }
    },
    created: function () {
        this.$root.$emit('fetchUserFromSession')
    },
    methods: {
        createCarName: function(carDetails) {
            return [
                carDetails.brand,
                carDetails.model,
                '-',
                carDetails.type,
                ', Kolor:',
                carDetails.color,
                ',',
                carDetails.average_burning,
                '/ 100km',
                this.getFuelTypeName(carDetails.fuel_type)
            ].join(' ')
        },
        getHasPaidLabel: function(hasPaid) {
            return hasPaid ? 'Tak' : 'Nie'
        },
        getFormattedTimestamp: function(isoTime) {
            if (_.isEmpty(isoTime)){
                return 'Nieznany'
            }
            return luxon.DateTime.fromISO(isoTime).toFormat('yyyy-MM-dd HH:mm')
        },
        getFuelTypeName: function (fuelType) {
            switch (fuelType) {
                case 'gasoline':
                    return 'Benzyna'
                case 'lpg':
                    return 'Gaz'
                case 'electricity':
                    return 'Elektryczność'
                default:
                    return 'Nieokreślone'
            }
        },
        fetchOngoingRent: function() {
            this.isOngoingRentFetching = true

            return this.$http.get(Urls['inner_api:client_ongoing_rent'](this.user.user.id))
                .then(function (response) {
                    this.ongoingRent = response.data
                    this.isOngoingRentFetching = false
                })
                .catch(function (error) {
                    this.ongoingRent = {}
                    if (error.status === 404) {
                        Vue.toasted.info(error.data.message, {duration: 6000})
                    }
                    else {
                        Vue.toasted.error(
                            'Błąd: Dane o trwającym wypożyczeniu nie mogły zostać pobrane. Prosimy odświeżyć stronę.'
                        )
                    }
                    this.isOngoingRentFetching = false
                })
        },
        fetchHistoricRents: function() {
            this.areHistoricRentsFetching = true

            return this.$http.get(Urls['inner_api:client_historic_rents'](this.user.user.id))
                .then(function (response) {
                    this.historicRents = response.data
                    this.areHistoricRentsFetching = false
                })
                .catch(function (error) {
                    this.historicRents = []
                    if (error.status === 404) {
                        Vue.toasted.info(error.data.message, {duration: 6000})
                    }
                    else {
                        Vue.toasted.error(
                            'Błąd: Dane o historycznych wypożyczeniach nie mogły zostać pobrane. Prosimy odświeżyć stronę.'
                        )
                    }
                    this.areHistoricRentsFetching = false
                })
        },
        fetchCarsLatestGeoCoordinates: function () {
            return this.$http.get(
                    Urls['inner_api:car_latest_locations'](this.ongoingRent.offer.car_details.car.id)
                )
                .then(function (response) {
                    this.carLatestGeoLocations = response.data
                })
                .catch(function (error) {
                    this.carLatestGeoLocations = {}
                    Vue.toasted.error('Błąd: ' + error.data.message)
                })
        },
        updateOngoingRent: function () {
            return this.$http.put(
                    Urls['inner_api:end_ongoing_rent'](this.ongoingRent.id),
                    {
                        endTimestamp: luxon.DateTime.local().toISOTime(),
                        latestCoordinates: this.carLatestGeoLocations
                    }
                )
                .then(function (response) {
                    return true
                })
                .catch(function (error) {
                    Vue.toasted.error('Błąd: ' + error.data.message)
                })
        },
        endOngoingRent: function () {
            this.fetchCarsLatestGeoCoordinates()
                .then(function (response) {
                    if (!_.isEmpty(this.carLatestGeoLocations)) {
                        return this.updateOngoingRent()
                    }

                    throw 'Ostatnie położenie nie mogło zostać pobrane.'
                })
                .then(function (response) {
                    if (response) {
                        Vue.toasted.success('Wypożyczenie zakończone.', {duration: 6000})
                        Vue.toasted.info('Pobieranie danych o wypożyczeniach.', {duration: 6000})

                        this.ongoingRent = {}
                        this.historicRents = []
                        this.fetchOngoingRent()
                        this.fetchHistoricRents()

                    }
                })
                .catch(function (error) {
                    this.carLatestGeoLocations = {}
                    Vue.toasted.error('Błąd: ' + error.data.message)
                })
        }
    },
});
