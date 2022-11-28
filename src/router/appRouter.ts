import {Router} from "express";
import {userService} from "../domain/userService";
import {DataQueryParams} from "../types";

export const appRouter = Router({});

appRouter.get('/', async (req, res) => {
  // @ts-ignore
  const {region, errorsCount, seed, pageNumber}: DataQueryParams = req.query;
  const itemsCount = Number(pageNumber) === 0 ? 20 : 10;

  const currentSeed = Number(seed) + Number(pageNumber);

  userService.setLocale(region);
  userService.setSeed(currentSeed);
  const data = userService.getUsers(itemsCount, errorsCount, region, pageNumber);

  res.status(200).json(data)
})