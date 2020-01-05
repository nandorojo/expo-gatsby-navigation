import { mount } from 'enzyme'
import React from 'react'
import { Link } from '..'

// TODO having trouble getting these tests to work...
// current bug:
// SyntaxError: Cannot use import statement outside a module
// https://www.gatsbyjs.org/docs/unit-testing/#2-creating-a-configuration-file-for-jest

describe('Link', () => {
	it(`is a valid Gatsby link`, () => {
		const component = mount(
			<Link routeName="chat" params={{ roomId: 'hey!' }} />
		)

		expect(
			component
				.find('a')
				.first()
				.prop('href')
		).toBe('/chat?roomId=hey!')
	})
})
