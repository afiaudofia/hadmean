import { createMocks } from "node-mocks-http";
import { requestHandler } from "../request";
import { BadRequestError, ForbiddenError, NotFoundError } from ".";

describe("/api/error/handling", () => {
  it("should transform BadRequestError correctly", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await requestHandler(
      {
        GET: async () => {
          throw new BadRequestError("Name is required", { name: "Required" });
        },
      },
      [
        {
          _type: "guest",
        },
      ]
    )(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toMatchInlineSnapshot(`
      Object {
        "message": "Name is required",
        "method": "GET",
        "name": "BadRequestError",
        "path": "",
        "statusCode": 400,
        "validations": Object {
          "name": "Required",
        },
      }
    `);
  });

  it("should transform NotFoundError correctly", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await requestHandler(
      {
        GET: async () => {
          throw new NotFoundError("User not found");
        },
      },
      [
        {
          _type: "guest",
        },
      ]
    )(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toMatchInlineSnapshot(`
      Object {
        "message": "User not found",
        "method": "GET",
        "name": "BadRequestError",
        "path": "",
        "statusCode": 404,
      }
    `);
  });

  it("should transform ForbiddenError correctly", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await requestHandler(
      {
        GET: async () => {
          throw new ForbiddenError(
            "Access to resource is denied",
            "DEMO_ERROR_CODE"
          );
        },
      },
      [
        {
          _type: "guest",
        },
      ]
    )(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toMatchInlineSnapshot(`
      Object {
        "errorCode": "DEMO_ERROR_CODE",
        "message": "Access to resource is denied",
        "method": "GET",
        "name": "ForbiddenError",
        "path": "",
        "statusCode": 401,
      }
    `);
  });

  it("should transform plain Error correctly", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await requestHandler(
      {
        GET: async () => {
          throw new Error("Something went wrong");
        },
      },
      [
        {
          _type: "guest",
        },
      ]
    )(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toMatchInlineSnapshot(`
      Object {
        "message": "Something went wrong",
        "method": "GET",
        "path": "",
        "statusCode": 500,
      }
    `);
  });
});
