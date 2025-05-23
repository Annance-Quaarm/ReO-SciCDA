"server only"

import { PinataSDK } from "pinata"

export const createPinataClient = (jwtToken: string, gatewayUrl: string) => {
    return new PinataSDK({
        pinataJwt: jwtToken,
        pinataGateway: gatewayUrl
    })
}