adsElement.querySelector('.popup__feature--wifi').hidden = true;
adsElement.querySelector('.popup__feature--dishwasher').hidden = true;
adsElement.querySelector('.popup__feature--parking').hidden = true;
adsElement.querySelector('.popup__feature--washer').hidden = true;
adsElement.querySelector('.popup__feature--elevator').hidden = true;
adsElement.querySelector('.popup__feature--conditioner').hidden = true;

switch (data[i].offer.features) {
  case 'wifi': adsElement.querySelector('.popup__feature--wifi');
    break;
  case 'washer': adsElement.querySelector('.popup__feature--washer');
    break;
  case 'elevator': adsElement.querySelector('.popup__feature--elevator');
    break;
  case 'parking' : adsElement.querySelector('.popup__feature--parking');
    break;
  case 'dishwasher' : adsElement.querySelector('.popup__feature--dishwasher');
    break;
  case 'conditioner' : adsElement.querySelector('.popup__feature--conditioner');
    break;
}
