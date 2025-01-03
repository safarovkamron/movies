import { useCallback, useState } from 'React'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const request = useCallback(async (url, body = null, method = 'GET', headers = {'Type-Content': 'application/json'}) => {
			try {
				setLoading(true)
				const response = await fetch(url, {method, body, headers})

				if(!response.ok){
					throw new Error(`Could not fetch ${url}, status: ${response.status}`)
				}

				const data = await response.json()

				setLoading(false)

				return data
			} catch (error) {
				setLoading(false)
				setError(error.message)
				throw error
			}
		},[]
	)
	const clearError = useCallback( () => setError(null), [])
	return {loading, error, clearError, request}
}