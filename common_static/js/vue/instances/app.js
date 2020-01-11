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
        this.$root.$on('fetchUserFromSession', this.fetchUserDetails)
    },
    methods: {
        validateUserDetails: function () {

        },
        fetchUserDetails: function () {
            return this.$http.get(Urls['inner_api:retrieve_user_from_session']())
                .then(function (response) {
                    this.user = response.data.results
                })
                .catch(function (error) {
                    var status = error.status,
                        data = error.body
                    if (status === 401) {
                        this.showOverlay(data.message, 'Przejdź do strony logowania', data.redirect)
                    }
                    else if (status === 404) {
                        this.showOverlay(data.message, 'Przejdź do strony głównej', data.redirect)
                    }

                    console.log(error.message)
                })
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
        openLandingPage: function () {
            window.open(Urls['landing_page'](), '_self')
        },
        showOverlay: function (message, actionLabel, actionType) {
            this.overlayMessage = message
            this.overlayActionLabel = actionLabel
            this.overlayActionType = actionType
            this.overlay = true
            window.scrollTo({
                top: this.$refs.overlayElement.offsetTop,
                left: this.$refs.overlayElement.offsetLeft,
                behavior: 'smooth'
            });
        },
        executeOverlayAction: function () {
            if (this.overlayActionType === 'login') {
                this.overlay = false
                this.openLoginPage()
            }
            else if (this.overlayActionType === 'landing') {
                this.overlay = false
                this.openLandingPage()
            }
        }
    }
});