const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async obtLog(login,psswrd) {
        const resultados = await conexion.query(`select id_user,login,psswrd from dsap.users where login =$1 and psswrd =$2`, [login,psswrd]);
        return resultados.rows;
    },
	async obtLog22(login,psswrd) {
        let consulta = "select id_user,login,psswrd from dsap.users where login=? and psswrd=?";
        return new Promise( ( resolve, reject ) => {
            connection.query(consulta, [login,psswrd], ( err, rows ) => {
                if (err){
                    return reject(err);
                }else{
                    console.log("lineas actualizadas:"+ rows.affectedRows);
                    resolve(rows.affectedRows);
                }
            });
        });
	},
    async mostrarReg() {
        const resultados = await conexion.query("select * from dsap.users");
        return resultados.rows;
    },
}// exportar modelo
