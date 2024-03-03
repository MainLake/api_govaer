const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarServ(agreed_date,so_description,id_property,id_activity,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.service_orden
        (agreed_date,so_description,id_property,id_activity,id_user_create,id_status)
        values
        ($1,$2,$3,$4,$5,$6)`, [agreed_date,so_description,id_property,id_activity,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select s.*,st.description_status as estado,p.name_property,a.activity_description from dsap.service_orden s
        inner join dsap.status st on s.id_status = st.id_status
        inner join dsap.property p on p.id_property = s.id_property
        inner join dsap.service_activity a on a.id_activity = s.id_activity`);
        return resultados.rows;
    },

    async obtPorBsq(no_orden) {
        const resultados = await conexion.query(`select s.*,st.description_status as estado,p.name_property,a.activity_description from dsap.service_orden s
        inner join dsap.status st on s.id_status = st.id_status
        inner join dsap.property p on p.id_property = s.id_property
        inner join dsap.service_activity a on a.id_activity = s.id_activity
        WHERE s.no_orden = $1`, [no_orden]);
        return resultados.rows;
    },
    
    async actualizarServ(agreed_date,so_description,id_property,id_activity,id_user,id_status,no_orden) {
        const resultados = conexion.query(`update dsap.service_orden set
        agreed_date = $1,
        so_description = $2,
        id_property = $3,
        id_activity = $4,
        id_user_update = $5,
        id_status = $6
        where no_orden = $7 `, [agreed_date,so_description,id_property,id_activity,id_user,id_status,no_orden]);
        return resultados;
    },
    
    async statusServ(id_user,id_status,no_orden) {
        const resultados = conexion.query(`update dsap.servino_orden set
        id_user_update = $1,
        id_status = $2
        where no_orden = $3`, [id_user,id_status,no_orden]);
        return resultados;
    },

}// exportar modelo
