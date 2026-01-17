import { Elysia, t } from "elysia";
import { userService } from "../config/inversify.config";

export const userRouter = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const users = await userService.getAllUsers();
    return { data: users };
  })

  .get(
    "/:id",
    async ({ params }) => {
      const user = await userService.getUserById(params.id);
      return { data: user };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  .get(
    "/email/:email",
    async ({ params }) => {
      const user = await userService.getUserByEmail(params.email);
      return { data: user };
    },
    {
      params: t.Object({
        email: t.String(),
      }),
    }
  );
