import type { _ActionsTree } from "pinia"
import useHttp from "~/composables/useHttp"

export default function actions(): _ActionsTree {
  return {
    async register(id: string) {
      return new Promise((resolve, reject) => {
        useHttp("/auth/register", {
          method: "POST",
        })
          .then((response) => {
            resolve({
              status: true,
              data: response.data,
            })
          })
          .catch((e) => {
            if (e.data) {
              resolve({
                status: false,
                errorMessage: "data error",
              })
              return
            }

            resolve({
              status: false,
              errorMessage: "data not found",
            })
          })
      })
    },
  }
}