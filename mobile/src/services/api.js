export const getDashboard = async () => {
  return {
    validos: 47,
    atencao: 7,
    vencidos: 3,
  };
};

export const getAtividades = async () => {
  return [
    {
      id: 1,
      nome: "Ventilador PB840",
      tag: "VNT-2341",
      status: "concluida",
      tempo: "Há 10 horas"
    },
    {
      id: 2,
      nome: "Bomba de Infusão",
      tag: "DEF-8821",
      status: "breve",
      tempo: "Há 21 horas"
    },
    {
      id: 3,
      nome: "Desfibrilador Zoll X",
      tag: "VSM-0012",
      status: "vencida",
      tempo: "Há 1 dia"
    }
  ];
};