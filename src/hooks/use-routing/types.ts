export type Route<
	/**
	 * Route string path
	 */
	R extends string
> = {
	routeName: R
	params?: object
}

type GenericRoute = {
	/**
	 * React navigation route or page name for next.js
	 */
	routeName: string
	/**
	 * (optional) Dictionary that will be accessed via `getParams` in the target screen.
	 */
	params?: object
	/**
	 * Dictionary that will only be used for Gatsby's Link component on web. These props will be ignored on mobile.
	 *
	 * @example
	 *
	 * The following will use the `home` route in react navigation.
	 *
	 * However, it will use the `src/pages/index.tsx` file for gatsby. Also, it will show up as `domain.com/inbox` in the address bar.
	 *
	 * ```es6
	 * export default function Button() {
	 *   return (
	 *     <Link routeName="home" web={{
	 *      to: '/',
	 *      replace: false
	 *     }}>
	 *      <Text>Press me</Text>
	 *     </Link>
	 *   )
	 * }
	 * ```
	 */
	web?: {
		/**
		 * Alternative path to override routeName on web.
		 *
		 * @example
		 * {
		 * 	routeName: 'cars'
		 *  web: {
		 * 	  to: '/vehicles/'
		 *  }
		 * }
		 */
		to?: string
		/**
		 * A boolean value. If true, replaces the current URL in history.
		 */
		replace?: boolean
	}
}

export type NavigateTo = GenericRoute

export type Params<P> = { params: P }

export type WebRoute<
	Path extends string | undefined,
	As extends string = ''
> = {
	web: {
		path?: Path
		as?: As
	}
}

// export type NavigateTo<R extends string, P, Web> = Route<R> &
// 	P extends undefined
// 	? {}
// 	: Params<P> & Web extends undefined
// 	? {}
// 	: WebRoute<Web>

export type NavigateFunction<NavigateTo> = (route: NavigateTo) => void
export type PushFunction<NavigateTo> = (route: NavigateTo) => void
export type GetParam<Param extends unknown = undefined> = (
	param: string
) => Param

export type ReturnNav = {
	navigate: NavigateFunction<GenericRoute>
	push: PushFunction<GenericRoute>
	getParam: GetParam
}
