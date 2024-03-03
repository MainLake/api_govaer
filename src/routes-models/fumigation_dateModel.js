const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarFumigation(fum_date,hour,no_orden,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.fumigation_date
        (fum_date,hour,no_orden,id_user_create,id_status)
        values
        ($1,$2,$3,$4,$5)`, [fum_date,hour,no_orden,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select f.*,st.so_description as orden from dsap.fumigation_date f inner join dsap.service_orden st on f.no_orden = st.no_orden`);
        return resultados.rows;
    },

    async obtPorBsq(id_fum_date) {
        const resultados = await conexion.query(`select f.*,st.so_description as orden from dsap.fumigation_date f inner join dsap.service_orden st on f.no_orden = st.no_orden 
        WHERE f.id_fum_date = $1`, [id_fum_date]);
        return resultados.rows;
    },
    
    async actualizarFumigation(fum_date,hour,no_orden,id_user,id_status,id_fum_date) {
        const resultados = conexion.query(`update dsap.fumigation_date set
        fum_date = $1,
        hour = $2,
        no_orden = $3,
        id_user_update = $4,
        id_status = $5
        where id_fum_date = $6`, [fum_date,hour,no_orden,id_user,id_status,id_fum_date]);
        return resultados;
    },
    
    async statusFumigation(id_user,id_status,id_fum_date) {
        const resultados = conexion.query(`update dsap.fumigation_date set
        id_user_update = $1,
        id_status = $2
        where id_fum_date = $3`, [id_user,id_status,id_fum_date]);
        return resultados;
    },

}// exportar modelo
