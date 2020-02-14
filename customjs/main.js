document.addEventListener("DOMContentLoaded", function () {

  const sidebar = document.querySelector('#js-nsa-sidebar');
  const itemsOfSidebar = document.querySelectorAll('.nsa-sidebar__item:not(.nsa-sidebar__item--logout)');
  const buttonCloseSidebar = document.querySelector('.nsa-menu-expanded__close');
  const contentList = document.querySelectorAll('.box-item');
  const stepper = document.querySelector('#js-nsa-stepper');
  const itemsOfStepper = document.querySelectorAll('.nsa-stepper__step');

  const removeClassFromList = (list, classToRemove) => {
    if (list && list.length && classToRemove) {
      list.forEach(item => {
        item && item.classList && item.classList.contains(classToRemove) && item.classList.remove(classToRemove);
      });
    }
  }

  const clearSteps = () => {
    removeClassFromList(itemsOfStepper, 'current');
  }

  const clearActiveState = () => {
    removeClassFromList(itemsOfSidebar, 'is-active');
    removeClassFromList(contentList, 'l-flex');
  }

  const checkTargetSidebar = (clearActiveState) => {
    document.querySelector('#page-container').addEventListener('click', (event) => {
      const isClickInside = sidebar.contains(event.target);
      event.preventDefault();

      if (!isClickInside) {
        sidebar.classList.remove('is-open');
        clearActiveState();
      }
    });
  }

  const closeSideBar = (clearActiveState) => {
    buttonCloseSidebar.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      clearActiveState();
    });
  }

  const viewContentOfSidebar = (item) => {
    const valueOfItemClicked = item.getAttribute('data-menu');
    const contentToShow = document.querySelector(`[data-content-menu="${valueOfItemClicked}"]`);

    if (contentToShow) {
      contentToShow.classList.add('l-flex');
    }
  }

  const manageStepperOfSidebar = () => {
    if (stepper) {
      itemsOfStepper.forEach((step) => {
        step.addEventListener('click', (event) => {
          const stepToActivate = event.currentTarget;
          if (!stepToActivate.classList.contains('is-active')) {
            clearSteps();
            stepToActivate.classList.add('current');
          }
        })
      })
    }
  }

  const manageSideBar = (checkTargetSidebar, clearActiveState, closeSideBar, viewContentOfSidebar, manageStepperOfSidebar) => {
    if (sidebar) {
      itemsOfSidebar.forEach((item) => {
        item.addEventListener('click', (event) => {
          const itemToActivate = event.currentTarget;
          if (itemToActivate.classList.contains('is-active') && !itemToActivate.classList.contains('nsa-stepper')) {
            sidebar.classList.remove('is-open');
            clearActiveState();
          } else {
            if (itemToActivate.classList.contains('nsa-stepper')) {
              clearActiveState();
              itemToActivate.previousElementSibling.classList.add('is-active');
              sidebar.classList.add('is-open');
              viewContentOfSidebar(item);
            } else {
              clearActiveState();
              itemToActivate.classList.add('is-active');
              sidebar.classList.add('is-open');
              viewContentOfSidebar(item);
            }
          }
        });
      });
      checkTargetSidebar(clearActiveState);
      closeSideBar(clearActiveState);
      manageStepperOfSidebar();
    }
  }

  manageSideBar(checkTargetSidebar, clearActiveState, closeSideBar, viewContentOfSidebar, manageStepperOfSidebar);

  const advancedSearch = document.querySelector('#js-nsa-search');
  const inputOfAdvancedSearch = document.querySelector('#search');
  const boxResultOfAdvancedSearch = document.querySelector('#js-nsa-search-list');
  const resultsOfAdvancedSearch = document.querySelectorAll('.nsa-search-list__option');
  const buttonOfAdvancedSearch = document.querySelector('#nsa-search-button');

  const checkTargetInput = () => {
    document.addEventListener('click', (event) => {
      const isClickInside = advancedSearch.contains(event.target);
      event.preventDefault();

      if (!isClickInside) {
        boxResultOfAdvancedSearch.classList.remove('l-flex');
        buttonOfAdvancedSearch.setAttribute('disabled', true);
      }
    });
  }

  const manageSearch = (checkTargetInput) => {
    if (advancedSearch) {
      inputOfAdvancedSearch.addEventListener('keyup', () => {
        if (inputOfAdvancedSearch.value.length >= 8 && !inputOfAdvancedSearch.disabled) {
          buttonOfAdvancedSearch.removeAttribute('disabled');
          boxResultOfAdvancedSearch.classList.add('l-flex');
          resultsOfAdvancedSearch.forEach((result) => {
            result.addEventListener('click', (event) => {
              const actualValue = event.currentTarget.innerHTML;
              inputOfAdvancedSearch.value = actualValue;
            });
          });
          checkTargetInput();
        } else {
          boxResultOfAdvancedSearch.classList.remove('l-flex');
          buttonOfAdvancedSearch.setAttribute('disabled', true);
        }
      });
    }
  }

  manageSearch(checkTargetInput);


});