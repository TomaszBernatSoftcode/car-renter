new Vue({
    el: '#car-renter-app',
    vuetify: new Vuetify(),
    delimiters: ['[[', ']]'],
    data: {
        drawer: null,
        source: '',
        user: {},
        labelsHidden: false,
    },
    computed: {
        isUserFetched: function () {
            return !_.isEmpty(this.user)
        },
        areNavBarLabelsHidden: function () {
            return this.labelsHidden
        },
    },
    watch: {
    },
    created: function () {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    methods: {
        validateUserDetails: function () {

        },
        fetchUserDetails: function () {

        },
        logOutUser: function () {

        },
        handleResize: function () {
            var windowWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            this.labelsHidden = windowWidth <= 450;
        }
    }
});