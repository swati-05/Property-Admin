export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value)
}

export const setLocalStorageItemStrigified = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const setLocalStorageItemReversed = (key, value) => {
  let reversedItem = value.split("").reverse().join("")
  console.log('reversed token...',reversedItem)
  localStorage.setItem(key, reversedItem)
}

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key)
  return item ? item : null;
}

export const getLocalStorageItemJsonParsed = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null;
}

export const getLocalStorageItemReversed = (key) => {
  const item = localStorage.getItem(key)
  let reversedItem = item.split("").reverse().join("")
  console.log('re reversed token...',reversedItem)
  return reversedItem
}

export const removeLocalstorageItem = (key) => {
  localStorage.removeItem(key)
}
