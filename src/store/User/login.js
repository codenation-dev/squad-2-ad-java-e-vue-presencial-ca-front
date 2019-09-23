import axios from "axios";
import { api_oauth } from "@/endpoints/user";

export default {
  namespaced: true,
  state: {
    auth: {}
  },
  mutation: {
    LOGIN(state, token) {
      state.auth = token;
    },
    LOGOUT(state) {
      state.auth = "";
    }
  },
  actions: {
    async login({ commit }, form) {
      const headers = {
        Authorization: "Basic ZnJvbnRlbmQ6ZnJvbnRlbmQ="
      };

      const { data } = await axios.post(
        `${api_oauth}`,
        {
          ...form,
          grant_type: "password"
        },
        { headers }
      );
      commit("LOGIN", data);
    }
  }
};
