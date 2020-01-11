Vue.component('user-panel', {
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
    computed: {
    },
    created: function() {
        this.$root.$emit('fetchUserFromSession')
    },
    watch: {
    },
    methods: {

    },
});