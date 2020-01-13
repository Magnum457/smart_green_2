// libs
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// páginas
import signIn from './screens/signIn'
import main from './screens/main'

// navegações
export default createAppContainer(
    createSwitchNavigator({
        signIn,
        main
    })
)