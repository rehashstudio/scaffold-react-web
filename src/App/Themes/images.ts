export interface imagesObject {
  [key: string]: ImageData
}

// ignore @2x assets -- automatically used if included
const images: imagesObject = {
  // General
  logo: require('./Images/General/logo.png'),
  done: require('./Images/General/done.png'),
  doneSmall: require('./Images/General/done_small.png'),
  // Account
  user: require('./Images/Account/user.png'),
  email: require('./Images/Account/email.png'),
  password: require('./Images/Account/password.png'),
}

export default images
