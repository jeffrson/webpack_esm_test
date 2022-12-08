import React from 'react'

interface ITextProps {
    title: string
}

export class CustomHeadline extends React.PureComponent<ITextProps> {
    render(): JSX.Element {
        return (
            <h1>{this.props.title}</h1>
        )
    }
}
