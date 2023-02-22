import { create } from "zustand";
import { pb } from "lib/database/pocketbase";
import { BaseStoreState } from "types/BaseStore";
import {
  BranchesResponse,
  UsersRecord,
  UsersResponse,
  Collections,
} from "types/pocketbase-types";
import { persist } from "zustand/middleware";

export interface AuthStoreData extends UsersRecord {}

export interface AuthStore extends BaseStoreState {
  data?: UsersResponse<unknown>;
  currentBranch?: BranchesResponse;
  setCurrentBranch: (currentBranch: BranchesResponse) => void;
  getUser: () => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      data: undefined,
      currentBranch: undefined,
      error: null,
      isLoading: false,
      success: false,
      setCurrentBranch: (currentBranch) => {
        set({ currentBranch });
      },
      getUser: async () => {
        if (pb.authStore.isValid && pb.authStore.model) {
          const userData: UsersResponse = {
            id: pb.authStore.model.id,
            created: pb.authStore.model.created,
            updated: pb.authStore.model.updated,
            collectionId: pb.authStore.model.collectionId,
            collectionName: Collections.Users,

            email: pb.authStore.model.email,
            emailVisibility: pb.authStore.model.emailVisibility,
            username: pb.authStore.model.username,
            verified: pb.authStore.model.verified,

            branch: pb.authStore.model.branch,
            roles: pb.authStore.model.roles,
            employee_data: pb.authStore.model.employee_data,
          };

          set({
            data: userData,
            success: true,
          });
        } else {
          pb.authStore.clear();
          set({
            data: undefined,
            error: null,
            isLoading: false,
            success: false,
          });
        }
      },
      login: async (username: string, password: string) => {
        try {
          set({ isLoading: true });
          const user = await pb
            .collection("users")
            .authWithPassword(username, password);
          const userData: UsersResponse = {
            id: user.record.id,
            created: user.record.created,
            updated: user.record.updated,
            collectionId: user.record.collectionId,
            collectionName: Collections.Users,

            email: user.record.email,
            emailVisibility: user.record.emailVisibility,
            username: user.record.username,
            verified: user.record.verified,

            branch: user.record.branch,
            roles: user.record.roles,
            employee_data: user.record.employee_data,
          };
          set({
            data: userData,
            success: true,
          });
        } catch (error) {
          set({
            error: error,
          });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        pb.authStore.clear();
        set({
          data: undefined,
          currentBranch: undefined,
          error: null,
          isLoading: false,
          success: false,
        });
      },
    }),
    {
      name: "auth-store", // unique name
    }
  )
);

export default useAuthStore;
