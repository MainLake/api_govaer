const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarRol(name_rol,id_status) {
        let resultados = await conexion.query(`insert into dsap.rol
        (name_rol,id_status)
        values
        ($1,$2)`, [name_rol,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select p.*,st.description_status as estado from dsap.rol p 
        inner join dsap.status st on p.id_status = st.id_status`);
        return resultados.rows;
    },

    async obtPorBsq(id_rol) {
        const resultados = await conexion.query(`select p.*,st.description_status as estado from dsap.rol p 
        inner join dsap.status st on p.id_status = st.id_status 
        WHERE p.id_rol = $1`, [id_rol]);
        return resultados.rows;
    },
    
    async actualizarRol(name_rol,id_status,id_rol) {
        const resultados = conexion.query(`update dsap.rol set
        name_rol = $1,
        id_status = $2
        where id_rol = $3`, [name_rol,id_status,id_rol]);
        return resultados;
    },
    
    async statusRol(id_status,id_rol) {
        const resultados = conexion.query(`update dsap.rol set
        id_status = $1
        where id_rol = $2`, [id_status,id_rol]);
        return resultados;
    },

}// exportar modelo
