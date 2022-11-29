import {Router} from "express";
import {userService} from "../domain/userService";
import {DataQueryParams} from "../types";

export const appRouter = Router({});

appRouter.get('/', async (req, res) => {
  // @ts-ignore
  const {region, errorsCount, seed, pageNumber, isFirst}: DataQueryParams = req.query;

  userService.setLocale(region);

  const data = userService.generateUsers(errorsCount, region, pageNumber, isFirst, seed)

  res.status(200).json(data)
})