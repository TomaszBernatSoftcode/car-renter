new Vue({
    el: '#car-renter-app',
    vuetify: new Vuetify(),
    delimiters: ['[[', ']]'],
    data: {
        drawer: null,
        source: '',
        user: {}
    },
    computed: {
        isUserFetched: function () {
            return !_.isEmpty(this.user)
        }
    },
    watch: {
    },
    created: function () {
    },
    methods: {
        validateUserDetails: function () {

        },
        fetchUserDetails: function () {

        },
        logOutUser: function () {

        }
    }
});