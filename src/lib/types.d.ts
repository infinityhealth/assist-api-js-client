import type { AxiosError } from "axios"
import type { Result } from "neverthrow"
import * as openapi from "openapi-client-axios"

declare module "openapi-client-axios" {
	export type OperationResponse<Response> = Promise<Result<Response, AxiosError>>
}
