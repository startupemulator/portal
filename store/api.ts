import axios from "axios";
import { Technology } from "../models/Technology";

const client = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000/",
});

export async function getTechnologies(): Promise<Technology[]> {
  const { data } = await client.get("/api/v1/technologies");
  return data;
}

export async function getSpecialisations(): Promise<Technology[]> {
  const { data } = await client.get("/api/v1/specialisations");
  return data;
}

export async function getNotifications(): Promise<Notification[]> {
  const { data } = await client.get("/api/v1/notifications");
  return data;
}
