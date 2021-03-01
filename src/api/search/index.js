import request from "./../request";
import { TYPE } from "./../../model/search";

export default {
  search(q = "", type = `${TYPE.album},${TYPE.artist}`, offset, limit) {
    return request.get(`search`, {
      params: {
        q,
        type,
        limit,
        offset
      }
    });
  }
};
