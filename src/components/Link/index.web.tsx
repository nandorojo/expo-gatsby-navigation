import React from 'react'
import { Text } from 'react-native'
import { Link as GatsbyLink } from 'gatsby'
import { LinkProps } from 'expo-navigation-core'
import { ExtraLinkProps, GatsbyWebProps } from './types'
import empty from '../../utils/empty'

export default function Link(props: LinkProps<ExtraLinkProps, GatsbyWebProps>) {
	const {
		gasbyLinkProps = empty.object,
		web,
		style,
		children,
		routeName,
		params,
	} = props

	let to = web?.to ?? routeName
	to = to[0] === '/' ? to : `/${to}`

	// https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links
	const internal = /^\/(?!\/)/.test(to)

	if (!internal) {
		console.warn(
			'You used the expo-gatsby-navigation <Link /> component for an external link. This component is only intended for internal links.  Details:',
			{
				routeName,
				web,
				params,
				to,
			},
			`Falling back to <Text accessiblityRole="link" href={${to}} />`,
			'See: https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links'
		)
		return (
			<Text accessibilityRole="link" style={style} href={to}>
				{children}
			</Text>
		)
	}

	return (
		<GatsbyLink
			{...gasbyLinkProps}
			to={to}
			activeStyle={web?.activeStyle}
			partiallyActive={web?.partiallyActive}
			style={style}
			replace={web?.replace}
			state={params}
		>
			<Text accessibiltyRole="link" style={style}>
				{props.children}
			</Text>
		</GatsbyLink>
	)
}
