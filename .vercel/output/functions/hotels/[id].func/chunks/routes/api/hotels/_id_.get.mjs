import { d as defineEventHandler } from '../../../_/nitro.mjs';
import { m as mockHotels } from '../../../_/hotels.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const hotelId = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!hotelId) {
    event.res.statusCode = 400;
    return { message: "ID do hotel n\xE3o fornecido." };
  }
  const hotel = mockHotels.find((h) => h.id === hotelId);
  if (!hotel) {
    event.res.statusCode = 404;
    return { message: `Hotel com ID ${hotelId} n\xE3o encontrado.` };
  }
  return { hotel };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
