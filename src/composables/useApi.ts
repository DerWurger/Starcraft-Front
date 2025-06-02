export function useApi() {
  const baseUrl = 'http://starcraft.op.edu.ua/starcraft-api' //hadrcode. TODO: replace with env url

  async function get<T>(url: string): Promise<T> {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw await extractErrorMessage(response)
    }

    return await response.json()
  }

  async function post<T>(url: string, body: unknown): Promise<T> {
    const isFormData = body instanceof FormData

    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? body : JSON.stringify(body)
    })

    if (!response.ok) {
      // throw new Error(await extractErrorMessage(response))
      throw await extractErrorMessage(response)
    }

    return await response.json()
  }

  async function del(url: string): Promise<void> {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      // throw new Error(await extractErrorMessage(response))
      throw await extractErrorMessage(response)
    }
  }

  async function extractErrorMessage(response: Response): Promise<string[]> {
    try {
      const data = await response.json()

      if (data.errors) {
        if (Array.isArray(data.errors)) {
          return data.errors
        }

        if (typeof data.errors === 'object') {
          return Object.entries(data.errors).flatMap(([field, messages]) =>
            Array.isArray(messages)
              ? messages.map((msg) => `${field}: ${msg}`)
              : [`${field}: ${messages}`]
          )
        }
      }

      if (data.title) return [data.title]
      if (data.message) return [data.message]

      return [`Error ${response.status}`]
    } catch {
      return [`Error ${response.status}`]
    }
  }

  return { get, post, delete: del }
}
