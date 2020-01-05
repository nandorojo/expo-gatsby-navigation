import React from 'react'
import { Link as CoreLink, LinkProps } from 'expo-navigation-core'
import { ExtraLinkProps, GatsbyWebProps } from './types'

export default function Link(props: LinkProps<ExtraLinkProps, GatsbyWebProps>) {
	return <CoreLink<ExtraLinkProps, GatsbyWebProps> {...props} />
}
