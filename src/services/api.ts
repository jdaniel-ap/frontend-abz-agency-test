import apiClient from "./config";
import type {
  TokenResponse,
  UsersResponse,
  UserResponse,
  PositionsResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
  UsersParams,
} from "@/types/api";

export class ApiService {
  static async getToken(): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>("/token");
    return response.data;
  }

  static async getUsers(params?: UsersParams): Promise<UsersResponse> {
    const response = await apiClient.get<UsersResponse>("/users", {
      params: {
        page: params?.page || 1,
        count: params?.count || 6,
      },
    });
    return response.data;
  }

  static async getUserById(id: number): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(`/users/${id}`);
    return response.data;
  }

  static async getPositions(): Promise<PositionsResponse> {
    const response = await apiClient.get<PositionsResponse>("/positions");
    return response.data;
  }

  static async registerUser(
    userData: UserRegistrationRequest
  ): Promise<UserRegistrationResponse> {
    const tokenResponse = await this.getToken();

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (key === "position_id") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value as Blob | string);
      }
    });

    const response = await apiClient.post<UserRegistrationResponse>(
      "/users",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: tokenResponse.token,
        },
      }
    );

    return response.data;
  }
}

export default ApiService;
