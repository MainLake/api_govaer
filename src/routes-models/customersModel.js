const conexion = require("../conexion_db"); // generando conexion

module.exports = { 
    async insertarCustomer(first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status) {
        let resultados = await conexion.query(`insert into dsap.customer
        (first_name,last_name,address_customer,mail,phone_number,rfc,id_user_create,id_status)
        values
        ($1,$2,$3,$4,$5,$6,$7,$8)`, [first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status]);
        return resultados;
    },

    async mostrarReg() {
        const resultados = await conexion.query(`select c.*,st.description_status as estado from dsap.customer c 
        inner join dsap.status st on c.id_status = st.id_status`);
        return resultados.rows;
    },

    async obtPorBsq(id_customer) {
        const resultados = await conexion.query(`select c.*,st.description_status as estado from dsap.customer c 
        inner join dsap.status st on c.id_status = st.id_status WHERE c.id_customer = $1`, [id_customer]);
        return resultados.rows;
    },
    
    async actualizarCustomer(first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status,id_customer) {
        const resultados = conexion.query(`update dsap.customer set
        first_name = $1,
        last_name = $2,
        address_customer = $3,
        mail = $4,
        phone_number = $5,
        rfc = $6,
        id_user_update = $7,
        id_status = $8
        where id_customer = $9`, [first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status,id_customer]);
        return resultados;
    },
    
    async statusCustomer(id_user,id_status,id_customer) {
        const resultados = conexion.query(`update dsap.customer set
        id_user_update = $1,
        id_status = $2
        where id_customer = $3`, [id_user,id_status,id_customer]);
        return resultados;
    },
}// exportar modelo
