Vue.component('vehicles-cards-container', {
    template: html`
        <v-card
            loading="!areVehiclesReady"
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
                                style="max-height: 64px;"
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
                    
                    <v-col
                        v-for="vehicle in adjustedVehicles"
                        :key="vehicle.id"
                        class="d-flex child-flex"
                        cols="4"
                    >
                        <vehicle-card
                            :car-id="vehicle.id"
                            :car-image="vehicle.image"
                            :car-description="vehicle.description"
                            :car-status="vehicle.status"
                        ></vehicle-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    `,
    data: function() {
        return {
            vehicles: [],
            adjustedVehiclesStore: [],
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
            ]
        }
    },
    computed: {
        areVehiclesReady: function () {
            return !_.isEmpty(this.adjustedVehiclesStore)
        },
        adjustedVehicles: function () {
            return this.adjustedVehiclesStore
        }
    },
    watch: {
        vehicles: {
            immediate:true,
            handler: function (newValue, oldValue) {
                if (!_.isEmpty(newValue) && _.isEmpty(oldValue)) {
                    this.adjustedVehiclesStore = _.map(this.vehicles, _.clone)
                }
            }
        }
    },
    created: function () {
        //TODO: zarejestrować nasluchiwanie na roocie odnośnie filtru modelu i marki
    },
    methods: {
        fetchVehicles: function () {

        },
        sortVehicles: function () {

        },
        showFilterModal: function () {

        }
    },
});