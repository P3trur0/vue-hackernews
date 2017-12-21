import { mount } from 'vue-test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders item.url', () => {
    const item = {
      url: 'some title'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.url)
  })

  test('renders an a tag containing item.title', () => {
    const item = {
      title: 'some title',
      url: 'http://some-url.com'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.find('a').text()).toEqual(item.title)
  })

  test('renders an a tag with href item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    const aWrapper = wrapper.find('a')
    expect(aWrapper.element.getAttribute('href')).toBe(item.url)
  })

  test('renders the host name', () => {
    const item = {
      url: 'https://some-url.com/with-paths'
    }
    const wrapper = mount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain('(some-url.com)')
  })

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')

    dateNow.mockImplementation(() => dateNowTime)

    const item = {
      time: (dateNowTime / 1000) - 600
    }
    const wrapper = mount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.find('.time').text()).toBe('10 minutes ago')
    dateNow.mockRestore()
  })

  test('renders correctly', () => {
    const item = {
      by: 'spinwang',
      id: 15969539,
      score: 1,
      time: 1513778756,
      title: 'DAWN: Tools for AI and Data Product Development',
      type: 'story',
      url: 'http://dawn.cs.stanford.edu/'
    }
    const wrapper = mount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
