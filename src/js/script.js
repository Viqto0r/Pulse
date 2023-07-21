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
	
  tabs()
  cardInfo()
})
