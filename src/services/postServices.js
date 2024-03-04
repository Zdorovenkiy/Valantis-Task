import api from "../http";

export default class PostServices {
    static async postItemsId() {
        return await api.post("",  {
            "action": "get_ids",
            "params": {}
          })
    }

    static async postItems(id) {
        return await api.post("",  {
            "action": "get_items",
            "params": {"ids": id}
          })
    }

    static async postFilteredItems(filter) {
        return await api.post("",  {
            "action": "filter",
            "params": filter
          })
    }
}