import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  align-items: center;
  align-self: center;
`

const ButtonsView = styled.div`
  flex-direction: row;
  min-height: 70px;
  align-items: stretch;
  align-self: center;
  border-width: 5px;
`

const ButtonWrapper = styled.div`
  flex: 1;
  padding: 0;
`

const Greeting = styled.h1`
  color: #999;
  font-weight: bold;
`

export interface IProps {
  name: string
  enthusiasmLevel?: number
}

interface IState {
  enthusiasmLevel: number
}

export default class Hello extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error('You could be a little more enthusiastic. :D')
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    }
  }

  public onIncrement = () => {
    this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 })
  }
  public onDecrement = () => {
    const { enthusiasmLevel } = this.state
    if (enthusiasmLevel > 0) {
      this.setState({ enthusiasmLevel: enthusiasmLevel - 1 })
    }
  }
  public getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join('!')

  public render() {
    return (
      <Root>
        <Greeting>
          Hello{' '}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Greeting>
        <ButtonsView>
          <ButtonWrapper>
            {/* <div
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <div
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            /> */}
          </ButtonWrapper>
        </ButtonsView>
      </Root>
    )
  }
}
