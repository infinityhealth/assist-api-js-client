import { type Document, OpenAPIClientAxios } from "openapi-client-axios"
import definition from "./openapi.json" assert { type: "json" }
import type { Client } from "./openapi.d.ts"
export type { Components, Paths, PathsDictionary, OperationMethods, Client } from "./openapi.d.ts"

export function init(base_url?: string) {
  const client = new OpenAPIClientAxios({
    definition: definition as unknown as Document,
    axiosConfigDefaults: { withCredentials: true, baseURL: base_url },
  }).initSync<Client>()

  return client
}
