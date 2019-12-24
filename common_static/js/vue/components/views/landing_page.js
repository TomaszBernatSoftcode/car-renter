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
                <vehicles-map></vehicles-map>
            </v-container>
            <!-- pros of account creation -->
            <v-container fluid>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" cols="12" md="4">
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-center">
                                <v-icon x-large class="blue--text text--lighten-2">mdi-watch</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-xs-center">Postaw na punktualność</div>
                            </v-card-title>
                            <v-card-text>
                                Show your stuff to the whole community of Endorfine not only to your mum or your friends. 
                                We love making good content viral. In this moment Endorfine is used by artists who are 
                                not famous but that want to share their works to the world. 
                                Unfortunately with other social networks this is hard, slow and sometime expensive.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" cols="12" md="4">
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-center">
                                <v-icon x-large class="blue--text text--lighten-2">mdi-seat</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-xs-center">Wybierz wygodę</div>
                            </v-card-title>
                            <v-card-text>
                                Show your stuff to the whole community of Endorfine not only to your mum or your friends. 
                                We love making good content viral. In this moment Endorfine is used by artists who are 
                                not famous but that want to share their works to the world. 
                                Unfortunately with other social networks this is hard, slow and sometime expensive.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                        :class="'d-flex justify-center'" 
                        align-self="center" cols="12" md="4">
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-center">
                                <v-icon x-large class="blue--text text--lighten-2">mdi-currency-usd-off</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-xs-center">Zapomnij o utrzymaniu auta</div>
                            </v-card-title>
                            <v-card-text>
                                Show your stuff to the whole community of Endorfine not only to your mum or your friends. 
                                We love making good content viral. In this moment Endorfine is used by artists who are 
                                not famous but that want to share their works to the world. 
                                Unfortunately with other social networks this is hard, slow and sometime expensive.
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <!-- register button -->
            <v-container fluid pa-0>
                <v-parallax 
                    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" 
                    dark 
                    height="400"
                >
                    <v-row
                        align="center"
                        justify="center"
                    >
                        <v-col class="text-center" cols="12">
                            <h1 class="display-1 font-weight-thin mb-4">Lorem ipsum dolor sit amet.</h1>
                            <v-btn class="blue lighten-2 mt-5" dark large href="#">
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
                    <v-col :class="'d-flex justify-center'" align-self="center" cols="12" sm="6" md="4" lg="3" v-for="vehicle in firstLineVehicles">
                        <vehicle-card></vehicle-card>
                    </v-col>
                    <v-col :class="'d-flex justify-center'" align-self="center" cols="12" sm="6" md="4" lg="3" v-for="vehicle in secondLineVehicles">
                        <vehicle-card></vehicle-card>
                    </v-col>
                    <v-col :class="'d-flex justify-center'" align-self="center" cols="12" sm="6" md="4" lg="3" v-for="vehicle in thirdLineVehicles">
                        <vehicle-card></vehicle-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    `,
    props: {},
    data: function () {
        return {
            firstLineVehicles: [1,2],
            secondLineVehicles: [1,2],
            thirdLineVehicles: [1,2],
        }
    },
    computed: {},
    watch: {},
    methods: {
        fetchVehicles: function () {

        }
    },
});
