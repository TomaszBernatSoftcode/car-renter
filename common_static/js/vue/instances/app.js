new Vue({
    el: '#car-renter-app',
    vuetify: new Vuetify(),
    delimiters: ['[[', ']]'],
    data: {
        drawer: null,
        source: '',
        absolute: true,
        opacity: 1,
        overlay: false,
        overlayMessage: '',
        overlayActionLabel: '',
        overlayActionType: '',
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

        //global event listeners
        this.$root.$on('openLoginPage', this.openLoginPage)
        this.$root.$on('showOverlay', this.showOverlay)
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
        },
        openRenterPanel: function () {
            window.open(Urls['renter_panel'](), '_self')
        },
        openRegistrationPage: function () {
            window.open(Urls['registration_page'](), '_self')
        },
        openLoginPage: function () {
            window.open(Urls['login'](), '_self')
        },
        showOverlay: function (message, actionLabel, actionType) {
            this.overlayMessage = message
            this.overlayActionLabel = actionLabel
            this.overlayActionType = actionType
            this.overlay = true
        },
        executeOverlayAction: function () {
            if (this.overlayActionType === 'login') {
                this.overlay = false
                this.openLoginPage()
            }
        }
    }
});