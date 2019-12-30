Vue.component('presentation-text-card', {
    delimiters: ['[[', ']]'],
    template: html`
        <v-card class="elevation-0 transparent">
            <v-card-text class="text-center">
                <v-icon x-large class="blue--text text--lighten-2">[[ iconName ]]</v-icon>
            </v-card-text>
            <v-card-title primary-title class="layout justify-center">
                <div class="headline text-xs-center">[[ headerText ]]</div>
            </v-card-title>
            <v-card-text>
                [[ mainText ]]
            </v-card-text>
        </v-card>
    `,
    props: {
        iconName: {
            required: true,
            type: String
        },
        headerText:{
            required: true,
            type: String
        },
        mainText: {
            required: true,
            type: String
        }
    }
});