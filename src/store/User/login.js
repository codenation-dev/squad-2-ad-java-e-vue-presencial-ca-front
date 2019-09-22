import axios from "axios";
import { domain } from "@/domain";

export default {
  namespaced: true,
  state: {
    auth: ""
  },
  mutation: {
    LOGIN(state, token) {
      state.auth = token;
    },
    LOGOUT(state) {
      state.auth = "";
    }
  },
  action: {
    async login({ commit }, form) {
      const headers = {
        Authorization: "Basic dWFhY2xpZW50OnVhYXNlY3JldA=="
      };

      const { data } = await axios.post(
        `${domain}`,
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
