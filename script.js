/* The code `const textArea = document.querySelector('.text-area')` is selecting an HTML element with
the class name 'text-area' using the `document.querySelector` method and storing it in a constant
variable `textArea`. Similarly, `const message = document.querySelector('.message')` is selecting an
HTML element with the class name 'message' and storing it in a constant variable `message`. These
variables are used to reference these specific elements in the JavaScript code for further
manipulation, such as getting input values, setting values, or performing actions based on user
interactions with these elements on the webpage. */
const textArea = document.querySelector('.text-area')
const message = document.querySelector('.message')

/**
 * The function `generateSecretKey` generates a random 32-character hexadecimal secret key using the
 * `window.crypto.getRandomValues` method.
 * @returns The `generateSecretKey` function returns a randomly generated secret key in the form of a
 * hexadecimal string.
 */
const generateSecretKey = () => {
  const buffer = new Uint8Array(16)
  window.crypto.getRandomValues(buffer)
  return Array.from(buffer, (byte) =>
    ('0' + (byte & 0xff).toString(16)).slice(-2)
  ).join('')
}

/**
 * The function `saveKeyToLocalStorage` saves a key to the browser's local storage with the key name
 * 'secretKey'.
 * @param key - The `key` parameter in the `saveKeyToLocalStorage` function is the value that you want
 * to save to the local storage with the key name 'secretKey'.
 */
const saveKeyToLocalStorage = (key) => {
  localStorage.setItem('secretKey', key)
}

/**
 * The function `getKeyFromLocalStorage` retrieves the value associated with the key 'secretKey' from
 * the browser's local storage.
 * @returns The function `getKeyFromLocalStorage` is returning the value stored in the 'secretKey' key
 * in the localStorage.
 */
const getKeyFromLocalStorage = () => {
  return localStorage.getItem('secretKey')
}

/* `let secretKey = getKeyFromLocalStorage()` is retrieving the value associated with the key
'secretKey' from the browser's local storage. If there is a value stored in the 'secretKey' key, it
assigns that value to the variable `secretKey`. If there is no value stored, it generates a new
secret key using the `generateSecretKey` function, saves it to the local storage using
`saveKeyToLocalStorage`, and then assigns the generated key to the variable `secretKey`. */
let secretKey = getKeyFromLocalStorage()

/* The code block `if (!secretKey) { secretKey = generateSecretKey(); saveKeyToLocalStorage(secretKey);
}` is checking if the variable `secretKey` is falsy (empty or undefined). If `secretKey` is falsy,
it means that there is no value stored in the 'secretKey' key in the browser's local storage. */
if (!secretKey) {
  secretKey = generateSecretKey()
  saveKeyToLocalStorage(secretKey)
}

/**
 * The encryptText function uses the AES encryption algorithm from CryptoJS to encrypt a given plain
 * text using a specified key.
 * @param plainText - The `plainText` parameter is the text that you want to encrypt using the AES
 * encryption algorithm.
 * @param key - The `key` parameter in the `encryptText` function is used as the encryption key for
 * encrypting the `plainText` using the AES encryption algorithm. The key is essential for encrypting
 * and decrypting the text securely.
 * @returns The `encryptText` function returns the encrypted version of the `plainText` using the
 * provided `key`.
 */
const encryptText = (plainText, key) => {
  return CryptoJS.AES.encrypt(plainText, key).toString()
}

/**
 * The `encryptButton` function encrypts the text from a text area using a secret key and displays the
 * encrypted text in a message field.
 */
const encryptButton = () => {
  const encryptedText = encryptText(textArea.value, secretKey)
  message.value = encryptedText
  textArea.value = ''
  message.style.backgroundImage = 'none'
}

/**
 * The function `decryptText` decrypts an encrypted text using a specified key in JavaScript.
 * @param encryptedText - Thank you for providing the function for decrypting text using AES
 * encryption. Could you please provide me with the value of the `encryptedText` parameter that you
 * would like to decrypt?
 * @param key - The `key` parameter in the `decryptText` function is the secret key used to decrypt the
 * `encryptedText`. This key is required to decrypt the text successfully.
 * @returns The `decryptText` function is returning the decrypted text after decrypting the
 * `encryptedText` using the provided `key`.
 */
const decryptText = (encryptedText, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key)
  return bytes.toString(CryptoJS.enc.Utf8).toUpperCase()
}

/**
 * The `decryptButton` function takes the encrypted text from an input field, decrypts it using a
 * secret key, and then displays the decrypted text in a text area.
 */
const decryptButton = () => {
  const decryptedText = decryptText(textArea.value, secretKey)
  message.value = decryptedText
  textArea.value = ''
}

/**
 * The `copyText` function copies the text from an input field to the clipboard using JavaScript.
 */
const copyText = () => {
  const textToCopy = message.value
  if (textToCopy.trim() === '') return
  const tempElement = document.createElement('textarea')
  tempElement.value = textToCopy

  document.body.appendChild(tempElement)
  tempElement.select()
  tempElement.setSelectionRange(0, 99999)

  document.execCommand('copy')

  document.body.removeChild(tempElement)
  message.value = ''
}
