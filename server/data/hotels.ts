// server/data/hotels.ts

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
  rating: number; // 1-5 estrelas
  reviewsCount: number;
  availableRooms: number;
}

export const mockHotels: Hotel[] = [
  {
    id: 'h101',
    name: 'Grand Hyatt Rio de Janeiro',
    location: 'Barra da Tijuca, Rio de Janeiro',
    description: 'Luxuoso hotel 5 estrelas com vista para o mar e lagoa, piscinas exuberantes e gastronomia de alta qualidade.',
    pricePerNight: 850,
    imageUrl: 'https://images.unsplash.com/photo-1571896349882-35f606ede483?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Piscina', 'Academia', 'Spa', 'Restaurante', 'Wi-Fi Grátis', 'Estacionamento'],
    rating: 4.8,
    reviewsCount: 1250,
    availableRooms: 15,
  },
  {
    id: 'h102',
    name: 'Hotel Fasano São Paulo',
    location: 'Jardins, São Paulo',
    description: 'Elegância e sofisticação no coração dos Jardins. Conhecido por seu serviço impecável e culinária italiana.',
    pricePerNight: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1549294413-26f19527f918?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Piscina na cobertura', 'Spa', 'Restaurante Michelin', 'Academia', 'Wi-Fi Grátis'],
    rating: 4.9,
    reviewsCount: 890,
    availableRooms: 8,
  },
  {
    id: 'h103',
    name: 'Hilton Copacabana Rio de Janeiro',
    location: 'Copacabana, Rio de Janeiro',
    description: 'Localizado em frente à famosa Praia de Copacabana, oferece vistas deslumbrantes e acesso fácil aos pontos turísticos.',
    pricePerNight: 700,
    imageUrl: 'https://images.unsplash.com/photo-1625244724122-ac368945657b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Piscina na cobertura', 'Centro de convenções', 'Restaurante', 'Academia', 'Wi-Fi Grátis'],
    rating: 4.5,
    reviewsCount: 2100,
    availableRooms: 20,
  },
  {
    id: 'h104',
    name: 'Hotel Urbano',
    location: 'Centro, Curitiba',
    description: 'Moderno e confortável, ideal para viagens de negócios ou lazer, próximo a diversas atrações e ao centro cívico.',
    pricePerNight: 320,
    imageUrl: 'https://images.unsplash.com/photo-1596386822452-f63b27be3d3e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Café da manhã incluso', 'Wi-Fi Grátis', 'Estacionamento', 'Business Center'],
    rating: 4.2,
    reviewsCount: 750,
    availableRooms: 30,
  },
  {
    id: 'h105',
    name: 'Pousada Recanto da Praia',
    location: 'Praia do Forte, Salvador',
    description: 'Aconchegante pousada com acesso direto à praia, perfeita para relaxar e aproveitar as belezas naturais.',
    pricePerNight: 480,
    imageUrl: 'https://images.unsplash.com/photo-1582719478280-fd86f48375de?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Piscina', 'Jardim', 'Café da manhã incluso', 'Wi-Fi Grátis'],
    rating: 4.7,
    reviewsCount: 420,
    availableRooms: 10,
  },
  {
    id: 'h106',
    name: 'Resort do Sol',
    location: 'Porto de Galinhas, Pernambuco',
    description: 'Um paraíso tropical com piscinas naturais, coqueiros e todas as comodidades para umas férias inesquecíveis em família.',
    pricePerNight: 980,
    imageUrl: 'https://images.unsplash.com/photo-1581699942714-d02f89f74051?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Piscina com bar', 'Kids Club', 'Restaurantes temáticos', 'Spa', 'Esportes aquáticos'],
    rating: 4.6,
    reviewsCount: 1800,
    availableRooms: 25,
  },
  {
    id: 'h107',
    name: 'Hotel da Montanha',
    location: 'Gramado, Rio Grande do Sul',
    description: 'Charmoso hotel alpino na Serra Gaúcha, com lareira, vista para as montanhas e próximo às principais atrações.',
    pricePerNight: 620,
    imageUrl: 'https://images.unsplash.com/photo-1517400508587-88981f3d81b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Lareira', 'Café da manhã colonial', 'Jardim', 'Sala de jogos', 'Wi-Fi Grátis'],
    rating: 4.7,
    reviewsCount: 650,
    availableRooms: 12,
  },
  {
    id: 'h108',
    name: 'Business Tower Hotel',
    location: 'Faria Lima, São Paulo',
    description: 'Moderno hotel executivo com excelente localização, ideal para quem viaja a trabalho, com salas de reunião e coworking.',
    pricePerNight: 550,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Business Center', 'Sala de Reuniões', 'Academia 24h', 'Restaurante', 'Wi-Fi Grátis'],
    rating: 4.4,
    reviewsCount: 920,
    availableRooms: 18,
  },
  {
    id: 'h109',
    name: 'Ponta Negra Beach Hotel',
    location: 'Ponta Negra, Natal',
    description: 'A poucos passos da Praia de Ponta Negra, este hotel oferece conforto e conveniência com uma bela vista para o Morro do Careca.',
    pricePerNight: 400,
    imageUrl: 'https://images.unsplash.com/photo-1563299797-0f81d1808605?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Piscina', 'Restaurante', 'Café da manhã', 'Wi-Fi Grátis', 'Serviço de praia'],
    rating: 4.3,
    reviewsCount: 1100,
    availableRooms: 22,
  },
  {
    id: 'h110',
    name: 'Resort Ecológico Águas Claras',
    location: 'Bonito, Mato Grosso do Sul',
    description: 'Imerso na natureza exuberante de Bonito, com atividades de ecoturismo e piscinas naturais.',
    pricePerNight: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1544605992-06ac90ceea6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    amenities: ['Trilhas', 'Piscinas naturais', 'Restaurante orgânico', 'Spa', 'Passeios de barco'],
    rating: 4.9,
    reviewsCount: 300,
    availableRooms: 7,
  },
];