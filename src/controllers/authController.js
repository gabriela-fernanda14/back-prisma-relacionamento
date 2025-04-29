import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

class AuthController {
    // Listar todos os usuários
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.findAll();
            res.json(users);
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.status(500).json({ error: "Erro ao listar usuários" });
        }
    }

    // Registrar um novo usuário
    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validação básica
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }
        //verifica se o usuário já existe
        const userExists = await UserModel.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: "Esse email ja esta em uso!" });
        }

        // Hashar da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        // Criar objeto do usuário
        const data = {
            name,
            email,
            password: hashedPassword,
        };

        // Criar usuário no banco de dados
        const newUser = await UserModel.create(data);
        
        return res.status(201).json({
            message: "Usuário criado com sucesso",
            newUser,
        });
        } catch (error) {

        }
    }
}

export default new AuthController();