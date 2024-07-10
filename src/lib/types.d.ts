import type { AxiosError } from "axios"
import type { ResultAsync } from "neverthrow"

export type APIError = AxiosError<{
	errors: {
		code: string
		detail: string
		source: { pointer: string }
		status: string
	}[]
}>

declare module "openapi-client-axios" {
	export type OperationResponse<Response> = ResultAsync<Response, APIError>
}
