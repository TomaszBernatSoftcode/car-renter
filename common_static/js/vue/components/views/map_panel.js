Vue.component('map-panel', {
    template: html`
        <v-container
            class="fill-height"
            fluid
        >
          
        </v-container>
    `,
    props: {
        isUserFetched: {
            type: Boolean,
            required: true
        }
    },
    data: function() {
        return {
        }
    },
    created: function() {
        this.$root.$emit('fetchUserFromSession')
    },
    computed: {
    },
    watch: {
    },
    methods: {

    },
});