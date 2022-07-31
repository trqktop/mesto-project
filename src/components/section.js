import { Card } from './card.js';

export class Section {
    constructor({ cards, renderer }, selector) {
        this._renderer = renderer
        this.selector = selector
        this.cards = cards
    }
    renderer() {
        this.cards.forEach(card => {
            this._renderer(card)
        })
    }
    rendererOneElement() {
        this._renderer(this.cards)
    }
    addItem(card) {
        this.selector.prepend(card);
    }

}

//_____----------------------------___----------------------------___----------------------------___----------------------------___----------------------------

//  пример с тренажера Section
//export default class Section {//  пример с тренажера
//    constructor({ data, renderer }, containerSelector) {//  пример с тренажера
//        this._renderedItems = data;//  пример с тренажера
//        this._renderer = renderer;
//        this._container = document.querySelector(containerSelector);//  пример с тренажера
//    }
//
//    setItem(element) {//addItem
//        this._container.append(element);//  пример с тренажера
//    }
//
//    clear() {//  пример с тренажера
//        this._container.innerHTML = '';
//    }
//
//    renderItems() {//render
//        this.clear();
//        //  пример с тренажера
//        this._renderedItems.forEach(item => {
//            this._renderer(item);//  пример с тренажера
//        });
//    }//  пример с тренажера
//}//  пример с тренажера
//
//
//
////  пример с тренажера index
//
//import Section from '../components/Section.js';//  пример с тренажера
//import DefaultCard from '../components/DefaultCard.js';
//import HorizontalCard from '../components/HorizontalCard.js';
//import FilterButton from '../components/FilterButton.js';
//import {
//    defaultCardButton,
//    horizontalCardButton,//  пример с тренажера
//    cardListSelector,
//    items,
//    filterButtons,
//    filterListSelector,
//    filterButtonTemplate
//} from '../utils/constants.js';
//
//const defaultCardList = new Section({
//    data: items,
//    renderer: (item) => {
//        const card = new DefaultCard(item, '.default-card');//class card
//        const cardElement = card.generate();
//        defaultCardList.setItem(cardElement);
//    }
//}, cardListSelector);//  пример с тренажера
//
//const horizontalCardList = new Section({
//    data: items,
//    renderer: (item) => {
//        const card = new HorizontalCard(item, '.horizontal-card');
//        const cardElement = card.generate();
//        horizontalCardList.setItem(cardElement);
//    }
//}, cardListSelector);
//
//const filterList = new Section({//  пример с тренажера
//    data: filterButtons,
//    renderer: (item) => {
//        const filterButton = new FilterButton({
//            data: item,
//            handleButtonClick: (isGrid) => {
//                if (isGrid) {
//                    defaultCardList.clear();
//                    defaultCardList.renderItems()
//                } else {
//                    horizontalCardList.clear();
//                    horizontalCardList.renderItems()
//                }
//            }//  пример с тренажера
//        },
//            filterButtonTemplate
//        );
//        const filterButtonElement = filterButton.generateButton();
//        filterList.setItem(filterButtonElement);
//    }
//}, filterListSelector);
//
//
//defaultCardList.renderItems();//  пример с тренажера
//filterList.renderItems();
////  пример с тренажера
//

//
//export default class FilterButton {
//    constructor({ data, handleButtonClick } , buttonSelector) {
//    this._additionalButtonClass = data.buttonClass;
//    this._isGrid = data.isGrid;
//    this._buttonSelector = buttonSelector;
//    this._handleButtonClick = handleButtonClick;
//  }
//
//    _getElement() {
//      const buttonElement = document
//        .querySelector(this._buttonSelector)
//        .content
//        .querySelector('.filter__button')
//        .cloneNode(true);
//
//      return buttonElement;
//    }
//
//    generateButton() {
//      this._element = this._getElement();
//      this._element.classList.add(this._additionalButtonClass);
//  this._setEventListeners()
//      return this._element;
//    }
//    _setEventListeners() {
//    this._element.addEventListener('click', () => {
//      this._handleButtonClick(this._isGrid);
//    });
//  }
//  }