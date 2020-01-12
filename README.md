# Expo + Gatsby + React Navigation 🤵

** Not ready yet, coming soon :) **

A set of hooks that wrap the `react-navigation` API that you're used to, and make it work with Gatsby's built-in routing.

This library helps me use the [Expo + Gatsby integration](https://docs.expo.io/versions/latest/guides/using-gatsby/) without stressing about navigation.

---

Want to use `next.js` with expo instead? Check out [expo-next-react-navigation](https://github.com/nandorojo/expo-next-react-navigation).

---

## Example

👾 [Github Repo](https://github.com/nandorojo/expo-gatsby-navigation/tree/master/examples/eg) | 💻 [Website](https://eg.now.sh/)

## Install

```sh
yarn add expo-gatsby-navigation
```

## Table of contents

-   [Set up](#set-up)
-   [Usage](#usage)
-   Hooks
    -   [`useRouting`](#userouting)
    -   [`useFocusEffect`](#useFocusEffect)
-   Components
    -   [`Link`](#link)

## Set up

**Install gatsby with expo:**

-   Install expo: `npm install -g expo-cli`

-   Init: `expo init woohoo`

-   `cd woohoo`

-   Install gatsby: `yarn add gatsby gatsby-plugin-react-native-web`

-   Create a gatsby-config.js and use the plugin - touch gatsby-config.js

`gatsby-config.js`

```es6
module.exports = {
	plugins: [
		`gatsby-plugin-react-native-web`,
		/* ... */
	],
}
```

-   Add `/.cache` and `/public` to your `.gitignore` file

**All done! Run `yarn gatsby develop` & open [http://localhost:8000](http://localhost:8000)** 👻

_I recommend becoming familiar `gatsby`'s architecture with `expo`. Follow the docs on the [Expo docs](https://docs.expo.io/versions/latest/guides/using-gatsby/) or see [this article](https://dev.to/evanbacon/gatsby-react-native-for-web-expo-2kgc) by Evan Bacon if you're curious._

-   Take a look at the [gatsby tutorial](https://www.gatsbyjs.org/docs/routing/) for creating pages.

## Usage

Replace the following instances in your code after installation and setup:

### `useNavigation` 👉 `useRouting`

```diff
-import { useNavigation } from 'react-navigation-hooks'
+import { useRouting } from 'expo-gatsby-navigation'
```

### `useLayoutEffect`

```diff
-import { useLayoutEffect } from 'react-navigation-hooks'
+import { useLayoutEffect } from 'expo-gatsby-navigation'
```

### `<TouchableOpacity />` 👉 `<Link />`

```diff
-import { TouchableOpacity } from 'react-native'
+import { Link } from 'expo-gatsby-navigation'

-<TouchableOpacity onPress={() => navigate({ routeName: 'chat' })}>
-  <Text>Go</Text>
- </TouchableOpacity>
+<Link routeName="chat" params={{ roomId: 'hey!' }}>
+  Go
+</Link>
```

All set ⚡️

# API

## `useRouting`

React hook that wraps `useNavigation` (from react-navigation) hook and makes it play nicely with Gatsby's built-in [routing](https://www.gatsbyjs.org/docs/routing/).

It follows the [same API](https://reactnavigation.org/docs/en/next/use-navigation.html) as `useNavigation`.

```es6
import { useRouting } from 'expo-gatsby-navigation`

export default function Screen({ location }) {
  const { navigation, push, getParam, goBack } = useRouting()

  return <CoolComponent />
}
```

### `navigate`

Only argument is a dictionary with these values. Unlike `react-navigation`, this doesn't currently support a string as argument.

-   `routeName`: string, **required**
-   `params`: optional dictionary
-   `web`: Optional dictionary with added values for web, following the API from `gatsby`'s `navigate` [function](https://www.gatsbyjs.org/docs/gatsby-link/#how-to-use-the-navigate-helper-function).
    -   `to`: (optional string) Fulfills the same value as `to` from `gatsby` Link component, overriding the `routeName` field. If you set this to `/cars`, it will navigate to `/cars` instead of the /`routeName` field. As a result, it will load the file located at `src/pages/cars.js` as the screen.
    -   replace: (optional boolean) If `true`, replaces the current URL in history.

**Example:** Navigate to a user

```es6
export default function Home() {
	const { navigate } = useRouting()

	// goes to yourdomain.com/user
	// and sends the param to the screen component
	// see getParam() docs for more
	const onPress = () =>
		navigate({
			routeName: 'user',
			params: { id: 'chris' },
		})

	// 👇or this👇
	// goes to `yourdomain.com/profile`
	const navigateCleanLink = () =>
		navigate({
			routeName: 'user',
			params: { id: 'chris' },
			web: { to: `/profile` },
		})

	// 👇or this👇
	// 'profile' path overrides 'user' on web, so it uses the src/pages/profile.js file
	// even though it navigates to yourdomain.com/profile
	// this will also replace the current screen in the history
	const navigateCleanLinkWithParam = () =>
		navigate({
			routeName: 'user',
			params: { id: 'chris' }, // accessed with getParam and the location prop in the screen file
			web: { replace: true, to: '/profile' },
		})
}
```

For more thoughts on how and when you should use the `web` field, see [Web Thoughts](#web-thoughts).

### `getParam`

[Same API](https://reactnavigation.org/docs/en/navigation-prop.html#getparam-get-a-specific-param-value-with-a-fallback) as `getParam` from react-navigation, with an important difference.

**Important:** The `getParam` function with gatsby is slightly less simple than the one offered by `expo-next-react-navigation`. You have to provide a fallback value as the second argument. This is because gatsby doesn't expose a hook to access the location.

**Example:** `src/pages/index.js`

```es6
export default function Screen({ location }) {
	const { getParam } = useRouting()
	// when on web, it will return the value for location.state.userId
	// web on mobile, it will use react-navigation
	const userId = getParam('userId', location.state.userId)
}
```

## `useFocusEffect`

See [react navigation docs](https://reactnavigation.org/docs/en/next/use-focus-effect.html#docsNav). On web, it simply replaces the focus effect with a normal effect hook. On mobile, it is the exact react navigation hook.

Make sure to use [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) as seen in the example below.

```es6
import { useFocusEffect } from 'expo-gatsby-navigation'

export default ({ userId }) => {
	useFocusEffect(
		useCallback(() => {
			const unsubscribe = API.subscribe(userId, user => setUser(user))

			return () => {
				unsubscribe()
			}
		}, [userId])
	)

	return <Profile userId={userId} />
}
```

## `Link`

The following will use the `chat` route in react navigation.

However, it will use the `src/pages/room.js` file for Gatsby.

Optionally accepts a `gatsbyLinkProps` prop dictionary and `touchableOpacityProps` dictionary as well.

```es6
export default function Button() {
	return (
		<Link
			routeName="chat"
			params={{ roomId: '12' }}
			web={{
				to: '/room',
				replace: false,
			}}
		>
			Chat in room 12
		</Link>
	)
}
```

**Required props**:

-   `routeName`: string, see [`useRouting().navigate`](#navigate) docs.
-   `children`: string

**Optional props**

-   `web`: dictionary, see [`useRouting().navigate`](#navigate) docs.

-   `touchableOpacityProps`: extends React Native's `TouchableOpacity` props.

-   `gatsbyLinkProps`: extends `gatsby`'s [Link props](https://nextjs.org/docs#with-link).

## Web Thoughts

The `web` prop in the `navigate` function and `Link` component can help provide cleaner urls (`user/mike` instead of `user?id=mike`) on web.

Also, navigation patterns on mobile can be different than web, and this field can help you account for those situations.

For instance, imagine you have a tab navigator. Say the first tab has a nested stack navigator with an inbox screen and a chat room screen. If you navigate from a notifications tab to this tab, and a chat room screen was already open, you probably want that chat room to stay open on mobile. Only if you press the tab button a second time should it pop back to the inbox screen.

This may not be the case on `web`. Web navigation patterns on web may lead you to want to open the inbox directly, instead of the open chat screen. This example could look something like this:

```es6
navigate({
	routeName: 'inboxStack',
	web: {
		to: '/inbox',
	},
})
```
