const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarServAct(activity_description,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.service_activity
        (activity_description,id_user_create,id_status)
        values
        ($1,$2,$3)`, [activity_description,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select s.*,st.description_status as estado from dsap.service_activity s
        inner join dsap.status st on s.id_status = st.id_status`);
        return resultados.rows;
    },

    async obtPorBsq(id_activity) {
        const resultados = await conexion.query(`select s.*,st.description_status as estado from dsap.service_activity s
        inner join dsap.status st on s.id_status = st.id_status 
        WHERE s.id_activity = $1`, [id_activity]);
        return resultados.rows;
    },
    
    async actualizarServAct(activity_description,id_user,id_status,id_activity) {
        const resultados = conexion.query(`update dsap.service_activity set
        activity_description = $1,
        id_user_update = $2,
        id_status = $3
        where id_activity = $4`, [activity_description,id_user,id_status,id_activity]);
        return resultados;
    },
    
    async statusServAct(id_user,id_status,id_activity) {
        const resultados = conexion.query(`update dsap.service_activity set
        id_user_update = $1,
        id_status = $2
        where id_activity = $3`, [id_user,id_status,id_activity]);
        return resultados;
    },

}// exportar modelo
