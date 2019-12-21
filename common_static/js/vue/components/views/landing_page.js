Vue.component('landing-page', {
    template: html`
        <v-container
            class="fill-height"
            fluid
        >
            <v-row >
                <v-col>
                    <template>
                        <v-parallax
                            dark
                            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                        >
                            <v-row
                                align="center"
                                justify="center"
                            >
                                <v-col class="text-center" cols="12">
                                    <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
                                    <h4 class="subheading">Build your application today!</h4>
                                </v-col>
                            </v-row>
                        </v-parallax>
                    </template>
                </v-col>
            </v-row>
          
        </v-container>
    `,
    props: {},
    data: function () {
        return {}
    },
    computed: {},
    watch: {},
    methods: {},
});
