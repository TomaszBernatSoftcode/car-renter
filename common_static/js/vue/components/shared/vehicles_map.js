Vue.component('vehicles-map', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-row
            align="center"
            justify="center"
        >
            <v-col 
                :class="'d-flex justify-center'" 
                align-self="center" 
                cols="12"
            >
                <v-card id="mapid" style="z-index: 0; height: 400px; width: 600px;">
                </v-card>
            </v-col>
        </v-row>
    `,
    props: {
        mapWidth: {
            type: Number,
            required: true
        },
        mapHeight: {
            type: Number,
            required: true,
        },
    },
    data: function() {
        return {
            map: null,
            tileLayer: null,
            layers: [
                {
                    id: 0,
                    name: 'Restaurants',
                    active: false,
                    features: [],
                },
            ],
        }
    },
    computed: {
    },
    watch: {
    },
    mounted: function () {
        this.initMap()
    },
    methods: {
        initMap: function () {
            var mymap = L.map('mapid').setView([51.505, -0.09], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                accessToken: 'pk.eyJ1IjoidG9tYmVyOTk2NiIsImEiOiJjazRqbXl5amUwNWM2M2t0OXV4bjZyMGd4In0.934B2RmkwBbwRoSXPVN3OA'
            }).addTo(mymap);

        },
        initLayers: function () {

        },
        fetchCityBoundaries: function () {

        }
    },
});