import { AxiosInstance } from "axios";
import { Technology } from "../models/Technology";

export async function getTechnologies(
  client: AxiosInstance
): Promise<Technology[]> {
  const { data } = await client.get("technologies");
  return data;
}

export async function getSpecialisations(
  client: AxiosInstance
): Promise<Technology[]> {
  const { data } = await client.get("specialisations");
  return data;
}

export async function getNotifications(
  client: AxiosInstance
): Promise<Notification[]> {
  const { data } = await client.get("notifications");
  return data;
}
