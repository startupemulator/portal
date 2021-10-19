import { Profile } from "./Profile";

export interface User {
  id: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: true;
  blocked: true;
  role: string;
  name: string;
  profile: Profile;
  created_by: string;
  updated_by: string;
}
