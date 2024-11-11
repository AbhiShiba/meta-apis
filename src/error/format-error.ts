import { CustomError } from "./custom-error"

export const formatError = (err:Error, details?:Record<string,any>) => {
  if(err instanceof CustomError) {
    return err.serializeError()
  }

  return [
    {
      message: err.message, details
    }
  ]
}