import type { AxiosError } from "axios"
import type { Result } from "neverthrow"
import * as openapi from "openapi-client-axios"

export interface APIErrors {
	errors: {
		code: string
		detail: string
		source: { pointer: string }
		status: string
	}[]
}

declare module "openapi-client-axios" {
	export type OperationResponse<Response> = Promise<Result<Response, AxiosError<APIErrors>>>
}
