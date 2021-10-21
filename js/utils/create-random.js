//Функции для создания случайных положительных целых и с плавающей точкой чисел
const getRandomIntInclusive = (min, max) => {
  min = Math.round(min);
  max = Math.round(max);
  return max > min && min >= 0 ? Math.floor(Math.random() * (max - min + 1)) + min : 'Пожалуйста, введите значение не меньше нуля. Также обращаем Ваше внимание что значение "От" не может быть больше значения "До"';
};
const getRandomArbitrary = (min, max) => max > min && min >= 0 ? Math.random() * (max - min) + min : 'Пожалуйста, введите значение не меньше нуля. Также обращаем Ваше внимание что значение "От" не может быть больше значения "До"';

//получение случанных значений из массива
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length-1)];
//получение случайных значений на основе значений элементов массива
const getRandomValueElement = (valueElement) => getRandomIntInclusive(valueElement[0], valueElement[valueElement.length-1]);

//получение случайной длины массива
const arrayRandomLengthsValues = (lengthsValues) => {
  const lengthOfArray = getRandomIntInclusive(1, lengthsValues.length);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomIntInclusive(0, lengthsValues.length - 1);
    const el = lengthsValues[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
};

export {getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement, getRandomValueElement, arrayRandomLengthsValues};
