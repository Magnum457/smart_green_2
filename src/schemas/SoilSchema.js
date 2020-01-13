export default class SoilSchema {
    static schema = {
        name: 'Soils',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true },
            campo: 'string',
            ponto: 'int',
            profundidade: 'float',
            umidade: 'float',
            dt_create: 'date',
            user_create: 'string',
            envio: 'bool'
        }
    }
}