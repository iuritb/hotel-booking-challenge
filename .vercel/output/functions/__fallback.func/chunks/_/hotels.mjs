const mockHotels = [
  {
    id: "hotel-1",
    name: "Praia Dourada Resort",
    location: "Rio de Janeiro, Brasil",
    description: "Um luxuoso resort \xE0 beira-mar com piscinas infinitas, spa completo e restaurantes de alta gastronomia. Perfeito para relaxar e aproveitar a vista espetacular.",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 550,
    rating: 4.8,
    reviewsCount: 1250,
    amenities: ["Piscina", "Spa", "Academia", "Restaurante", "Wi-Fi Gr\xE1tis", "Servi\xE7o de Quarto"],
    availableRooms: 15
  },
  {
    id: "hotel-2",
    name: "Montanha Serena Pousada",
    location: "Campos do Jord\xE3o, Brasil",
    description: "Uma charmosa pousada nas montanhas, ideal para casais. Oferece lareiras aconchegantes, trilhas na natureza e um caf\xE9 da manh\xE3 colonial inesquec\xEDvel.",
    imageUrl: "https://images.unsplash.com/photo-1544473330-97c7689d0b5e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 320,
    rating: 4.5,
    reviewsCount: 890,
    amenities: ["Lareira", "Jardim", "Caf\xE9 da Manh\xE3", "Estacionamento Gr\xE1tis", "Wi-Fi Gr\xE1tis"],
    availableRooms: 8
  },
  {
    id: "hotel-3",
    name: "Urbano Chic Hotel",
    location: "S\xE3o Paulo, Brasil",
    description: "Design moderno e localiza\xE7\xE3o privilegiada no centro financeiro. Perfeito para viagens de neg\xF3cios, com salas de reuni\xE3o e f\xE1cil acesso ao transporte p\xFAblico.",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-adac9d4acef4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 480,
    rating: 4.2,
    reviewsCount: 1500,
    amenities: ["Business Center", "Restaurante", "Academia", "Bar", "Wi-Fi Gr\xE1tis"],
    availableRooms: 20
  },
  {
    id: "hotel-4",
    name: "Hotel Hist\xF3rico Salvador",
    location: "Salvador, Brasil",
    description: "Localizado no cora\xE7\xE3o do Pelourinho, este hotel boutique oferece uma imers\xE3o na cultura baiana, com arquitetura colonial e culin\xE1ria t\xEDpica.",
    imageUrl: "https://images.unsplash.com/photo-1582299710920-56e6d420556f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 380,
    rating: 4.6,
    reviewsCount: 950,
    amenities: ["Caf\xE9 da Manh\xE3", "P\xE1tio Interno", "Perto de Atra\xE7\xF5es Tur\xEDsticas", "Wi-Fi Gr\xE1tis"],
    availableRooms: 10
  },
  {
    id: "hotel-5",
    name: "Eco Lodge Amaz\xF4nia",
    location: "Manaus, Brasil",
    description: "Uma experi\xEAncia \xFAnica em meio \xE0 floresta amaz\xF4nica. Cabanas sustent\xE1veis, excurs\xF5es guiadas e a oportunidade de se conectar com a natureza selvagem.",
    imageUrl: "https://images.unsplash.com/photo-1602717805566-0775a6be4a5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 700,
    rating: 4.9,
    reviewsCount: 300,
    amenities: ["Excurs\xF5es Guiadas", "Culin\xE1ria Local", "Observa\xE7\xE3o de Fauna", "Acomoda\xE7\xF5es Sustent\xE1veis"],
    availableRooms: 5
  },
  {
    id: "hotel-6",
    name: "Caminho das \xC1guas Termas",
    location: "Caldas Novas, Brasil",
    description: "Hotel com acesso direto a parques termais, ideal para fam\xEDlias. Divers\xE3o garantida com piscinas de \xE1gua quente, tobo\xE1guas e atividades recreativas.",
    imageUrl: "https://images.unsplash.com/photo-1563911302-a2491a99538c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 420,
    rating: 4.3,
    reviewsCount: 1100,
    amenities: ["Piscinas Termais", "Parque Aqu\xE1tico", "Recrea\xE7\xE3o Infantil", "Restaurante", "Wi-Fi"],
    availableRooms: 12
  },
  {
    id: "hotel-7",
    name: "Pousada do Sossego",
    location: "Paraty, Brasil",
    description: "Ambiente r\xFAstico e acolhedor em uma das cidades hist\xF3ricas mais charmosas do Brasil. Pr\xF3ximo a praias e cachoeiras, com passeios de barco e cultura local.",
    imageUrl: "https://images.unsplash.com/photo-1616422329777-1c69994c92b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 280,
    rating: 4.7,
    reviewsCount: 780,
    amenities: ["Caf\xE9 da Manh\xE3", "Jardim", "Passeios de Barco", "Wi-Fi Gr\xE1tis"],
    availableRooms: 7
  },
  {
    id: "hotel-8",
    name: "Resort do Sol Nordeste",
    location: "Fortaleza, Brasil",
    description: "Desfrute do sol e das praias exuberantes do Cear\xE1 neste resort all-inclusive. Ideal para fam\xEDlias, com diversas op\xE7\xF5es de lazer e gastronomia.",
    imageUrl: "https://images.unsplash.com/photo-1549298288-9d419b7d8b5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 600,
    rating: 4.4,
    reviewsCount: 1800,
    amenities: ["All-Inclusive", "Piscinas", "Praia Privativa", "Shows Noturnos", "Club Kids"],
    availableRooms: 25
  },
  {
    id: "hotel-9",
    name: "Hotel da Cidade Hist\xF3rica",
    location: "Ouro Preto, Brasil",
    description: "Hospede-se em um casar\xE3o colonial restaurado, com vista para as montanhas e igrejas barrocas. Viva a hist\xF3ria e a arte de Ouro Preto.",
    imageUrl: "https://images.unsplash.com/photo-1596200236173-04d80a1d9571?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 300,
    rating: 4.6,
    reviewsCount: 600,
    amenities: ["Vista Panor\xE2mica", "Caf\xE9 da Manh\xE3", "Proximidade a Museus", "Wi-Fi Gr\xE1tis"],
    availableRooms: 6
  },
  {
    id: "hotel-10",
    name: "Gastronomia e Vinhos Boutique",
    location: "Bento Gon\xE7alves, Brasil",
    description: "Um hotel boutique dedicado aos amantes de vinho e boa gastronomia. Localizado na Rota dos Vinhedos, oferece degusta\xE7\xF5es e tours.",
    imageUrl: "https://images.unsplash.com/photo-1582719478290-be8784ee0d8d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerNight: 490,
    rating: 4.9,
    reviewsCount: 450,
    amenities: ["Degusta\xE7\xE3o de Vinhos", "Restaurante Gourmet", "Adega", "Tours Locais", "Wi-Fi Gr\xE1tis"],
    availableRooms: 9
  }
];

export { mockHotels as m };
//# sourceMappingURL=hotels.mjs.map
