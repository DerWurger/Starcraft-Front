export function addBase64Prefix(base64: string): string {
  return `data:image/png;base64,${base64}`
}
