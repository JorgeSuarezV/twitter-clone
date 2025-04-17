import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationException } from "./http.errors";
import { plainToInstance } from "class-transformer";
import { ClassType } from "@types";

export function BodyValidation<T>(target: ClassType<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.body = plainToInstance(target, req.body);
    const errors = await validate(req.body, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    if (errors.length > 0)
      throw new ValidationException(errors.map(error => ({ ...error, target: undefined, value: undefined })));

    next();
  };
}

export const verifySchema = async <T>(data: any, target: ClassType<T>) => {
  try {
    data = new target(data);
  } catch (error) {
    throw new ValidationException([{ property: "data", constraints: { isObject: "data must be an object" } }]);
  }
  const errors = await validate(data as typeof target, {
    whitelist: true,
    forbidNonWhitelisted: false
  });

  if (errors.length > 0)
    throw new ValidationException(errors.map(error => ({ ...error, target: undefined, value: undefined })));
};

export function isValidUUID(id: string | undefined) {
  if (!id) return false;
  return id.length !== 36;
}