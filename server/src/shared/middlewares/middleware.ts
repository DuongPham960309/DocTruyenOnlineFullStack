import type {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';

const verifyRequest = (request: Request, response: Response, next: NextFunction) => {
  const serverTime = Date.now();

  const xKey = (request.get('x-key') || request.query['x-key']) as string;
  const [clientSignature, clientTime] = getClientSignatureAndTimeMS(xKey);
  
  const timeDifference = Math.abs(serverTime - clientTime);
  
  const serverSignature = crypto
    .createHash('sha256')
    .update(clientTime + "|ConstantString")
    .digest('hex');

  if ((timeDifference < 10*1000)&&(serverSignature === clientSignature)) {
    next();
  } else {
    response.send();
  }
}

const getClientSignatureAndTimeMS = (key: string): [string, number] => {
  const baseHexadecimal = 16;
  const timeOffsetPosition = parseInt(key.charAt(0), baseHexadecimal);
  const timeStart = 1 + timeOffsetPosition;
  const timeLength = 16;

  const clientSignature = key.substring(0, timeStart) + key.substring(timeStart + timeLength);

  let timeObfuscate = key.substring(timeStart, timeStart + timeLength) as unknown as bigint;
  timeObfuscate = BigInt("0x" + timeObfuscate);

  const MASK_64 = (1n << 64n) - 1n;
  const inverted = timeObfuscate ^ MASK_64;
  const secretHexPosition = parseInt(clientSignature.charAt(7), baseHexadecimal);
  let secretHex = clientSignature.substring(secretHexPosition, secretHexPosition + timeLength) as unknown as bigint;
  secretHex = BigInt("0x" + secretHex);
  const timeMS = Number(inverted ^ secretHex);
  
  return [clientSignature, timeMS];
}

export {verifyRequest};