const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarProperty(name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.property
        (name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user_create,id_status)
        values
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select p.*,c.first_name,c.last_name,h.description as desc_precio,h.amount as precio from dsap.property p 
        inner join dsap.customer c on c.id_customer = p.id_customer 
        inner join dsap.price_ha h on h.id_price = p.id_price`);
        return resultados.rows;
    },

    async obtPorBsq(id_property) {
        const resultados = await conexion.query(`select p.*,c.first_name,c.last_name,h.description as desc_precio,h.amount as precio from dsap.property p 
        inner join dsap.customer c on c.id_customer = p.id_customer 
        inner join dsap.price_ha h on h.id_price = p.id_price 
        WHERE p.id_property = $1`, [id_property]);
        return resultados.rows;
    },
    
    async actualizarProperty(name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status,id_property) {
        const resultados = conexion.query(`update dsap.property set
        name_property = $1,
        coordinates = $2,
        municipality = $3,
        ha = $4,
        rfc = $5,
        id_price = $6,
        id_customer = $7,
        id_user_update = $8,
        id_status = $9
        where id_property = $10`, [name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status,id_property]);
        return resultados;
    },
    
    async statusProperty(id_user,id_status,id_property) {
        const resultados = conexion.query(`update dsap.property set
        id_user_update = $1,
        id_status = $2
        where id_property = $3`, [id_user,id_status,id_property]);
        return resultados;
    },
}// exportar modelo
