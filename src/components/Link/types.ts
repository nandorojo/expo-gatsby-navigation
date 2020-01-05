import { Link } from 'gatsby'
import { ComponentPropsWithoutRef, CSSProperties } from 'react'

export type ExtraLinkProps = {
	gasbyLinkProps?: ComponentPropsWithoutRef<typeof Link>
}

export type GatsbyWebProps = {
	to?: string
	partiallyActive?: boolean
	activeStyle?: CSSProperties
	replace?: boolean
}
