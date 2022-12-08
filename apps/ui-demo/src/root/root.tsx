import React from 'react'
import { CustomHeadline } from '@internal/lib-client'


interface IRootProps {}

export class Root extends React.PureComponent<IRootProps> {
    render(): JSX.Element {
        return (
            <CustomHeadline title='Headline'></CustomHeadline>
        )
    }
}
