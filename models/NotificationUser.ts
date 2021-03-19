export interface NotificationUser {
  id: string;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: true;
  blocked: true;
  role: string;
  name: string;
  created_by: string;
  updated_by: string;
}
