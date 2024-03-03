const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarStatus(description_status) {
        let resultados = await conexion.query(`insert into dsap.status
        (description_status)
        values
        ($1)`, [description_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select p.* from dsap.status p `);
        return resultados.rows;
    },

    async obtPorBsq(id_status) {
        const resultados = await conexion.query(`select p.* from dsap.status p 
        WHERE p.id_status = $1`, [id_status]);
        return resultados.rows;
    },
    
    async actualizarStatus(description_status,id_status) {
        const resultados = conexion.query(`update dsap.status set
        description_status = $1
        where id_status = $2`, [description_status,id_status]);
        return resultados;
    },
    
    /* async statusRol(id_status,id_rol) {
        const resultados = conexion.query(`update dsap.status set
        id_status = $1
        where id_rol = $2`, [id_status,id_rol]);
        return resultados;
    }, */
}// exportar modelo
