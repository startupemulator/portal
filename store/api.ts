import axios from "axios";
import { Technology } from "../models/Technology";

const client = axios.create({
  baseURL: process.env.STRAPI_URL,
});

export async function getTechnologies(): Promise<Technology[]> {
  const { data } = await client.get("technologies");
  return data;
}

export async function getSpecialisations(): Promise<Technology[]> {
  const { data } = await client.get("specialisations");
  return data;
}

export async function getNotifications(): Promise<Notification[]> {
  const { data } = await client.get("notifications");
  return data;
}
