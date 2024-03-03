const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarRunaway(name_runaway,municipality,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.plane_runaway
        (name_runaway,municipality,id_user_create,id_status)
        values
        ($1,$2,$3,$4)`, [name_runaway,municipality,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select p.*,st.description_status as estado from dsap.plane_runaway p inner join dsap.status st on p.id_status = st.id_status`);
        return resultados.rows;
    },

    async obtPorBsq(id_runaway) {
        const resultados = await conexion.query(`select p.*,st.description_status as estado from dsap.plane_runaway p inner join dsap.status st on p.id_status = st.id_status 
        WHERE p.id_runaway = $1`, [id_runaway]);
        return resultados.rows;
    },
    
    async actualizarRunaway(name_runaway,municipality,id_user,id_status,id_runaway) {
        const resultados = conexion.query(`update dsap.plane_runaway set
        name_runaway = $1,
        municipality = $2,
        id_user_update = $3,
        id_status = $4
        where id_runaway = $5`, [name_runaway,municipality,id_user,id_status,id_runaway]);
        return resultados;
    },
    
    async statusRunaway(id_user,id_status,id_runaway) {
        const resultados = conexion.query(`update dsap.plane_runaway set
        id_user_update = $1,
        id_status = $2
        where id_runaway = $3`, [id_user,id_status,id_runaway]);
        return resultados;
    },

}// exportar modelo
