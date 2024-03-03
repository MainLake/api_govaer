const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarPrice(description,amount,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.price_ha
        (description,amount,id_user_create,id_status)
        values
        ($1,$2,$3,$4)`, [description,amount,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select p.*,st.description_status as estado from dsap.price_ha p 
        inner join dsap.status st on p.id_status = st.id_status`);
        return resultados.rows;
    },

    async obtPorBsq(id_price) {
        const resultados = await conexion.query(`select p.*,st.description_status as estado from dsap.price_ha p 
        inner join dsap.status st on p.id_status = st.id_status 
        WHERE p.id_price = $1`, [id_price]);
        return resultados.rows;
    },
    
    async actualizarPrice(description,amount,id_user,id_status,id_price) {
        const resultados = conexion.query(`update dsap.price_ha set
        description = $1,
        amount = $2,
        id_user_update = $3,
        id_status = $4
        where id_price = $5`, [description,amount,id_user,id_status,id_price]);
        return resultados;
    },
    
    async statusPrice(id_user,id_status,id_price) {
        const resultados = conexion.query(`update dsap.price_ha set
        id_user_update = $1,
        id_status = $2
        where id_price = $3`, [id_user,id_status,id_price]);
        return resultados;
    },
    
}// exportar modelo
