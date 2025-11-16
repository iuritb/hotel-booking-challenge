// server/api/bookings/create.post.ts
import { H3Event } from 'h3';
import { z } from 'zod';

// Define um esquema para o corpo da requisição de reserva
const bookingRequestBodySchema = z.object({
  hotelId: z.string().min(1, 'ID do hotel é obrigatório.'),
  hotelName: z.string().min(1, 'Nome do hotel é obrigatório.'),
  userId: z.string().min(1, 'ID do usuário é obrigatório.'),
  fullName: z.string().min(3, 'Nome completo é obrigatório.'),
  email: z.string().email('Email inválido.'),
  phone: z.string().min(10, 'Telefone inválido.').regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Formato de telefone inválido.'),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data de check-in inválido (YYYY-MM-DD).'),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data de check-out inválido (YYYY-MM-DD).'),
  numberOfGuests: z.number().min(1, 'Número de hóspedes deve ser no mínimo 1.'), // <--- ALTERADO DE 'guests' PARA 'numberOfGuests'
  cardNumber: z.string().length(19, 'Número do cartão deve ter 16 dígitos (contando espaços/hífens).').regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Formato de cartão inválido (XXXX XXXX XXXX XXXX).'),
  cardHolderName: z.string().min(3, 'Nome no cartão é obrigatório.'),
  expiryDate: z.string().length(5, 'Data de validade inválida (MM/AA).').regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato MM/AA inválido ou mês/ano inválido.'),
  cvv: z.string().min(3, 'CVV deve ter 3 ou 4 dígitos.').max(4, 'CVV deve ter 3 ou 4 dígitos.').regex(/^\d+$/, 'CVV inválido.'),
  totalPrice: z.number().min(0, 'Preço total não pode ser negativo.'),
});

// Um armazenamento simples em memória para simular reservas (para demonstração)
const bookings: any[] = [];
let bookingIdCounter = 1;

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Verifica se o usuário está autenticado. No mundo real, isso viria de uma sessão.
    // Para simplificar, estamos assumindo que userId vem do frontend e é validado pelo Zod.
    // Em uma aplicação real, a autenticação seria verificada no backend antes de processar.
    const body = await readBody(event);

    // Valida o corpo da requisição usando Zod
    const validatedData = bookingRequestBodySchema.parse(body);

    // Simula interação com o banco de dados (ex: salvar reserva)
    const newBooking = {
      id: `booking-${bookingIdCounter++}`,
      ...validatedData,
      bookingDate: new Date().toISOString(),
      status: 'confirmed', // Status inicial da reserva
    };
    bookings.push(newBooking);

    // Você pode querer armazenar esta reserva na store de autenticação do usuário também,
    // mas por enquanto, vamos apenas simular o sucesso.
    // Exemplo de como acessar bookings: console.log('Current bookings:', bookings);

    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Retorna uma resposta de sucesso
    return {
      status: 'success',
      message: 'Reserva criada com sucesso!',
      booking: newBooking,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Lida com erros de validação Zod
      setResponseStatus(event, 400); // Bad Request
      return {
        status: 'error',
        message: 'Dados de reserva inválidos.',
        errors: error.issues, // Envia erros de validação detalhados
      };
    } else {
      // Lida com outros erros potenciais
      console.error('Erro ao processar reserva na API:', error);
      setResponseStatus(event, 500); // Internal Server Error
      return {
        status: 'error',
        message: 'Falha interna do servidor ao criar reserva.',
      };
    }
  }
});