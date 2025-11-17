import { d as defineEventHandler, r as readBody, s as setResponseStatus } from '../../../_/nitro.mjs';
import { z } from 'zod';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const bookingRequestBodySchema = z.object({
  hotelId: z.string().min(1, "ID do hotel \xE9 obrigat\xF3rio."),
  hotelName: z.string().min(1, "Nome do hotel \xE9 obrigat\xF3rio."),
  userId: z.string().min(1, "ID do usu\xE1rio \xE9 obrigat\xF3rio."),
  fullName: z.string().min(3, "Nome completo \xE9 obrigat\xF3rio."),
  email: z.string().email("Email inv\xE1lido."),
  phone: z.string().min(10, "Telefone inv\xE1lido.").regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Formato de telefone inv\xE1lido."),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data de check-in inv\xE1lido (YYYY-MM-DD)."),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data de check-out inv\xE1lido (YYYY-MM-DD)."),
  numberOfGuests: z.number().min(1, "N\xFAmero de h\xF3spedes deve ser no m\xEDnimo 1."),
  // <--- ALTERADO DE 'guests' PARA 'numberOfGuests'
  cardNumber: z.string().length(19, "N\xFAmero do cart\xE3o deve ter 16 d\xEDgitos (contando espa\xE7os/h\xEDfens).").regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Formato de cart\xE3o inv\xE1lido (XXXX XXXX XXXX XXXX)."),
  cardHolderName: z.string().min(3, "Nome no cart\xE3o \xE9 obrigat\xF3rio."),
  expiryDate: z.string().length(5, "Data de validade inv\xE1lida (MM/AA).").regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Formato MM/AA inv\xE1lido ou m\xEAs/ano inv\xE1lido."),
  cvv: z.string().min(3, "CVV deve ter 3 ou 4 d\xEDgitos.").max(4, "CVV deve ter 3 ou 4 d\xEDgitos.").regex(/^\d+$/, "CVV inv\xE1lido."),
  totalPrice: z.number().min(0, "Pre\xE7o total n\xE3o pode ser negativo.")
});
const bookings = [];
let bookingIdCounter = 1;
const create_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = bookingRequestBodySchema.parse(body);
    const newBooking = {
      id: `booking-${bookingIdCounter++}`,
      ...validatedData,
      bookingDate: (/* @__PURE__ */ new Date()).toISOString(),
      status: "confirmed"
    };
    bookings.push(newBooking);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    return {
      status: "success",
      message: "Reserva criada com sucesso!",
      booking: newBooking
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      setResponseStatus(event, 400);
      return {
        status: "error",
        message: "Dados de reserva inv\xE1lidos.",
        errors: error.issues
      };
    } else {
      console.error("Erro ao processar reserva na API:", error);
      setResponseStatus(event, 500);
      return {
        status: "error",
        message: "Falha interna do servidor ao criar reserva."
      };
    }
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
