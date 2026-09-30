// Horário semanal (DADOS DE DEMONSTRAÇÃO — confirmar com a casa).
// dia: 0 = domingo … 6 = sábado. Horas em "HH:MM".
// Se `fecha` for menor que `abre`, fecha depois da meia-noite (ex.: 12:00 → 01:00).
// `null` = fechado nesse dia.

export interface Turno {
  abre: string
  fecha: string
}

export const FUSO = 'Africa/Luanda'

export const HORARIO: Record<number, Turno | null> = {
  0: { abre: '12:00', fecha: '23:00' },
  1: null,
  2: { abre: '12:00', fecha: '23:00' },
  3: { abre: '12:00', fecha: '23:00' },
  4: { abre: '12:00', fecha: '23:00' },
  5: { abre: '12:00', fecha: '01:00' },
  6: { abre: '12:00', fecha: '01:00' },
}

export const NOMES_DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
