import type { AxiosError } from "axios"
import type { Result } from "neverthrow"

export type APIError = AxiosError<{
	errors: {
		code: string
		detail: string
		source: { pointer: string }
		status: string
	}[]
}>

declare module "openapi-client-axios" {
	export type OperationResponse<Response> = Promise<Result<Response, APIError>>
}
