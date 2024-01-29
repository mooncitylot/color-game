// @ts-nocheck
import { expect, fixture, html } from '@open-wc/testing'
import './demo-component.js'

describe('DemoComponentElement', () => {
  it('should render the component with initial values', async () => {
    const el = await fixture(html`<demo-component></demo-component>`)
    expect(el).shadowDom.to.equal(`
      <div>
        <h1>Demo Component</h1>
        <p>String: string</p>
        <p>Numbers:</p>
        <ul>
          <li>$1</li>
          <li>$2</li>
          <li>$3</li>
        </ul>
        <button>Click me</button>
      </div>
    `)
  })
  it('should update values after button click', async () => {
    const el = await fixture(html`<demo-component></demo-component>`)
    el.shadowRoot.querySelector('button').click()

    // @ts-ignore
    await el.updateComplete
    expect(el).shadowDom.to.equal(`
      <div>
        <h1>Demo Component</h1>
        <p>String: new string</p>
        <p>Numbers:</p>
        <ul>
          <li>$4</li>
          <li>$5</li>
          <li>$6</li>
        </ul>
        <button>Click me</button>
      </div>
    `)
  })
})
