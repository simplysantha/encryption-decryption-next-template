import dbConnect from "@/lib/mongodb";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from "@/controllers/itemsController";
import { secureController } from "@/lib/secureController";

export async function GET(request) {
  await dbConnect();

  const url = new URL(request.url);
  const action = url.searchParams.get("controllerName");

  switch (action) {
    case "getAllItems":
      return secureController(getAllItems, request);
    case "getItemById":
      return secureController(getItemById, request);
    default:
      return new Response("Invalid action", { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();

  const url = new URL(request.url);
  const action = url.searchParams.get("controllerName");

  switch (action) {
    case "createItem":
      return secureController(createItem, request);
    default:
      return new Response("Invalid action", { status: 400 });
  }
}

export async function PUT(request) {
  await dbConnect();

  const url = new URL(request.url);
  const action = url.searchParams.get("controllerName");

  switch (action) {
    case "updateItem":
      return secureController(updateItem, request);
    default:
      return new Response("Invalid action", { status: 400 });
  }
}

export async function DELETE(request) {
  await dbConnect();

  const url = new URL(request.url);
  const action = url.searchParams.get("controllerName");

  switch (action) {
    case "deleteItem":
      return secureController(deleteItem, request);
    default:
      return new Response("Invalid action", { status: 400 });
  }
}
