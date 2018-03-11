export function testForm (str) {
  const re = /^[a-zA-Z0-9_-]{5,16}$/
  return re.test(str)
}
