Vue.component('map-panel', {
    template: html`
        <v-content>
            <v-container fluid>
                <vehicles-map
                    :full-size="true"
                    :map-height="0"
                    :map-width="0"
                    :zoom="13"
                    :center-point="mapCenterPoint"
                    :markers-positions="vehiclesPosition"
                ></vehicles-map>
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
            mapCenterPoint: {
                'lat': 50.675676,
                'lon': 17.921758
            },
            vehiclesPosition: [],
            refreshTimeout: 10000,
        }
    },
    created: function() {
        this.$root.$emit('fetchUserFromSession')
    },
    computed: {
    },
    watch: {
        isUserFetched: {
            immediate: true,
            handler: function (newValue, oldValue) {
                if (newValue && !oldValue) {
                    this.fetchVehiclesPosition()
                    this.refreshVehiclePositions()
                }
            }
        }
    },
    methods: {
        fetchVehiclesPosition: function () {
            return this.$http.get(Urls['inner_api:cars_latest_locations']())
                .then(function (response) {
                    this.vehiclesPosition = response.data.results
                    return true
                })
                .catch(function (error) {
                    Vue.toasted.error('Błąd: Serwer nie odpowiada. Prosimy odświeżyć stronę.')
                    return false
                })
        },
        refreshVehiclePositions: function () {
            this.fetchVehiclesPosition().then(function (response) {
                if (response) {
                   setTimeout(this.refreshVehiclePositions, this.refreshTimeout)
                }
                else {
                    Vue.toasted.error('Błąd: Pozycje pojazdów nie mogły zostać odświeżone. Prosimy odświeżyć stronę.')
                }

            })
        }

    },
});