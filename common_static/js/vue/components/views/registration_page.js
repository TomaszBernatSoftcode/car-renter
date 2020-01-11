Vue.component('registration-page', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-content>
            <!-- registration form -->
            <v-container class="px-8">
                <v-row justify="center">
                    <v-col cols="12">
                        <v-alert
                            v-show="hasRegistrationErrorOccurred"
                            border="top"
                            colored-border
                            type="error"
                            elevation="2"
                        >
                            [[ errorMessage ]]
                        </v-alert>
                        <v-alert
                            color="primary"
                            dark
                            icon="mdi-account-plus"
                            border="left"
                            prominent
                            class="text-center"
                        >
                            Wprowadź niezbędne dane użytkownika
                        </v-alert>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="mt-8"
                        >
                            <v-text-field
                                v-model="name"
                                :counter="24"
                                :rules="nameRules"
                                label="Imię"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="lastName"
                                :counter="24"
                                :rules="lastNameRules"
                                label="Nazwisko"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                        
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="phoneNumber"
                                :rules="phoneNumberRules"
                                label="Numer telefonu"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                            
                            <v-select
                                v-model="city"
                                :items="cities"
                                item-value="id"
                                item-text="name"
                                :rules="cityRules"
                                label="Miasto"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-select>
                            
                            <v-text-field
                                v-model="street"
                                :counter="24"
                                :rules="streetRules"
                                label="Ulica"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="houseNumber"
                                :counter="6"
                                :rules="houseNumberRules"
                                label="Numer budynku"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="apartmentNumber"
                                :counter="6"
                                :rules="apartmentNumberRules"
                                label="Numer mieszkania"
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="postalCode"
                                :rules="postalCodeRules"
                                label="Kod pocztowy"
                                required
                                class="mb-4"
                                :disabled="isFormDisabled"
                                :loading="isFormDisabled"
                            ></v-text-field>
                        
                            <v-checkbox
                                v-model="checkbox"
                                :rules="checkBoxRules"
                                label="Czy wyrażasz zgodę na warunki użytkowania serwisu?"
                                required
                                :disabled="isFormDisabled"
                            ></v-checkbox>
                        </v-form>
                    </v-col>
                    <v-col :class="'d-flex justify-center'" cols="8" align-self="center">
                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="register"
                            :disabled="!valid || isFormDisabled"
                            :loading="isFormDisabled"
                        >
                            Zarejestruj
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    `,
    data: function () {
        return {
            errorMessage: '',
            hasRegistrationErrorOccurred: false,
            valid: true,
            isFormDisabled: false,
            name: '',
            nameRules: [
                function (value) {
                    return !!value || 'Imię użytkownika jest wymagane.'
                },
                function (value) {
                    if (
                        value && value.length >= 3 &&
                        /^\w{3,24}$/.test(value) &&
                        this.isNameReasonable(value)
                    ) return true;
                    return 'Imię użytkownika musi zawierać od 3 do 24 znaków. Bez znaków specjalnych i białych znaków. Np. Jan'
                }.bind(this)
            ],
            lastName: '',
            lastNameRules: [
                function (value) {
                    return !!value || 'Nazwisko użytkownika jest wymagane.'
                },
                function (value) {
                    if (
                        value && value.length >= 3 &&
                        /^\w{3,24}$/.test(value) &&
                        this.isNameReasonable(value)
                    ) return true;
                    return 'Nazwisko użytkownika musi zawierać od 3 do 24 znaków. Bez znaków specjalnych i białych znaków. Np. Kowalski'
                }.bind(this)
            ],
            email: '',
            emailRules: [
                function (value) {
                    return !!value || 'E-mail użytkownika jest wymagany.'
                },
                function (value) {
                    if (value && /^\w{2,}\@\w{2,}\.[a-z]{2,6}$/.test(value)) return true;
                    return 'E-mail użytkownika jest wymagany. Np. email@przykladowy.com'
                }
            ],
            phoneNumber: '',
            phoneNumberRules: [
                function (value) {
                    return !!value || 'Numer telefonu użytkownika jest wymagany.'
                },
                function (value) {
                    if (value && /^\d{3}\-\d{3}\-\d{3}$/.test(value)) return true;
                    return 'Wymagany jest numer telefonu w nastepującym formacie 000-000-000.'
                }
            ],
            cities: [],
            city: null,
            cityRules: [
                function (value) {
                    return !!value || 'Nazwa miasta jest wymagana.'
                },
            ],
            street: '',
            streetRules: [
                function (value) {
                    return !!value || 'Nazwa ulicy jest wymagana.'
                },
                function (value) {
                    if (
                        value && /^[a-zA-Z]{3,}(\ [a-zA-Z]{1,})*$/.test(value) &&
                        value.length <= 24 &&
                        this.isNameReasonable(value)
                    ) return true;
                    return 'Nazwa ulicy jest wymagana i musi zawierać od 3 do 24 znaków. Np. Przykladowa'
                }.bind(this)
            ],
            houseNumber: '',
            houseNumberRules: [
                function (value) {
                    return !!value || 'Numer domu jest wymagany.'
                },
                function (value) {
                    if (
                        value && /^\w{1,6}$/.test(value) &&
                        this.isHouseNumberReasonable(value)
                    ) return true;
                    return 'Numer budynku jest wymagany i musi posiadać od 1 do 6 znaków. Np. 123a'
                }.bind(this)
            ],
            apartmentNumber: '',
            apartmentNumberRules: [
                function (value) {
                    if (!value) return true;
                    if (
                        value && /^\w{1,6}$/.test(value) &&
                        this.isHouseNumberReasonable(value)
                    ) return true;
                    return 'Numer budynku musi posiadać od 1 do 6 znaków. Np. 123a'
                }.bind(this)
            ],
            postalCode: '',
            postalCodeRules: [
                function (value) {
                    return !!value || 'Kod pocztowy jest wymagany.'
                },
                function (value) {
                    if (
                        value && /^\d{2}\-\d{3}$/.test(value)
                    ) return true;
                    return 'Należy podać kod pocztowy w następującym formacie 00-000.'
                }
            ],
            checkbox: false,
            checkBoxRules: [
                function (value) {
                    return !!value || 'Musisz wyrazić zgodę aby kontynuować!'
                }
            ]
        }
    },
    mounted: function () {
        this.fetchCities()
    },
    methods: {
        register: function() {
            if (this.$refs.form.validate()) {
                var today = luxon.DateTime.local().toISODate()

                this.$http.post(
                    Urls['inner_api:client_api_manager'](),
                    {
                        'client': {
                            'name': this.name,
                            'last_name': this.lastName,
                            'email': this.email,
                            'phone_number': this.phoneNumber,
                            'registration_date' : today
                        },
                        'address': {
                            'city': this.city,
                            'street': this.street,
                            'house_number': this.houseNumber,
                            'apartment_number': this.apartmentNumber,
                            'postal_code': this.postalCode,
                            'creation_date': today
                        },
                    }
                )
                .then(function (response) {
                    var message = [
                            'Konto użytkownika zostało utworzone.',
                            'Na podany adres e-mail został wysłany link aktywacyjny.',
                            'Przed próbą logowania prosimy o potwierdzenie rejestracji.'
                        ].join(''),
                        actionLabel = 'Zaloguj się',
                        actionType = 'login'

                    this.$refs.form.reset()
                    this.isFormDisabled = true
                    this.$root.$emit('showOverlay', message, actionLabel, actionType)
                })
                .catch(function (error) {
                    var status = error.status,
                        data = error.body
                    if (status === 400 && data) {
                        this.errorMessage = data.message
                        if (data.clear_fields) {
                            this.email = ''
                            this.phoneNumber = ''
                        }
                    }
                    else if (status === 500) {
                        this.errorMessage = [
                            'Konto użytkownika nie zostało utworzone ze względu na błąd połączenia z serwerem.',
                            'Prosimy spróbować ponownie.',
                            'W przypadku wielokrotnego wystąpienia tego błędu',
                            'prosimy o kontakt z administracją pod adresem administracja@car-renter.com .'
                        ].join(' ')
                    }
                    else {
                        this.errorMessage = 'Wystąpił błąd wewnętrzny serwera prosimy o przeładowanie strony.'
                    }
                    this.hasRegistrationErrorOccurred = true
                    this.scrollTop()
                })
            }
        },
        fetchCities: function () {
            return this.$http.get(Urls['inner_api:cities']())
                .then(function (response) {
                    this.cities = response.data.results
                })
                .catch(function () {
                    this.errorMessage = [
                        'Dostępne miasta nie zostały pobrane.',
                        'Prosimy o odświeżenie strony.',
                        'W przypadku wielokrotnego wystąpienia tego błędu',
                        'prosimy o kontakt z administracją pod adresem administracja@car-renter.com.'
                    ].join(' ')
                    this.hasRegistrationErrorOccurred = true
                })
        },
        isNameReasonable: function (name) {
            var normalizedName = name.toLowerCase(),
                sameLetterCounter = 1,
                previousLetter = null,
                isReasonable = true

            _.forEach(normalizedName, function (character) {
                if (previousLetter === null) {
                    previousLetter = character
                }
                else if (previousLetter === character) {
                    sameLetterCounter++
                    if (sameLetterCounter === 4) {
                        isReasonable = false
                        return
                    }
                }
                else {
                    sameLetterCounter = 1
                    previousLetter = character
                }
            })

            return isReasonable
        },
        isHouseNumberReasonable: function (houseNumber) {
            var previousCharacter = null,
                charactersCounter = 0,
                isReasonable = true

            _.forEach(houseNumber, function (character) {
                if (/^[a-zA-Z]$/.test(character) && previousCharacter === null) {
                    isReasonable = false
                    return
                }

                if (previousCharacter === null) {
                    previousCharacter = character
                }
                else if (/^[a-zA-Z]$/.test(character)) {
                    charactersCounter++
                    if (charactersCounter === 2) {
                        isReasonable = false
                        return
                    }
                }
                else if (/^[a-zA-Z]$/.test(previousCharacter) && !/^[a-zA-Z]$/.test(character)) {
                    isReasonable = false
                    return
                }
            })

            return isReasonable
        },
        scrollTop: function () {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
});