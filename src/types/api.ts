export interface ApiResponse {
  success: boolean;
  message?: string;
}

export interface TokenResponse extends ApiResponse {
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp?: number;
  photo: string;
}

export interface UsersResponse extends ApiResponse {
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: User[];
}

export interface UserResponse extends ApiResponse {
  user: User;
}

export interface Position {
  id: number;
  name: string;
}

export interface PositionsResponse extends ApiResponse {
  positions: Position[];
}

export interface UserRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
}

export interface UserRegistrationResponse extends ApiResponse {
  user_id: number;
  message: string;
}

export interface ValidationError extends ApiResponse {
  fails: {
    [key: string]: string[];
  };
}

export interface UsersParams {
  page?: number;
  count?: number;
}
