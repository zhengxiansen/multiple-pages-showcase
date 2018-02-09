import HomeView from '../../../views/index'

describe('HelloWorld.js', () => {
  it('should render correct contents', () => {
    expect(HomeView.render())
      .toEqual('hello, world')
  })
})
