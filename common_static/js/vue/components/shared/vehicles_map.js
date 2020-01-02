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
                <v-card 
                    id="mapid" style="z-index: 0;"
                    :height="mapHeight"
                    :width="mapWidth"
                >
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
        zoom: {
            type: Number,
            default: 6
        },
        centerPoint: {
            type: Object,
            default: {
                'lat': 51.818139,
                'lon': 19.534701
            }
        },
        markersPositions: {
            type: Array,
            default: []
        }
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
            correctMapCenter: {},
            correctMarkers: [],
            correctZoom: 12
        }
    },
    computed: {
    },
    watch: {
        markersPositions: {
            immediate:true,
            handler: function (newValue) {
                if (!_.isEmpty(newValue) && !_.isEmpty(this.map)) {
                    _.forEach(newValue, function (car) {
                        var marker = L.marker([car.lat, car.lon]).addTo(this.map)
                        marker.bindPopup("<b>" + car.name + "</b>")
                    }.bind(this))
                }
            }
        }
    },
    mounted: function () {
        this.map = L.map('mapid')
        this.initMap()
    },
    methods: {
        initMap: function () {
            this.map.setView([this.centerPoint.lat, this.centerPoint.lon], this.zoom)

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                accessToken: 'pk.eyJ1IjoidG9tYmVyOTk2NiIsImEiOiJjazRqbXl5amUwNWM2M2t0OXV4bjZyMGd4In0.934B2RmkwBbwRoSXPVN3OA'
            }).addTo(this.map);

        },
    },
});