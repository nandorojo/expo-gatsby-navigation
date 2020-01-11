import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// pages
import Home from './src/pages'
import Profile from './src/pages/Profile'

// check out src/pages to see the pages themselves.
// It's as easy as it looks :)

const AppNavigator = createStackNavigator({
  '/': Home,
  Profile,
})

export default createAppContainer(AppNavigator)
