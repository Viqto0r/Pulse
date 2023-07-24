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
      const closeBtn = target.querySelector('.modal__close')
      const layout = document.querySelector('.layout')

      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          fadeIn(layout)
          fadeIn(target, display)
          document.body.style.overflow = 'hidden'

          if (dataTarget === 'order') {
            target.querySelector('.modal__subtitle').textContent = trigger
              .closest('.catalog-item')
              .querySelector('.catalog-item__subtitle').textContent
          }
        })
      })

      closeBtn.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal')

        fadeOut(layout, 500)
        modals.forEach((modal) => {
          fadeOut(modal, 500)
        })
        document.body.style.overflow = 'auto'
      })
    }

    bindTriggers('[data-trigger="consultation"]', 'consultation', 'flex')
    bindTriggers('.button_mini', 'order', 'flex')
  }

  const fadeOut = (target, delay) => {
    target.style.opacity = 0

    setTimeout(() => {
      target.style.display = 'none'
    }, delay)
  }

  const fadeIn = (target, display = 'block') => {
    target.style.display = display

    setTimeout(() => {
      target.style.opacity = 1
    }, 0)
  }

  tabs()
  cardInfo()
  modal()
})
