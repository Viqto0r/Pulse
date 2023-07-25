$(document).ready(function () {
  $('.carousel__inner').slick({
    nextArrow:
      '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="left" /></button>',
    prevArrow:
      '<button type="button" class="slick-next"><img src="icons/right.svg" alt="right" /></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  })

  const cardInfo = () => {
    const itemsContents = document.querySelectorAll('.catalog-item__content')
    const itemsLists = document.querySelectorAll('.catalog-item__list')

    const bindEvents = (className) => {
      const target = document.querySelectorAll(className)
      target.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          itemsContents[idx].classList.toggle('catalog-item__content_active')
          itemsLists[idx].classList.toggle('catalog-item__list_active')
        })
      })
    }

    bindEvents('.catalog-item__link_about')
    bindEvents('.catalog-item__link_back')
  }

  const tabs = () => {
    const tabsContainer = document.querySelector('.catalog__tabs')
    const tabs = tabsContainer.querySelectorAll('.catalog__tab')
    const tabsContent = document.querySelectorAll('.catalog__content')

    tabsContainer.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('catalog__tab') ||
        e.target.parentNode.classList.contains('catalog__tab')
      ) {
        const idx = +e.target.closest('[data-tab]').dataset.tab

        toggleItems(tabs, idx, 'catalog__tab_active')
        toggleItems(tabsContent, idx, 'catalog__content_active')
      }
    })

    const hiddenAllItems = (items, className) => {
      items.forEach((item) => {
        item.classList.remove(className)
      })
    }

    const showItem = (items, idx, className) => {
      items[idx].classList.add(className)
    }

    const toggleItems = (items, idx, className) => {
      hiddenAllItems(items, className)
      showItem(items, idx, className)
    }
  }

  const modal = () => {
    const bindTriggers = (triggerSelector, dataTarget, display) => {
      const triggers = document.querySelectorAll(triggerSelector)
      const target = document.querySelector(`[data-target="${dataTarget}"]`)
      const closeBtns = document.querySelectorAll('.modal__close')
      const layout = document.querySelector('.layout')
      const modals = document.querySelectorAll('.modal')

      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          fadeIn(layout)
          fadeIn(target, { display })
          document.body.style.overflow = 'hidden'
          document.body.style.marginRight = getScroll() + 'px'

          if (dataTarget === 'order') {
            target.querySelector('.modal__subtitle').textContent = trigger
              .closest('.catalog-item')
              .querySelector('.catalog-item__subtitle').textContent
          }
        })
      })

      closeBtns.forEach((btn) =>
        btn.addEventListener('click', () => {
          fadeOut(layout, { delay: 500 })
          modals.forEach((modal) => {
            fadeOut(modal, { delay: 500 })
            setTimeout(() => {
              document.body.style.overflow = ''
              document.body.style.marginRight = 0
            }, 500)
          })
        })
      )
    }

    bindTriggers('[data-trigger="consultation"]', 'consultation', 'flex')
    bindTriggers('.button_mini', 'order', 'flex')
  }

  const getScroll = () => {
    let scroll
    const div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    div.style.overflowY = 'scroll'
    document.body.append(div)
    scroll = div.offsetWidth - div.clientWidth
    div.remove()

    return scroll
  }

  const fadeOut = (target, { delay = 0 } = { delay: 0 }) => {
    console.log('fadeOut')
    target.style.opacity = 0

    setTimeout(() => {
      target.style.display = 'none'
    }, delay)
  }

  const fadeIn = (
    target,
    { delay = 0, display = 'block' } = { delay: 0, display: 'block' }
  ) => {
    console.log(delay)
    target.style.display = display

    setTimeout(() => {
      target.style.opacity = 1
    }, delay)
  }

  const mask = (selector) => {
    const inputs = document.querySelectorAll(selector)

    const createMask = (input) => {
      let matrix = '+7-(___)-___-__-__'
      let startValue = matrix.replace(/\D/g, '')
      let newValue = input.value.replace(/\D/g, '')
      let i = 0

      if (newValue.length < startValue.length) {
        newValue = startValue
      }
      newValue = matrix.replace(/./g, (char) => {
        if (/[_\d]/.test(char) && i < newValue.length) {
          return newValue[i++]
        } else if (i >= newValue.length) {
          return ''
        } else {
          return char
        }
      })

      input.value = newValue
    }

    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        createMask(e.target)
      })
      input.addEventListener('focus', (e) => {
        createMask(e.target)
        setTimeout(() => {
          e.target.setSelectionRange(
            e.target.value.length,
            e.target.value.length
          )
        }, 0)
      })
      input.addEventListener('blur', (e) => {
        if (e.target.value.length === 2) {
          e.target.value = ''
        }
      })
    })
  }

  const postFormData = () => {
    const forms = document.querySelectorAll('form')
    const fieldNames = {
      name: 'Не корректное имя',
      phone: 'Не корректный номер телефона',
      email: 'Не корректный адрес почты',
    }
    const validFields = {
      name: false,
      phone: false,
      email: false,
    }

    const isValidateEmail = (value) => {
      return value.match(/\w+@\w+\.(com|ru|en)$/)
    }

    const isValidatePhone = (value) =>
      value.match(/\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}/)

    const isValidateName = (value) => value.length > 1 && value.length < 10

    const validate = (field, checkerFn) => {
      if (!checkerFn(field.value)) {
        if (field.nextElementSibling.tagName !== 'LABEL') {
          addLabel(field)
          validFields[field.name] = false
        }
        field.style.outline = '1px solid red'
      } else {
        if (field.nextElementSibling.tagName === 'LABEL') {
          field.nextElementSibling.remove()
          field.style.outline = 'none'
        }
        validFields[field.name] = true
      }
    }

    const addLabel = (target) => {
      const label = document.createElement('label')
      label.style.position = 'relative'
      label.style.top = '-9px'
      label.textContent = `${fieldNames[target.name]}`

      target.insertAdjacentElement('afterend', label)
    }

    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()

        const { name, phone, email } = form.elements
        validate(email, isValidateEmail)
        validate(phone, isValidatePhone)
        validate(name, isValidateName)

        if (Object.values(validFields).every((el) => el)) {
          fadeOut(form.parentNode, { delay: 500 })
          fadeIn(document.querySelector('[data-target="thanks"]'), {
            delay: 500,
          })
          const formData = new FormData(form)
          postData(formData).then(() => {
            form.reset()
          })
        }
      })
    })
  }

  const postData = async (data) => {
    return await fetch('send.php', {
      method: 'POST',
      body: data,
    })
  }

  const pageup = () => {
    const btn = document.querySelector('.pageup')

    window.addEventListener('scroll', () => {
      const display = window.getComputedStyle(btn).display
      const opacity = window.getComputedStyle(btn).opacity

      if (window.scrollY > 1600 && display === 'none') {
        fadeIn(btn, { delay: 300 })
        console.log('show')
      }
      if (window.scrollY < 1600 && opacity === '1') {
        fadeOut(btn, { delay: 300 })
        console.log('hide')
      }
    })
  }

  tabs()
  cardInfo()
  modal()
  mask('[name="phone"]')
  postFormData()
  pageup()
})
