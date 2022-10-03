import { config } from 'dotenv'

export const enviroment = config()

type envConfig = {
  port: string | number
  baseUrl: string | null
}

console.log(enviroment.parsed?.BASE_URL)

export const envConfig: envConfig = {
  port: enviroment.parsed?.PORT || 4000,
  baseUrl: enviroment.parsed?.BASE_URL || 'localhost:4000',
}
