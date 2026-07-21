import { concatUrls } from "@/utils/concat-urls"

export function backendPath(path: string): string {
  return concatUrls(process.env.NEXT_PUBLIC_BACKEND_URL || "", path)
}
