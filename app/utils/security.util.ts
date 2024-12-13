export class SecurityUtil {
  static sanitizeCardNumber(cardNumber: string): string {
    // Remove any non-digit characters
    return cardNumber.replace(/\D/g, '');
  }

  static maskCardNumber(cardNumber: string): string {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
  }

  static encryptSensitiveData(data: string): string {
    // Implementation of encryption logic
    // This is a placeholder - use proper encryption in production
    return Buffer.from(data).toString('base64');
  }

  static decryptSensitiveData(encryptedData: string): string {
    // Implementation of decryption logic
    // This is a placeholder - use proper decryption in production
    return Buffer.from(encryptedData, 'base64').toString();
  }
}