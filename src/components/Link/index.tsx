import React from 'react'
import { LinkMaker, LinkProps } from 'expo-navigation-core'
import { Text } from 'react-native'
import { ExtraLinkProps, GatsbyWebProps } from './types'

/**
 * Link component for react-navigation and gatsby.
 *
 * @param props
 *  - routeName: string
 *  - params?: object
 *  - web?: Dictionary for web, see docs for details
 *
 * ## Usage
 *
 * ```diff
 * -import { TouchableOpacity, Text } from 'react-native'
 * -...
 * -<TouchableOpacity onPress={() => navigate({ routeName: 'home', params: { user: 'fernando' } })}>
 * -  <Text>Home</Text>
 * - </TouchableOpacity>
 *
 * +import { Link } from 'expo-gatsby-navigation'
 ...
 * +<Link routeName="home" params={{ user: 'fernando' }} web={{ to: '/' }}>
 * +  Home
 * +</Link>
 *```
 *
 */

const Link = React.forwardRef(
	(
		props: LinkProps<ExtraLinkProps, GatsbyWebProps>,
		ref?: React.Ref<Text>
	) => {
		const Link = LinkMaker<ExtraLinkProps, GatsbyWebProps>()
		return <Link {...props} ref={ref} />
	}
)

export default React.memo(Link)
