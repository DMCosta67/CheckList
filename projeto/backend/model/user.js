import pool from "./db.js";
import admin from "./firebase.js";

//pegar as informações pelo email
export async function pegarInfo(mail) {
    const query = 'SELECT idConta, nomePe FROM conta WHERE emailPe = ?';
    const [results] = await pool.execute(query, [mail]);
    if (!results || results.length === 0) {
        throw new Error("Usuário não encontrado para o email fornecido.");
    }
    return results[0];
}
//pegar as informações usando o ID

export async function deletar(id) {
    const query = "DELETE FROM conta WHERE idConta = ?";
    const [result] = await pool.execute(query, [id]);

    if (result.affectedRows === 0) {
        throw new Error("Usuário não encontrado para o ID fornecido no banco de dados.");
    }

    console.log(`Usuário com ID ${id} foi apagado do banco de dados.`);
}


export async function deleteUserByEmail(id) {
    try {
        console.log("Iniciando a consulta para buscar o usuário com ID:", id);

        // Buscar o email e nível do usuário pelo ID
        const query = "SELECT emailPe, nivel FROM conta WHERE idConta = ?";
        const [results] = await pool.execute(query, [id]);

        if (!results || results.length === 0) {
            throw new Error("Usuário não encontrado para o ID fornecido.");
        }

        // Desestruturar os valores retornados
        const email = results[0].emailPe;
        const nivel = results[0].nivel
        console.log(email, nivel);
        // Verificar o valor do email

        if (!email) {
            throw new Error("Email não encontrado no banco de dados.");
        }

        console.log("Email encontrado:", email);

        // Verificar o nível da conta
        if (nivel === 1) {
            console.log("A conta é de um coordenador. Nenhuma ação será realizada no Firebase.");
            return;
        }

        // Deletar usuário no Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(email);
        console.log("Usuário encontrado no Firebase:", userRecord.uid);
        await admin.auth().deleteUser(userRecord.uid);

        console.log(`Usuário com email ${email} foi apagado com sucesso no Firebase.`);
    } catch (error) {
        console.error("Erro ao apagar usuário no Firebase:", error.message);
        throw error; 
    }
}
