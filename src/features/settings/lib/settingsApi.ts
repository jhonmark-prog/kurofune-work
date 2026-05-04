export async function updatePassword(newPassword: string): Promise<void> {
}

export async function deleteAccount(userId: string): Promise<void> {
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must have at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must have at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must be alphanumeric.';
  return null;
}