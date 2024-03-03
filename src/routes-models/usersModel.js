const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarUser(name,first_name,last_name,login,psswrd,id_rol,id_status) {
        let resultados = await conexion.query(`insert into dsap.users
        (name,first_name,last_name,login,psswrd,id_rol,id_status)
        values
        ($1,$2,$3,$4,$5,$6,$7)`, [name,first_name,last_name,login,psswrd,id_rol,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select p.*,st.name_rol as rol from dsap.users p 
        inner join dsap.rol st on p.id_rol = st.id_rol`);
        return resultados.rows;
    },

    async obtPorBsq(id_user) {
        const resultados = await conexion.query(`select p.*,st.name_rol as rol from dsap.users p 
        inner join dsap.rol st on p.id_rol = st.id_rol 
        WHERE p.id_user = $1`, [id_user]);
        return resultados.rows;
    },
    
    async actualizarUser(name,first_name,last_name,login,psswrd,id_rol,id_status,id_user) {
        const resultados = conexion.query(`update dsap.users set
        name = $1,
        first_name = $2,
        last_name = $3,
        login = $4,
        psswrd = $5,
        id_rol = $6,
        id_status = $7
        where id_user = $8`, [name,first_name,last_name,login,psswrd,id_rol,id_status,id_user]);
        return resultados;
    },
    
    async statusUser(id_status,id_user) {
        const resultados = conexion.query(`update dsap.users set
        id_status = $1
        where id_user = $2`, [id_status,id_user]);
        return resultados;
    },

}// exportar modelo
