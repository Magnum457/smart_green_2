// libs
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// páginas
import signIn from './screens/signIn'
import signUp from './screens/signUp'
import main from './screens/main'

// navegações
export default createAppContainer(
    createSwitchNavigator({
        signIn,
        signUp,
        main
    })
)