Vue.component('vehicle-models-navigation', {
    template: html`
        <v-list
            style="max-height: 100px;"
            class="overflow-y-auto"
        >
            <v-list-group
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title 
                            v-text="item.title"
                            @click="initializeVehiclesBrandFilter(item.title)"
                        ></v-list-item-title>
                    </v-list-item-content>
                </template>
    
                <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    @click="initializeVehicleModelFilter(subItem.title)"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
              </v-list-item>
            </v-list-group>
        </v-list>
    `,
    props: {
        vehicles: {
            required: true,
            type: Array
        }
    },
    data: function() {
        return {
            vehiclesCopy: [],
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
    },
    watch: {
    },
    methods: {
        fetchVehicleTypes: function () {

        },
        initializeVehiclesBrandFilter: function (brand) {

        },
        initializeVehicleModelFilter: function (model) {

        }
    },
});