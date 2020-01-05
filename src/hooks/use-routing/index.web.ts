import { useCallback } from 'react'
import _ from 'lodash'
import { navigate as nav } from 'gatsby'
import { NavigateTo } from './types'

const goBack = () => window?.history.go(-1)

export default function useRouting() {
	const getParam = <Param>(
		param: Parameters<typeof _.get>['1'],
		fallback?: Param
	): Param | undefined => {
		if (fallback === undefined) {
			const paramName =
				typeof param === 'string'
					? param.split('.')[0] ?? 'user'
					: param[0]
			console.error(`
Warning: getParam method from the useRouting hook does not work on Gatsby without a fallback argument. The fallback argument should correspond to the location prop passed to your page from Gatsby. For more, see https://www.gatsbyjs.org/docs/gatsby-link/#pass-state-as-props-to-the-linked-page.

It should look something like this:
function Screen({ location }) {
  const { getParam } = useRouting()
  const ${paramName} = getParam('${paramName}', location.state.${paramName})
}
`)
		}
		return fallback
	}

	const navigate = useCallback(
		<To extends NavigateTo = NavigateTo>(route: To) => {
			const path = route.web?.to ?? route.routeName

			nav(path[0] === '/' ? path : `/${path}`, {
				state: route.params,
				replace: route.web?.replace,
			})
		},
		[]
	)

	return {
		getParam,
		navigate,
		push: nav,
		goBack,
	}
}
