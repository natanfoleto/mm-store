import bcrypt from 'bcryptjs'

async function encryptPassword(password) {
  return await bcrypt.hash(password, 8);
}

async function checkPassword(password, currentPassword) {
  return await bcrypt.compare(password, currentPassword);
}

export { encryptPassword, checkPassword }
