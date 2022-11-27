import {Router} from "express";
import {userService} from "../domain/userService";
import {DataQueryParams, User} from "../types";

export const appRouter = Router({});

appRouter.get('/', async (req, res) => {
  // @ts-ignore
  const {currentRegion, errorCount, seed, pageNumber}: DataQueryParams = req.query;
  const itemsCount = Number(pageNumber) === 0 ? 20 : 10;

  const data = userService.getUsers(itemsCount, currentRegion.locale);

  res.status(200).json(data)
})