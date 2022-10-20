import "./css/index.css"
import IMask from 'imask'

const ccBgFirstColor = document
  .querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgSecondColor = document
  .querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document
  .querySelector('.cc-logo span:nth-child(2) img')

const setCardType = type => {
  const colors = {
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#DF6f29', '#C69347'],
    default: ['black', 'gray']
  }

  ccBgFirstColor.setAttribute('fill', colors[type][0])
  ccBgSecondColor.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

const cardNumber = document
  .querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default'
    }
  ],
  dispatch: function (appended, dynamicMask) {
    const number = (dynamicMask.value + appended)
      .replace(/\D/g, "")
    const foundMask = dynamicMask
      .compiledMasks.find(({ regex }) =>
        number.match(regex)
      )
    return foundMask
  }
}
const cardNumberMasked =
  IMask(cardNumber, cardNumberPattern)

const expirationDate = document
  .querySelector('#expiration-date')
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear())
        .slice(2),
      to: String(new Date().getFullYear() + 10)
        .slice(2)
    }
  }
}
const expirationDateMasked =
  IMask(expirationDate, expirationDatePattern)

const securityCode = document
  .querySelector('#security-code')
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked =
  IMask(securityCode, securityCodePattern)

const addButton = document
  .querySelector('#add-card')
addButton.addEventListener('click',
  () => addCard(event))
const addCard = event => {
  event.preventDefault()
  alert('Cartão adicionado!')
}

const cardHolder = document
  .querySelector('#card-holder')
cardHolder.addEventListener('input',
  () => updateName())
const updateName = () => {
  const ccHolder = document
    .querySelector('.cc-holder .value')
  ccHolder.innerHTML =
    cardHolder.value.length > 0
      ? cardHolder.value
      : 'FULANO DA SILVA'
}

cardNumberMasked.on('accept', 
  () => updateCardNumber(cardNumberMasked.value))
const updateCardNumber = number => {
  const ccNumber = document
    .querySelector('.cc-number')
  ccNumber.innerText =
    number.length > 0 
      ? number
      : '1234 5678 9012 3456'

    setCardType(cardNumberMasked.masked.currentMask.cardtype)
}

expirationDateMasked.on('accept', 
  () => updateExpirationDate(expirationDateMasked.value))
const updateExpirationDate = date => {
  const ccExpiration = document
    .querySelector('.cc-expiration .value')
  ccExpiration.innerText = date.length > 0
    ? date
    : '02/32'
}

securityCodeMasked.on('accept',
  () => updateSecurityCode(securityCodeMasked.value))
const updateSecurityCode = code => {
  const ccSecurity = document
    .querySelector('.cc-security .value')
  ccSecurity.innerText = 
    code.length > 0
      ? code
      : '123'
}