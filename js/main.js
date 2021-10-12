function getRandomIntInclusive(min, max) {
  min = Math.round(min)
  max = Math.round(max)
  let randomNumber = max > min && min >= 0 ? Math.round(Math.random() * (max - min + 1)) + min : 'Пожалуйста, введите значение не меньше нуля. Также обращаем Ваше внимание что значение от не может быть больше значения до'
  return randomNumber
}
getRandomIntInclusive(1,3)

function getRandomArbitrary(min, max) {
  let randomNumber = max > min && min >= 0 ? Math.random() * (max - min) + min : 'Пожалуйста, введите значение не меньше нуля. Также обращаем Ваше внимание что значение от не может быть больше значения до'
  return randomNumber
}
getRandomArbitrary(1,3)
