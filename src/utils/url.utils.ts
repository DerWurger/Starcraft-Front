const STATIC_BASE_URL = 'http://starcraft.op.edu.ua'

export function getImageUrl(path: string): string {
  if (!path.startsWith('/')) path = '/' + path
  return `${STATIC_BASE_URL}${path}`
}
