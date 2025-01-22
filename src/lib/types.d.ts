import type { AxiosError } from "axios"
import type { AxiosResponse } from "axios"
import type { ResultAsync } from "neverthrow"

export type APIError<
	T =
		| {
				errors: Array<{
					code: string
					detail: string
					source: { pointer: string }
					status: string
				}>
		  }
		| {
				error: string
				error_description: string
		  },
> = AxiosError<T>

declare module "openapi-client-axios" {
	export type OperationResponse<Response> = ResultAsync<AxiosResponse<Response>, APIError>
}
