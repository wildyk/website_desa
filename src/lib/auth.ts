import crypto from 'crypto'

/**
 * Hash password menggunakan Node crypto.scryptSync dengan random salt.
 * Hasil yang dikembalikan berformat `salt:hash`.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

/**
 * Memverifikasi password plaintext dengan hash yang tersimpan.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(':')
    if (!salt || !originalHash) return false
    const hash = crypto.scryptSync(password, salt, 64).toString('hex')
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(originalHash, 'hex')
    )
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}
